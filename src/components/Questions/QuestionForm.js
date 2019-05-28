//QuestionForm shows a form for a user to add input
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router-dom' 
import { Grid, Form, Button, Segment, Checkbox} from 'semantic-ui-react'
import '../App.css'

class QuestionForm extends Component {

    state = {
        question: "",
        firstChoice: "",
        secondChoice: "",
        thirdChoice: "",
        correctAnswer: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    onRadioChange = (e, { value }) => this.setState({ 
        correctAnswer: value 
    })

    renderChoices() {
        const { firstChoice, secondChoice, thirdChoice, correctAnswer } = this.state
            return (
                <div>
                <Form.Group> 
                    <Form.Input
                        icon="arrow right"
                        iconPosition="left"
                        name="firstChoice" 
                        type="text" 
                        placeholder="First Choice"
                        onChange={this.handleChange}
                        value={firstChoice}
                    />
                    <Checkbox 
                        name="correctAnswerGroup"
                        value={1}
                        checked={correctAnswer === 1}
                        onChange={this.onRadioChange}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Input 
                        icon="arrow right"
                        iconPosition="left"
                        name="secondChoice" 
                        type="text" 
                        placeholder="Second Choice"
                        onChange={this.handleChange}
                        value={secondChoice}
                    />
                    <Checkbox 
                       name="correctAnswerGroup"
                       value={2}
                       checked={correctAnswer === 2}
                       onChange={this.onRadioChange}
                    />
                </Form.Group>
                <Form.Group> 
                    <Form.Input
                        icon="arrow right"
                        iconPosition="left"
                        name="thirdChoice" 
                        type="text" 
                        placeholder="Third Choice"
                        onChange={this.handleChange}
                        value={thirdChoice}
                    />
                    <Checkbox
                        name="correctAnswerGroup"
                        value={3}
                        checked={correctAnswer === 3}
                        onChange={this.onRadioChange}
                    />
                </Form.Group>
                </div>
            )
    
    }

    render() {
        const { question } = this.state
        return(
            <Grid textAlign="center" verticalAlign="top" className="app">
                <Grid.Column style={{ maxWidth: 550 }}>
                    <Form onSubmit={this.handleSubmit} size="large" >
                        <Form.Input
                            fluid name="question"
                            iconPosition="left"
                            type="text" 
                            icon="question"
                            placeholder="Your Question Here"
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
                                <Button >
                                    Next
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