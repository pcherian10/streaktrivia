import React, { Component }  from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {

    renderContent () {
        switch(this.props.auth) {
            case null:
                return [
                    <Link 
                        key="1"
                        className="item"
                        to="/register"
                    >
                        Sign Up
                    </Link>,
                    <Link 
                        key="2"
                        className="item"
                        to="/login"
                    >
                        Login
                    </Link>
                ]
            case false:
                return [
                    <Link 
                        key="1"
                        className="item"
                        to="/register"
                    >
                        Sign Up
                    </Link>,
                    <Link 
                        key="2"
                        className="item"
                        to="/login"
                    >
                        Login
                    </Link>
                ]
            default:
                return [
                    <Link
                        key="1"
                        to="/game"
                        className="item"
                    >
                        Play Game
                    </Link>,
                     <Link
                        key="3"
                        to="/questions"
                        className="item"
                    >
                        Your Questions
                     </Link>,
                     <Link
                        key="2"
                        to="/stats"
                        className="item"
                    >
                     Stats
                    </Link>,
                    <Link
                      key="4"
                      onClick={() => this.props.logout()}
                      to="/"
                      className="item"
                     >
                        Log Out
                  </Link>
                ]


        }

    }

    render() {
        return (
            <div className="ui green inverted menu"> 
                <Link 
                    to={this.props.auth ? '/stats' : '/'}
                    className="ui header item large"
                >  
                    <i className="question circle icon"></i>
                    Streak Trivia!
                </Link>
                <div className="right item">
                    {this.renderContent()}
                </div>
          </div>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    return { auth }
}

export default connect(mapStateToProps, actions)(Header);