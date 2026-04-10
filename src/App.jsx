import {useState} from "react"
import ColorApp from "./ColorApp"
import Help from "./Help"



export default function App(){

  const [showHelp, setShowHelp] = useState(false)

  

  function changeSection(){
    setShowHelp(prevState => !prevState)
  }

  return(
    <main>
      <header>
        <a href="https://www.ratnaarts.com/"><img src="/public/logo.svg" className="logo"/></a>
        <button 
          className="help-btn" 
          onClick={changeSection}>
            {showHelp ? "← Back" : 
                        <i className="fa-regular fa-circle-question"></i>}
          </button>
      </header>
{showHelp?<Help/>: <ColorApp />}

       

    </main>
  )
}


