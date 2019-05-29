import React, { Component } from 'react'
import { FETCH_USER } from "../../actions/types"
import { headers, handleErrors } from "../../actions/index"
import URL_ROOT from '../../actions/URL'
import { connect } from 'react-redux'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../App.css'

class Register extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid()) {
            this.setState({ errors: [], loading: true})
            const { username, email, password } = this.state
            const user = { username, email, password }
            console.log(user)
            fetch(`${URL_ROOT}users`, {
                method: 'POST',
                headers: headers,
                data: {},
                dataType: "JSON",
                body: JSON.stringify({ user })
              }).then(handleErrors)
                .then(res => res.json())
                .then(res => {
                    localStorage.setItem('token', res.id)
                    window.location.href = '/stats';
                    this.props.dispatch({type: FETCH_USER, payload: res})
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
            error = { message: "Fill in all fields, please!"}
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: "Password is invalid" };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        return true;
    }

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
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

    render() {
        const {username, email, password, passwordConfirmation,loading, errors } = this.state

        return (
            <Grid textAlign = "center" verticalAlign="top" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="blue" textAlign="center">
                        <Icon name="question circle" color="teal" />
                        Sign Up for Streak Trivia
                    </Header>
                    {errors.length > 0 && (
                        <Message error>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid name="username"
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={this.handleChange}
                                value={username}
                                className={this.handleInputError(errors, 'username')}
                                type="text" />
                            <Form.Input
                                fluid name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInputError(errors, 'email')}
                                type="email" />
                             <Form.Input
                                fluid name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                className={this.handleInputError(errors, 'password')}
                                type="password" />
                              <Form.Input
                                fluid name="passwordConfirmation"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                onChange={this.handleChange}
                                value={passwordConfirmation}
                                className={this.handleInputError(errors, 'password')}
                                type="password" />
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="blue"
                                fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>Already have an account? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )

    }

}

export default connect()(Register);