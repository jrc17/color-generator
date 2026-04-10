import {useState} from "react"

import ColorMenu from "./ColorMenu.jsx"
import ColorCard from "./ColorCard.jsx"



export default function ColorApp(){
    const [totalColors, setTotalColors] =useState(5)
  const [colorElements,setColorElements]= useState([])
  const [colorNameFormat,setColorNameFormat] = useState("hex")

  return(
    <div className="color-app">
         <ColorMenu 
          colorElements={colorElements} 
          setColorElements={setColorElements}  
          nameFormat={colorNameFormat} 
          totalColors={totalColors} 
          setTotalColors={setTotalColors}/>

        <ColorCard 
          colorElements={colorElements} 
          setColorElements={setColorElements}  
          nameFormat={colorNameFormat} 
          totalColors={totalColors}/>

    </div>
  )

}