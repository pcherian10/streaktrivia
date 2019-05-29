import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchQuestions } from '../../actions'
import { Container, Button, lightColors } from 'react-floating-action-button'
import { Icon, Label, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'



class QuestionDashboard extends Component {


    componentDidMount() {
        this.props.fetchQuestions(localStorage.getItem('token'));
        console.log(this.props.questions)
    }

    renderQuestions() {

        return this.props.questions.reverse().map( question =>{
            const choicesArray = [ question.first_choice, question.second_choice, question.third_choice, question.correct_answer - 1 ]
            
            const renderChoices = choicesArray.map ((choice, index) => {
                    if(index === choicesArray[3]) {
                        return <Label size="big" style={{ color: 'teal'}}>{choice}</Label>
                    } else if (index === 3) {
                        return null;
                    }
                    return <Label size="large" color="white">{choice}</Label>
            })

            return (
                <div key={question.id} className="ui cards">
                    <div className="ui teal fluid card">
                        <div className="content">
                            <div className="header">{question.question_text}</div>
                            <br></br>
                                {renderChoices}
                        </div>
                    </div>
                </div>
            )
        })
        
    }


    render() {

        return(
            <div>
            <div className="ui three column grid">
                <div className="column"/>
                <div className="column">
                    <Header>You've contributed {this.props.questions.length} questions!</Header>
                    {this.renderQuestions()}
                </div>  
            </div>
                <Container>
                    <Button
                        styles={{backgroundColor: lightColors.teal, color: "white"}}
                        tooltip="Add a new question!"
                        onClick={() => this.props.history.push("/questions/new")}
                    >
                        <Icon name="edit" size="big"></Icon>
                    </Button>
                </Container>
            </div>

        );
    }
}

function mapStateToProps({ questions }) {
    return { questions };
}

export default connect ( mapStateToProps, {fetchQuestions} )(withRouter(QuestionDashboard))