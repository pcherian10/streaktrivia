import React from 'react'
import { Button } from 'semantic-ui-react'



const RestartQuestion = ({ restart }) => {
  
    return (
        <Button onClick={restart}>
            Click to Restart!
        </Button>
    )

}

export default RestartQuestion;