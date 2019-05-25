import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { fetchQuestion } from '../actions'
import { headers, handleErrors } from '../actions/index'
import { Form, Segment, Button, Header, Radio } from 'semantic-ui-react'
import URL_ROOT from '../actions/URL'


class PlayGame extends Component {

    state = { 
        userAnswer: "",
    }

    componentDidMount() {
        this.props.fetchQuestion(localStorage.getItem('token'));
    }

    componentDidUpdate(prevProps) {
        if(this.props.changeQuestion !== prevProps.changeQuestion) {
            this.props.fetchQuestion(localStorage.getItem('token'));
        }
    }

    onRadioChange = (e, { value }) => this.setState({ 
        userAnswer: value 
    })

    handleSubmit = event => {
        event.preventDefault()

        //ping database to create attempt record in database
            //pass user_id and question_id params to attempt to create
            //response should return value of 0 or 1
                //if 0, then showNextQuestion should be set to false.
                //if 1, then showNextQuestion should be set to true.
        
        const user_id = localStorage.getItem('token')
        const question_id = this.props.question.id
        const answer = this.state.userAnswer
        console.log(this.state.streak)

        fetch(`${URL_ROOT}users/${user_id}/attempts`, {
            method: 'POST',
            headers: headers,
            data: {},
            dataType: "JSON",
            body: JSON.stringify({ user_id, question_id, answer})
        }).then(handleErrors)
          .then(res => res.json())
          .then(res => {
                console.log(res)
                if (res.correct_answer === 4) {
                    this.props.correctAnswer(res.correct_answer)
                } else {
                    this.props.incorrectAnswer();
                }
          })
                 
    }

    renderQuestion = () => {
        const { question, first_choice, second_choice, third_choice } = this.props.question
          return (
            <Form onSubmit={this.handleSubmit} size="large">
                <Segment stacked textAlign="left">
                    <Header as="h3" icon color="green" textAlign="left">
                        {question}
                    </Header>
                    <br></br>
                    <Form.Field>
                        <Radio
                            label={first_choice}
                            value={1}
                            checked={this.state.userAnswer === 1}
                            onChange={this.onRadioChange}
                        />
                    </Form.Field>
                    <br></br>

                    <Form.Field>
                        <Radio
                            label={second_choice}
                            value={2}
                            checked={this.state.userAnswer === 2}
                            onChange={this.onRadioChange}
                        />
                    </Form.Field>
                    <br></br>

                    <Form.Field>
                        <Radio
                            label={third_choice}
                            value={3}
                            checked={this.state.userAnswer === 3}
                            onChange={this.onRadioChange}
                        />
                    </Form.Field>
                    <br></br>
                </Segment>
                <Button color="orange">
                    Submit
                </Button>
            </Form>
          );
    }

    //using a boolean to keep rendering state over.
    render() {
        return(
            <div>
                {this.renderQuestion()}
            </div>
        );
    }

}

//The issue is that you can't change state from within the render if the render is conditional on state.
//The next best thing might be to create a container component, and then render the quesiton

const mapStateToProps = ({ question }) => {
    return { question }
}

export default connect(mapStateToProps, { fetchQuestion } )(PlayGame);