import React from 'react'
import { Button, Message, Icon } from 'semantic-ui-react'



const RestartQuestion = ({ restart, correctAnswer }) => {
  
    return (
        <div>
            <Message color="red">
                <Icon name="thumbs down"></Icon>
                Incorrect, it was {correctAnswer}!
            </Message>
            <Button onClick={restart}>
                Try Again!
            </Button>
        </div>
    )

}

export default RestartQuestion;