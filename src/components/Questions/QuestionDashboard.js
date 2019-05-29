import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions'
import { Link } from 'react-router-dom'

class QuestionDashboard extends Component {


    componentDidMount() {
        this.props.fetchQuestions(localStorage.getItem('token'));
        console.log(this.props.questions)
    }

    renderQuestions() {
        console.log(this.props.questions)
        return(
        // return this.props.questions.reverse().map(question => {
        //     return (
        //         <div className="card darken-1" key={question._id}>
        //             <div className="card-content">
        //                 <span className="card-title"></span>
        //                     <p>
        //                         {question.question}
        //                     </p>
        //                     <div className="card-action">
        //                         <a href="null">First Choice: {question.first_choice} </a>
        //                         <a href="null">First Choice: {question.second_choice} </a>
        //                         <a href="null">First Choice: {question.third_choice} </a>
        //                     </div>
        //             </div>
        // //         </div>
        //     )
        // })
        <div> 
            <div id="floating-button-height">      
                <Link to="/questions/new"
                    className="massive floated circular ui right floated teal icon button"
                    id="button-shadow">       
                    <i className="add icon"></i>
                </Link>
            </div>
        </div>
        )
    }
    render() {
        return(
            <div>
                {this.renderQuestions()}
            </div>
        );
    }
}

function mapStateToProps({ questions }) {
    return { questions };
}

export default connect( mapStateToProps, {fetchQuestions} )(QuestionDashboard);