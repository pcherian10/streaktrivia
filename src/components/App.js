import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const Header = () => <h2>Header</h2>
const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>
const PlayGame = () => <h2>Game</h2>
const SubmitAQuestion = () => <h2>Submit a Question</h2>


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/rankings" component={Dashboard}/>
                    <Route path="/games/new" component={PlayGame}/>
                    <Route path="/questions/new" component={SubmitAQuestion}/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;