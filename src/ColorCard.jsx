export default function ColorCard(props){
 function lock(e){
      console.log("lock/unlock clicked "+e.target.id)
     
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
      props.setColorElements(prevState => prevState.filter((data,index)=>e.target.id!=index))
}
  return(
   <div id="color-container" className="color-container">
   {
    props.colorElements.map((data,index)=>(
          <div key={index}>
          <img src={data.image} />
          <p>{data[props.nameFormat]}</p>
          <button id={index} onClick={lock}> {props.colorElements[index].lock? "unlock":"lock"} </button>
          <button id={index} onClick={deleteColor}> delete</button>
          </div>
    ))
   }
     
    </div>
    )

}