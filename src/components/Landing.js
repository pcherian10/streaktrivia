import React from 'react'
import { Icon } from 'semantic-ui-react'
import './App.css'


const Landing = () => {
    return (
        <div>
            <div className="question-mark">
                <Icon style={{ color: "orange", fontSize: '300px'}} name="question circle"></Icon>
            </div>
            <div className="title">
                STREAK
            </div>
            <div className="subtitle">
                TRIVIA
            </div>
            <div id="intro">
                A simple, crowd-sourced trivia game 
                <br></br>
            </div>
            <div class="dropdown">
                <span>Instructions</span>
                <div class="dropdown-content">
                    <p> Answer questions created by fellow trivia fans. 
                        Earn the longest string of correct
                        answers and you will be made the ruler of all things. 
                        Just kidding, (maybe). <br></br><br></br>
                        You can also write questions that will be shown to
                        other players, to trip them up
                        <span role="img" aria-label="smirk" style={{ fontSize:'17px' }}> &#128527;</span> or
                        to teach them something new. 
                        <span role="img" aria-label="geek" style={{ fontSize:'17px' }}> &#129299;</span>
                    </p>
                    <div className="scroll" />
                </div>
                
            </div>
            
        </div>
    )
}

export default Landing;