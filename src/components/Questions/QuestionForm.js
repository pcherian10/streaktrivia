//QuestionForm shows a form for a user to add input
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router-dom' 
import { Grid, Form, Button, Segment, Checkbox, Header, Message} from 'semantic-ui-react'
import { headers, handleErrors } from '../../actions/index'
import URL_ROOT from '../../actions/URL'
import '../App.css'

class QuestionForm extends Component {

    state = {
        question: "",
        first_choice: "",
        second_choice: "",
        third_choice: "",
        correct_answer: "",
        errors: [],
        loading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onRadioChange = (e, { value }) => this.setState({ 
        correct_answer: value 
    })

    handleSubmit = event => {
        event.preventDefault();


        if(this.isFormValid()) {
            this.setState({ errors: [], loading: true})
            const { question, first_choice, second_choice, 
                third_choice, correct_answer }  = this.state
            const author_id = localStorage.getItem('token')
            const question_text = question
            console.log('about to send over fetch')
            fetch(`${URL_ROOT}users/${author_id}/questions`, {
                method: 'POST',
                headers: headers,
                data: {},
                dataType: "JSON",
                body: JSON.stringify({ author_id, question_text, first_choice,
                            second_choice, third_choice, correct_answer })
              }).then(handleErrors)
                .then(res => res.json())
                .then((res) => {
                    window.location.href = '/questions';
                })
                .catch(err => {
                    this.setState({ 
                        errors: this.state.errors.concat(err), 
                        loading: false 
                    });
                });
            }
    }

    isFormValid = () => {
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields, please! Ensure you've set the correct answer!"}
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isQuestionValid(this.state)) {
            error = { message: "Question appears too short or missing a question mark." };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        return true;
    }

    isFormEmpty = ({ question, first_choice, second_choice, third_choice, correct_answer }) => {
        return !question.length || !first_choice.length || !second_choice.length || !third_choice.length || !typeof(correct_answer)==="number"
    }

    isQuestionValid = ({ question }) => {
        if (question.length < 5 || !question.includes("?")) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map(( error, i ) => <p key={i}>{error.message}</p>);

    handleInputError = ( errors, inputName ) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)) ?
            'error'
            :
            " "
    }

    renderChoices() {
        const { first_choice, second_choice, third_choice, correct_answer, errors } = this.state
            return (
                <div>
                <Form.Group> 
                    <Form.Input
                        icon="arrow right"
                        iconPosition="left"
                        name="first_choice" 
                        type="text" 
                        placeholder="First Choice"
                        onChange={this.handleChange}
                        className={this.handleInputError(errors, 'first_choice')}
                        value={first_choice}
                    />
                    <Checkbox 
                        color="green"
                        name="correctAnswerGroup"
                        value={1}
                        checked={correct_answer === 1}
                        onChange={this.onRadioChange}
                        className={this.handleInputError(errors, 'correct_answer')}

                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Input 
                        icon="arrow right"
                        iconPosition="left"
                        name="second_choice" 
                        type="text" 
                        placeholder="Second Choice"
                        className={this.handleInputError(errors, 'second_choice')}
                        onChange={this.handleChange}
                        value={second_choice}
                    />
                    <Checkbox 
                       color="green"
                       name="correctAnswerGroup"
                       value={2}
                       checked={correct_answer === 2}
                       onChange={this.onRadioChange}
                       className={this.handleInputError(errors, 'correct_answer')}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Input
                        color="green"
                        icon="arrow right"
                        iconPosition="left"
                        name="third_choice" 
                        type="text" 
                        placeholder="Third Choice"
                        onChange={this.handleChange}
                        className={this.handleInputError(errors, 'third_choice')}
                        value={third_choice}
                    />
                    <Checkbox
                        name="correctAnswerGroup"
                        value={3}
                        checked={correct_answer === 3}
                        onChange={this.onRadioChange}
                        className={this.handleInputError(errors, 'correct_answer')}
                    />
                </Form.Group>
                </div>
            )
    
    }

    render() {
        const { question, loading, errors } = this.state
        return(
            <Grid textAlign="center" verticalAlign="top" className="app">
                <Grid.Column style={{ maxWidth: 550 }}>
                    <Header size="small" disabled>
                        Write your question, choices and set the right answer!
                    </Header>
                    {errors.length > 0 && (
                        <Message error>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Input
                            fluid name="question"
                            iconPosition="left"
                            type="text" 
                            icon="question"
                            placeholder="Your Question Here"
                            className={this.handleInputError(errors, 'question')}
                            onChange={this.handleChange}
                            value={question}
                        />
                        <Segment className="ui center aligned grid">
                            <div style={{padding: '2em'}}>
                                {this.renderChoices()}
                            </div>
                        </Segment>

                        <Grid columns={2}>
                            <Grid.Column floated="left">
                                <Link  to="/questions" className="ui button" >
                                    Back
                                </Link>
                            </Grid.Column>
                            <Grid.Column floated="right">
                                <Button 
                                    disabled={loading}
                                    className={loading ? 'loading' : ''}
                                    color="teal"
                                >
                                    Submit
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Grid.Column>
            </Grid> 
        );
    }
}

export default reduxForm({
    form: 'questionForm'
})(QuestionForm);