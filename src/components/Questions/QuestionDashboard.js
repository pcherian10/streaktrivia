import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'


const QuestionDashboard = () => {
    return (
        <div> 
            <div id="floating-button-height">      
                <Link to="/questions/new"
                    className="massive floated circular ui right floated green icon button"
                    id="button-shadow">       
                    <i class="add icon"></i>
                </Link>
            </div>
        </div>
    )

}

export default QuestionDashboard

