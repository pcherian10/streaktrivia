import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Message, Icon} from 'semantic-ui-react'
import PlayGame from './PlayGame'
import RestartGame from './RestartGame'


class GameContainer extends Component {

    state = {
        showNextQuestion: true,
        changeQuestion: false,
        correctAnswer: null,
        currentStreak: 0
    }

    renderContent() {
        const { correctAnswer } = this.state

        if(this.state.showNextQuestion) {
            return (
                <div>
                    <Message hidden={ correctAnswer === "Correct! On to the next!" ? false : true } color={"green"}>
                        <Icon name="smile outline" size="big"></Icon>
                        {correctAnswer}
                    </Message>
                    <PlayGame 
                        changeQuestion={this.state.changeQuestion} 
                        correctAnswer={(streak) => this.setState({ 
                                changeQuestion: !this.state.changeQuestion,  
                                correctAnswer: "Correct! On to the next!", 
                                currentStreak: streak })}
                        incorrectAnswer={
                            (choices, correctAnswerIndex) => this.setState({ 
                                showNextQuestion: false,
                                correctAnswer: choices[correctAnswerIndex],
                                currentStreak: 0
                        })}/>
                </div>
            )
        }
        return <RestartGame correctAnswer={correctAnswer} restart={() => this.setState({ showNextQuestion: true })}/>
    }


    render () {
        const { currentStreak } = this.state;
        console.log(currentStreak)
        return (
            <Grid textAlign="center" verticalAlign="top" className="app">
                <Grid.Column style={{ maxWidth: 450}}> 
                <Header as="h2" icon color="green" textAlign="center">
                        Streak: {currentStreak ? currentStreak : 0}
                </Header>  
                     {this.renderContent()}
                </Grid.Column>
            </Grid> 
        )

    }



}

const mapStateToProps = ({ streak }) => {
    return { streak }
}

export default connect(mapStateToProps, null)(GameContainer);