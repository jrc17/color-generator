import {useState} from "react"
import {colorGenerator,customSchemes} from "../src/utils.js"
import ColorCard from "./ColorCard.jsx"

export default function App(){

const [totalColors, setTotalColors] =useState(5)
const [colorElements,setColorElements]= useState([])
const [colorNameFormat,setColorNameFormat] = useState("hex")

const lockedColors =colorElements.filter(data => data.lock).length 
const colorCount = Math.max(0,totalColors - lockedColors)


async function getColorApi(color,scheme=null){

  if(colorCount === 0){
    setColorElements(prevState => prevState.filter(data => data.lock))
    return
  }

  const data = (scheme? 
    await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=${colorCount}`).then(res => res.json()) :
    await Promise.all(color.map(hsl => fetch(`https://www.thecolorapi.com/id?hsl=${hsl}`).then(res => res.json()))) 
  )
  const colorData = scheme? data.colors : data
  
  const elements = colorData.map((colorData)=>({
    rgb:colorData.rgb.value,
    hex:colorData.hex.value,
    hsl:colorData.hsl.value,
    name:colorData.name.value,
    image:colorData.image.bare,
    lock:false,
  }))


  
 if(colorElements.length===0 || lockedColors===0){

   setColorElements(elements)
  }
  
  else{
    
    setColorElements([...colorElements.filter(data => data.lock), ...elements])

    } 

}


function getColorScheme(e){
  e.preventDefault()

  const formEl = e.currentTarget
  const formData = new FormData(formEl)
  const scheme =formData.get("color-scheme")
  
  if(customSchemes[scheme]){
    const colorArray = colorGenerator(customSchemes[scheme],colorCount)

    getColorApi(colorArray)

  }
    
  else{
    const color = formData.get("color-picker").slice(1)
    getColorApi(color,scheme)
    
  }

  
}
function nameFormat(e){
  setColorNameFormat(e.target.value)

}
function changeTotal(e){
  console.log(e.target.value)
  setTotalColors(Number(e.target.value))
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

        <select id="name-format" onChange={nameFormat} defaultValue="hex">
          <option value="name">Name</option>
          <option value="hex">Hex</option>
          <option value="hsl">HSL</option>
          <option value="rgb">RGB</option>
        </select>
        <label htmlFor="num-colors">Num of colors</label>
        <input id="num-colors" type="number" defaultValue={5} onChange={changeTotal} />

      <ColorCard colorElements={colorElements} setColorElements={setColorElements}  nameFormat={colorNameFormat} totalColors={totalColors}/>
    </main>
  )
}


