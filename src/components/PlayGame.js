import React, { Component } from 'react' 
import { connect } from 'react-redux'
import { fetchQuestion } from '../actions'
import { headers, handleErrors } from '../actions/index'
import { Grid, Form, Segment, Button, Header, Message, Radio } from 'semantic-ui-react'
import URL_ROOT from '../actions/URL'


class PlayGame extends Component {

    state = { showNextQuestion : false }

    componentDidMount() {
        this.props.fetchQuestion(localStorage.getItem('token'));
    }

    onRadioChange = (e, { value }) => this.setState({ value })

    handleSubmit = event => {
        event.preventDefault()

        //ping database to create attempt record in database
            //pass user_id and question_id params to attempt to create
            //response should return value of 0 or 1
                //if 0, then showNextQuestion should be set to false.
                //if 1, then showNextQuestion should be set to true.
        const user_id = localStorage.getItem('token')
        const question_id = this.props.question.id
        fetch(`${URL_ROOT}users/${user_id}/attempts`, {
            method: 'POST',
            headers: headers,
            data: {},
            dataType: "JSON",
            body: JSON.stringify({ user_id, question_id})
        }).then(handleErrors)
          .then(res => res.json())
          .then(res => {
              console.log(res)
          })
    }

    //using a boolean to keep rendering state over.
    render() {
        const { question, first_choice, second_choice, third_choice } = this.props.question
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450}}>
                    
                <Form onSubmit={this.handleSubmit} size="large">
                    <Segment stacked>
                        <Header as="h1" icon color="green" textAlign="center">
                            Streak: 0
                        </Header>
                        <Header as="h4" icon color="green" textAlign="center">
                            {question}
                        </Header>
                        <Form.Field>
                            <Radio
                                label={first_choice}
                                value={1}
                                checked={this.state.value === 1}
                                onChange={this.onRadioChange}
                            />
                        </Form.Field>
                        <br></br>

                        <Form.Field>
                            <Radio
                                label={second_choice}
                                value={2}
                                checked={this.state.value === 2}
                                onChange={this.onRadioChange}
                            />
                        </Form.Field>
                        <br></br>

                        <Form.Field>
                            <Radio
                                label={third_choice}
                                value={3}
                                checked={this.state.value === 3}
                                onChange={this.onRadioChange}
                            />
                        </Form.Field>
                        <br></br>
                    </Segment>
                    <Button color="orange">
                        Submit
                    </Button>
                </Form>
                </Grid.Column>
            </Grid>
        );
    }

}


const mapStateToProps = ({ question, auth }) => {
    return { question , auth }
}

export default connect(mapStateToProps, { fetchQuestion } )(PlayGame);