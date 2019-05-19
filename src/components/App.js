import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'


const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>
const PlayGame = () => <h2>Game</h2>
const SubmitAQuestion = () => <h2>Submit a Question</h2>


const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing}/>
                    <Route path="/rankings" component={Dashboard}/>
                    <Route path="/game" component={PlayGame}/>
                    <Route path="/questions/new" component={SubmitAQuestion}/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;