import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { fetchQuestion, fetchStreak} from '../actions'
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
            this.setState({
                userAnswer: ""
            })
        }
    }

    onRadioChange = (e, { value }) => this.setState({ 
        userAnswer: value 
    })

    handleSubmit = event => {
        event.preventDefault()
        
        const user_id = localStorage.getItem('token')
        const question_id = this.props.question.id
        const answer = this.state.userAnswer

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
                const responseValues = Object.values(this.props.question)
                const choices = [responseValues[2], responseValues[3], responseValues[4]]
                console.log(choices)

                this.props.fetchStreak(localStorage.getItem('token'))

                res.correct_answer === 4 ? 
                this.props.correctAnswer() 
                : 
                this.props.incorrectAnswer(choices, res.correct_answer - 1)  
                
          })


    }

    renderQuestion = () => {
        const { question, first_choice, second_choice, third_choice } = this.props.question
          return (
            <Form onSubmit={this.handleSubmit} size="large">
                <Segment stacked textAlign="left">
                    <Header as="h3" icon color="grey" textAlign="left">
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

export default connect(mapStateToProps, { fetchQuestion, fetchStreak } )(PlayGame);