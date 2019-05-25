import React, { Component } from 'react'
import { Grid, Header, Message } from 'semantic-ui-react'
import PlayGame from './PlayGame'
import RestartGame from './RestartGame'


class GameContainer extends Component {

    state = {
        showNextQuestion: true,
        changeQuestion: false,
        message: null
    }

    //maybe a questionChange variable will keep track of whether component needs to update

    renderContent() {
        
        if(this.state.showNextQuestion) {
            return (
                <div>
                    <Message>{this.state.message}</Message> 
                    <PlayGame changeQuestion={this.state.changeQuestion} correctAnswer={() => this.setState({ changeQuestion: !this.state.changeQuestion, message: "Correct!"})}
                    incorrectAnswer={() => this.setState({ showNextQuestion: false, message: "Incorrect"})}/>
                </div>
            )
        }
        return <RestartGame restart={() => this.setState({ showNextQuestion: true })}/>
    }


    render () {
       
        return (
            <Grid textAlign="center" verticalAlign="top" className="app">
                <Grid.Column style={{ maxWidth: 450}}>   
                    <Header as="h2" icon color="green" textAlign="center">
                        Streak: 0
                    </Header>
                     {this.renderContent()}
                </Grid.Column>
            </Grid> 
        )

    }



}

export default GameContainer;