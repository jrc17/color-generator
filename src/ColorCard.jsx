export default function ColorCard(props){

 function lock(e){
     
     
      props.setColorElements(prevState => {

            const updatedLocks =  prevState.map((data,index) => {
                  if(e.target.id=== String(index)){
                        return({...data, lock: !data.lock})
                  }
                  else      
                        return data
                  

            })

            return updatedLocks
      })  
      
}
function deleteColor(e){
      console.log("delete button for color"+e.target.id)
      
      props.setColorElements(prevState => prevState.filter((data,index)=> !(e.target.id ==index && !data.lock)))
}
function colorInfoStyle(rgbColor){
        
      const match = rgbColor.match(/\d+/g)
      const [r, g, b] = match.map(Number)
     
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      const textColor= luminance > 0.5 ? "#000000" : "#ffffff"

      return {color:textColor}


}
      function copyColor(color){
            
            navigator.clipboard.writeText(color)}
      

  return(
   <div id="color-container" className="color-container">
   {
    props.colorElements.map((data,index)=>{

      const style = colorInfoStyle(data.rgb)
      const color = data[props.nameFormat]
      
     return (
          <div key={index} className="color-info">
            <img src={data.image} />
            <p className="color-format-text" style={style}>{color}</p>
            <div className="color-options">
            <button 
                  id={index} 
                  onClick={lock} 
                  style={style}>
                         {props.colorElements[index].lock? 
                              <i className="fa-solid fa-lock"></i>:
                              <i className="fa-solid fa-unlock"></i>} 
            </button>
            <button 
                  id={index} 
                  onClick={deleteColor} 
                  style={style}>
                         <i className="fa-solid fa-x"></i></button>
            <button 
            style={style} 
            onClick={()=>copyColor(color)}>
                   <i className="fa-solid fa-copy"></i></button>
            </div>
          </div>
    )})
   }
     
    </div>
    )

}