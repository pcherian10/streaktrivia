//QuestionForm shows a form for a user to add input
import React, { Component } from 'react'
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form'
import { Grid, Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import QuestionField from './QuestionField'
import formFields from './formFields'


class QuestionForm extends Component {

    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return (
                <Field component={QuestionField}
                key={name}
                type="text"
                label={label}
                name={name} />
            )
        })
    }

    render() {
        return (
            <Grid textAlign="center" verticalAlign="top" className="app">
                <Grid.Column style={{ maxWidth: 350}}> 
                    <Form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                        {this.renderFields()}
                        <Link to="/questions" className="button">
                            Cancel
                        </Link>
                        <Button type="submit" to="/questions" >
                            <Icon name="right" ></Icon>
                            Next
                        </Button>
                    </Form>
                </Grid.Column>
            </Grid> 
        )
     }
}

export default reduxForm({
    form: 'questionForm'
})(QuestionForm);