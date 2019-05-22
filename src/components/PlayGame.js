import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchQuestion } from '../actions'
import { Grid, Form, Segment, Button, Header, Message, Icon, Radio } from 'semantic-ui-react'


class PlayGame extends Component {

    state = { showNextQuestion : true }

    componentDidMount() {
        this.props.fetchQuestion(localStorage.getItem('token'));
    }

    onRadioChange = (e, { value }) => this.setState({ value })

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
                    <Button>
                        
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