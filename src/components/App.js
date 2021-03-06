import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Auth/Login'
import Register from './Auth/Register'
import * as actions from '../actions'
import './App.css'

import Header from './Header'
import GameContainer from './GameContainer'
import QuestionDashboard from './Questions/QuestionDashboard'
import QuestionNew from './Questions/QuestionNew'
import Landing from './Landing'
import Stats from './Stats'




class App extends Component {


    componentDidMount () {
        const token = localStorage.getItem('token');
        if(token) {
            this.props.getCurrentUser();
        }
    }

    render() {
        return (
            <div >
                <BrowserRouter>
                    <div className="app">
                        <Header />
                        <Route exact path="/" component={Landing}/>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/stats" component={Stats}/>
                        <Route path="/game" component={GameContainer}/>
                        <Route exact path="/questions" component={QuestionDashboard}/>
                        <Route path="/questions/new" component={QuestionNew}/>

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