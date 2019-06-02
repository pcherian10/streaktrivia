import React, { Component } from 'react'
import { headers, handleErrors } from '../actions/index' 
import URL_ROOT from '../actions/URL'
import './App.css'

class Stats extends Component {

    state = {
        longestStreak: null,
        correctOverall: null,
        incorrectOverall: null,
        ranking: null,
        username: null
    }

    componentDidMount () {
        const user_id = localStorage.getItem('token')

        console.log(user_id)

        fetch(`${URL_ROOT}users/${user_id}/stat`, {
            method: 'GET',
            headers: headers,
        }).then(handleErrors)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    longestStreak: res.longest_streak,
                    correctOverall: res.correct_overall,
                    incorrectOverall: res.incorrect_overall,
                    ranking: res.ranking,
                    username: res.user.username
                })
            })
            .catch(err => {
                console.log(err)
            });
    }


    render() {

        const { longestStreak, correctOverall, incorrectOverall, ranking } = this.state

        return (
            <div className="stat-container">
                  <h1>Your Top Streak:</h1>
                    {longestStreak ?
                        <div className="main-number">{longestStreak}</div>
                        :
                        <div className="subtext">You've yet to start a streak!</div>
                    }
                <br></br>
                <h1>Your Number Correct:</h1>
                    {correctOverall  ?
                        <div>
                            <div className="main-number">{correctOverall}</div>
                            <div className="subtext" style={{transform: "translate(5vh, -1vh)"}}> / {correctOverall + incorrectOverall}</div>
                        </div>
                        :
                        <div className="subtext">You've yet to start </div>
                    }
                <br></br>
                <h1>Your Global Rank:</h1>
                    {ranking ?
                        <div>
                            <div className="main-number">{ranking}</div>
                        </div>
                        :
                        <div className="subtext" style={{ transform: "translate(-5vw')" }}>You miss a 100% shots you don't take, start a game!</div>
                    }
                    <br></br>
            </div>
        );
    }



}

export default Stats;