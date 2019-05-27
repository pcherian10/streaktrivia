import React, { Component } from 'react'
import  { connect } from 'react-redux'
import { FETCH_USER } from "../../actions/types"
import { headers, handleErrors } from "../../actions/index"
import URL_ROOT from '../../actions/URL'
import { Link } from 'react-router-dom'
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react'
import '../App.css'


class Login extends Component {

    state = {
        email: "",
        password: "",
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
        const { email, password } = this.state
        if(this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true})
            fetch(`${URL_ROOT}auth`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ email, password })
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
     

    isFormValid = ({ email, password }) => email && password;

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)) ?
            'error'
            :
            " "      
    }

    render() {
        const { email, password, loading, errors } = this.state
        return (
            <Grid textAlign = "center" verticalAlign="top" >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="green" textAlign="center">
                        <Icon name="question circle" color="green" />
                    </Header>
                    {errors.length > 0 && (
                        <Message error>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
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
                            <Button
                                disabled={loading}
                                className={loading ? 'loading' : ''}
                                color="blue"
                                fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )

    }

}



export default connect()(Login);
