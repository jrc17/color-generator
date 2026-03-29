# Color Generator App

## Overview
This app started as a Scrim challenge to practice working with APIs. I liked the concept and decided to extend it to resemble the [Coolors](https://coolors.co) app, with features like custom color schemes, lock/unlock colors, delete colors, adjustable color count, and multiple color format display options.

## Tech Stack
- **React** (Vite)
- **The Color API** (`thecolorapi.com`)
- Started in vanilla HTML/CSS/JS, then refactored to React as the app grew. React made more sense for managing state and re-renders, especially for features like locking/unlocking individual colors.

## Features

### Color Schemes
Two types of schemes are supported:

**API Schemes** — fetched from The Color API using a base color from the color picker:
- Monochrome, Monochrome Dark, Monochrome Light
- Analogic, Complement, Analogic-Complement
- Triad, Quad

**Custom Schemes** — generated locally using HSL ranges, color picker is ignored:
- Random, Pastel, Neon, Earthy, Jewel, Muted

Each custom scheme has its own HSL ranges to produce the right feel:
```javascript
const customSchemes = {
    random: {h:[0,360], s:[0,100],  l:[0,100]},
    pastel: {h:[0,360], s:[30,50],  l:[80,90]},
    neon:   {h:[0,360], s:[90,100], l:[50,60]},
    earthy: {h:[0,60],  s:[20,40],  l:[30,50]},
    jewel:  {h:[0,360], s:[70,90],  l:[30,50]},
    muted:  {h:[0,360], s:[10,30],  l:[40,60]},
}
```

### Color Format Display
Users can switch between how colors are displayed and labelled:
- HEX, HSL, RGB, Color Name

### Lock / Unlock
Users can lock individual colors. When regenerating, locked colors are preserved and only unlocked slots are replaced.

### Delete
Users can delete individual unlocked colors from the scheme.

### Adjustable Color Count
Users can set how many colors to generate (1–20). The app accounts for locked colors when calculating how many new ones to fetch.

---

## Key Technical Decisions

### Why HSL for generation?
HSL (Hue, Saturation, Lightness) is more human-friendly to work with programmatically — you can independently control each property to target a specific mood or style:
```javascript
function colorGenerator({h, s, l}) {
    let colorArray = []
    for(let i = 0; i < count; i++) {
        const hue = getRandomInt(h[0], h[1])
        const saturation = getRandomInt(s[0], s[1])
        const light = getRandomInt(l[0], l[1])
        colorArray.push(`${hue},${saturation}%,${light}%`)
    }
    return colorArray
}
```

### Why let the API handle HEX conversion?
I initially wrote a manual HSL → HEX conversion function, but scrapped it when I found the API could return HEX, RGB, HSL, and color name all at once. Letting the API handle it keeps the code simpler and more consistent.

### Promise.all for parallel fetching
Initially each color was fetched individually in a loop. Refactored to `Promise.all` to fetch all colors in parallel — faster and cleaner:
```javascript
// ❌ before — sequential
for(let hsl of colorArray) {
    const data = await fetch(`...${hsl}`)
}

// ✅ after — parallel
const data = await Promise.all(
    colorArray.map(hsl => 
        fetch(`https://www.thecolorapi.com/id?hsl=${hsl}`)
        .then(res => res.json())
    )
)
```

### Single fetch function for both scheme types
Instead of separate if/else blocks with duplicated fetch logic, one function handles both cases using a conditional:
```javascript
async function getColorApi(color, scheme=null){
    const data = scheme ? 
        await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=${colorCount}`)
            .then(res => res.json()) :
        await Promise.all(color.map(hsl => 
            fetch(`https://www.thecolorapi.com/id?hsl=${hsl}`)
            .then(res => res.json())
        ))
    const colorData = scheme ? data.colors : data
    // ...
}
```

### colorCount derivation
Rather than maintaining a separate count state, `colorCount` is derived from existing state — so it always stays in sync automatically:
```javascript
const lockedColors = colorElements.filter(data => data.lock).length
const colorCount = Math.max(0, totalColors - lockedColors)
```
`Math.max(0, ...)` handles the edge case where locked colors exceed `totalColors` — in that case nothing is fetched and excess unlocked colors are trimmed.

### Why calculate before setting state (not inside callback)
When merging new colors with locked ones, the result is calculated first and then set — rather than inside the `setState` callback:
```javascript
// ✅ correct
setColorElements([...colorElements.filter(data => data.lock), ...elements])

// ❌ would break in React strict mode
setColorElements(prevState => {
    let i = 0
    return prevState.map(data => data.lock ? data : elements[i++])
})
```
React strict mode intentionally calls `setState` callbacks twice to detect side effects. Using an index `i` inside the callback causes it to run out of sync on the second call. Calculating outside sidesteps this entirely.

### Adaptive text color
To ensure lock/delete buttons and color labels are always readable regardless of the background color, luminance is calculated from the RGB value and text color is set to black or white accordingly:
```javascript
function colorInfoStyle(rgbColor) {
    const match = rgbColor.match(/\d+/g)
    const [r, g, b] = match.map(Number)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return { color: luminance > 0.5 ? "#000000" : "#ffffff" }
}
```

---

## State Structure

```javascript
const [totalColors, setTotalColors] = useState(5)      // user requested count
const [colorElements, setColorElements] = useState([]) // array of color objects
const [colorNameFormat, setColorNameFormat] = useState("hex") // display format

// each color object:
{
    hex: "#FF5733",
    hsl: "hsl(12, 100%, 58%)",
    rgb: "rgb(255, 87, 51)",
    name: "Cinnabar",
    image: "https://...",
    lock: false
}
```

---

## Phase 3 Plans
- Copy color to clipboard in selected format
- Export palette as image
- Hover-based controls UI (Coolors style)
- Persist palettes across sessions