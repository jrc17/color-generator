import {colorGenerator,customSchemes} from "../src/utils.js"
export default function ColorMenu(props){
   
    
    const lockedColors =props.colorElements.filter(data => data.lock).length 
    const colorCount = Math.max(0,props.totalColors - lockedColors)
    
    
    async function getColorApi(color,scheme=null){
    
      if(colorCount === 0){
        props.setColorElements(prevState => prevState.filter(data => data.lock))
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
    
     if(props.colorElements.length===0 || lockedColors===0){
    
       props.setColorElements(elements)
      }
      
      else{
        
        props.setColorElements([...props.colorElements.filter(data => data.lock), ...elements])
    
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
      props.setColorNameFormat(e.target.value)
    
    }
    function changeTotal(e){
      props.setTotalColors(Number(e.target.value))
    }
    
    return(
        <div className="menu">
       
 <form id="color-form" className="color-form" onSubmit={getColorScheme}>
      <input type="color" id="color-picker" className="color-picker" name="color-picker" defaultValue="#000000"/>
      <div className="menu-element">
  <label htmlFor="colorScheme">Color Scheme</label>
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
        </div>

        <div className="menu-element">
          <label htmlFor="num-colors">Color Count</label>
          <input id="num-colors" className="color-count" type="number" defaultValue={5} onChange={changeTotal} min="1" max="20"/>
        </div>

        <button type="submit">Get color scheme</button>
        </form>

      <div className="sub-menu">

       <div className="menu-element">
        <label htmlFor="color-format">Color Format</label>
           <select id="color-format" onChange={nameFormat} defaultValue="hex" className="color-format">
          <option value="name">Name</option>
          <option value="hex">Hex</option>
          <option value="hsl">HSL</option>
          <option value="rgb">RGB</option>
        </select>
        </div>


      
        </div>

        </div>
    )
}