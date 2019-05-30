import React from 'react'
import { Icon } from 'semantic-ui-react'
import './App.css'


const Landing = () => {
    return (
        <div className="app">

            <div className="question-mark">
                <Icon style={{ color: "orange", fontSize: '300px'}} name="question circle"></Icon>
            </div>
            <div class="title">
                STREAK
            </div>
            <div class="subtitle">
                TRIVIA
            </div>
            <div>
            </div>
        </div>
    )
}

export default Landing;