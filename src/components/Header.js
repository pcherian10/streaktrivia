import React, { Component }  from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {


    render() {
        return (
            <div className="ui green inverted menu">
                <div className="ui header item large">
                    <i className="question circle icon"></i>
                    Streak Trivia!
                </div>
               
                <div className="right item">
                    <Link className="item">
                        Play Game
                    </Link>
                    <Link className="item">
                        Submit a Question!
                    </Link>
                    <Link class="item">
                        Logout
                    </Link>
                </div>
          </div>
        );
    }

}

export default Header;