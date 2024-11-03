import React from 'react'
import { Send} from "@material-ui/icons";
import "./newsLetter.css"


export default function NewsLetter() {
    return (
        <div className="newsLetterWrap">
            <div className="newsLetterTop">
                <h1>NewsLetter SignUp</h1>
                <p>Recieve our Latest news</p>
            </div>
            <div className="newsLetterBottom">
                   <input type="text" placeholder="Enter your mail address"/>
                   <button><Send className="sendIcon"/></button> 
            </div> 
            
        </div>
    )
}
