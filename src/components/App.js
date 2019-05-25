import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './auth/Login'
import Register from './auth/Register'
import * as actions from '../actions'

import Header from './Header'
import GameContainer from './GameContainer'


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
                        <Route path="/game" component={GameContainer}/>
                        <Route path="/questions/new" component={SubmitAQuestion}/>
                    </div>
                </BrowserRouter>
            </div>
        )
        }
}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps, actions)(App);