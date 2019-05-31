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
                        Earn the longest string of correct answers and you will be made the ruler of all things. 
                        <br></br><br></br>
                        Contribute clever questions that can end streaks 
                        <span role="img" aria-label="smirk" style={{ fontSize:'17px' }}> &#128527;</span> 
                        and show off your creativity and knowledge to trivia fans around the world.
                        <span role="img" aria-label="geek" style={{ fontSize:'17px' }}> &#129299;</span>
                    </p>
                    <div className="scroll" />
                </div>
                
            </div>
            
        </div>
    )
}

export default Landing;