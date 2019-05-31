import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStreak } from '../actions'
import { Grid, Header, Message, Icon} from 'semantic-ui-react'
import PlayGame from './PlayGame'
import RestartGame from './RestartGame'


class GameContainer extends Component {

    state = {
        showNextQuestion: true,
        changeQuestion: false,
        correctAnswer: null,
    }

    componentDidMount() {
        this.props.fetchStreak(localStorage.getItem('token'));
    }

    renderContent = () => {
        const { correctAnswer } = this.state
        console.log('this.props.streak', this.props.streak )

        return (
            <div>
                <Header as="h2" textAlign="center" style={{ fontFamily: 'Faster One, cursive', color: "orange", fontSize: '45px'}}>
                    Streak
                    <div style={{ fontFamily: 'Lato', fontSize: '30px' }}>
                        { this.props.streak ? this.props.streak : 0 }
                    </div>
                </Header>  
                {this.state.showNextQuestion ?
                    <div> 
                        <Message hidden={ correctAnswer === "Correct! On to the next!" ? false : true } color={"green"}>
                            <Icon name="smile outline" size="big"></Icon>
                            {correctAnswer}
                        </Message>
                        <PlayGame 
                            changeQuestion={this.state.changeQuestion} 
                            correctAnswer={() => this.setState({ 
                                    changeQuestion: !this.state.changeQuestion,  
                                    correctAnswer: "Correct! On to the next!" })}
                            incorrectAnswer={
                                (choices, correctAnswerIndex) => this.setState({ 
                                    showNextQuestion: false,
                                    correctAnswer: choices[correctAnswerIndex] })}/>
                    </div>
                    :
                     <RestartGame correctAnswer={correctAnswer} restart={() => this.setState({ showNextQuestion: true })}/>
                }
            </div>
        )
    }


    render () {
        return (
            <Grid textAlign="center" verticalAlign="top">
                <Grid.Column style={{ maxWidth: 450}}> 
                     {this.renderContent()}
                </Grid.Column>
            </Grid> 
        )

    }



}

const mapStateToProps = ({ streak }) => {
    return { streak }
}
export default connect(mapStateToProps, { fetchStreak })(GameContainer);