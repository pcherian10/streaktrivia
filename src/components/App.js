import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './auth/Login'
import Register from './auth/Register'
import * as actions from '../actions'

import Header from './Header'
import PlayGame from './PlayGame'


const Landing = () => <h2>Landing</h2>
const Stats = () => <h2>Your stats</h2>
const SubmitAQuestion = () => <h2>Submit a Question</h2>


class App extends Component {


    componentDidMount () {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.getCurrentUser();
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/stats" component={Stats}/>
                        <Route path="/game" component={PlayGame}/>
                        <Route path="/questions/new" component={SubmitAQuestion}/>
                    </div>
                </BrowserRouter>
            </div>
        )
        }
}

export default connect(null, actions)(App);