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
                <a class="item">
                    About Us
                </a>
                <a class="item">
                Jobs
                </a>
                <a class="item">
                Locations
                </a>
          </div>
        );
    }

}

export default Header;