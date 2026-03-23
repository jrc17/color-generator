import { useEffect, useState} from "react"
export default function App(){

const [colorElements,setColorElements]= useState()

const customSchemes = {
    random: {h:[0,360], s:[0,100],  l:[0,100]},
    pastel: {h:[0,360], s:[30,50],  l:[80,90]},
    neon:   {h:[0,360], s:[90,100], l:[50,60]},
    earthy: {h:[0,60],  s:[20,40],  l:[30,50]},
    jewel:  {h:[0,360], s:[70,90],  l:[30,50]},
    muted:  {h:[0,360], s:[10,30],  l:[40,60]},
}


function getRandomInt(min,max){
  return Math.floor(Math.random() * (max-min+1))+min
}


function colorGenerator({h,s,l}){
  let colorArray = []
for(let i =0;i<5;i++){
const hue = getRandomInt(h[0],h[1])
const saturation = getRandomInt(s[0],s[1])
const light = getRandomInt(l[0],l[1]) 
colorArray.push(`${hue},${saturation}%,${light}%`)
}
return colorArray
}


function renderColorCard(colorData,index){
  return(
 <div key={index}>
    <img src={colorData.image.bare} />
    <p>{colorData.hex.value}</p>
    
    </div>
    )

}
async function getColorApi(color,scheme=null){
  const data = (scheme? 
    await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}`).then(res => res.json()) :
    await Promise.all(color.map(hsl => fetch(`https://www.thecolorapi.com/id?hsl=${hsl}`).then(res => res.json()))) 
  )
  const colorData = scheme? data.colors : data

  const elements = colorData.map((colorData,index)=> renderColorCard(colorData,index))
  setColorElements(elements)
}


function getColorScheme(e){
  e.preventDefault()
  const formEl = e.currentTarget
  const formData = new FormData(formEl)

  
  const scheme =formData.get("color-scheme")
  
  
if(customSchemes[scheme]){
  const colorArray = colorGenerator(customSchemes[scheme])
  getColorApi(colorArray)

}
  
else{
  const color = formData.get("color-picker").slice(1)
  getColorApi(color,scheme)
  
}

  
}

  return(
    <main>
 <form id="color-form" className="color-form" onSubmit={getColorScheme}>
      <input type="color" id="color-picker" className="color-picker" name="color-picker" defaultValue="#000000"/>
      <select id="colorScheme" className="color-scheme" name="color-scheme" defaultValue="random" >
        <option value="random">Random</option>
         <option value="pastel">Pastel</option>
        <option value="neon">Neon</option>
        <option value="earthy">Earthy</option>
        <option value="jewel">Jewel</option>
        <option value="muted">Muted</option>
        <option value="monochrome">Moochrome</option>
        <option value="monochrome-dark">Monochrome-dark</option>
        <option value="monochrome-light">Monochrome-light</option>
        <option value="analogic">Analogic</option>
        <option value="complement">Complement</option>
        <option value="analogic-complement">Analogic-complement</option>
        <option value="triad">Triad</option>
        <option value="quad">Quad</option>
        </select>
        <button type="submit">Get color scheme</button>
        </form>

<div id="color-container" className="color-container">{colorElements}</div>
    </main>
  )
}