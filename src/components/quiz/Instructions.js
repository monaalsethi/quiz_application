import React, { Fragment } from 'react' ;
import { Link } from 'react-router-dom' ;
import { Helmet } from 'react-helmet' ;
import answer from '../../assets/img/answer.png' ;
import fiftyfifty from '../../assets/img/fiftyfifty.png' ;
import hints from '../../assets/img/hints.png' ;
import options from '../../assets/img/options.png' ;

const Instructions = () => (
    <Fragment>
        <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
        <div className = "instructions container">
            <h1>How to Play the game</h1>
            <ul className = "browser-default" id = "main-list">
            <p>Ensure you read this guide from start to finish.</p>
                <li>The game has a duration of 15 minutes and ends as soon as your time elapses.</li>
                <li>Each game consists of 15 questions.</li>
                <li>
                    Every question contains 4 options.
                    <img src = {options} alt = "Quiz App options example"/>
                </li>
                <li>Select the option which best answers the question by clicking (or selecting) it.
                <img src = {answer} alt = "Quiz App answer example"/>
                </li>
                <li>
                    Each game has 2 lifelines, namely : 
                    <ul>
                        <li>    2 50-50 chances</li>
                        <li>    5 hints</li>
                    </ul>
                </li>
                <li>
                    Selecting the 50-50 lifeline by clicking the icon
                    <span className = "mdi mdi-set-center mdi-24px lifeline-icon"></span>
                    will remove 2 wrong answers, leaving the correct answer and one wrrong answer
                    <img src = {fiftyfifty} alt = "Quiz App fifty-fifty example"></img>
                </li>
                <li>Using a hint by clicking the icon
                <span className = "mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
                will remove one wrong answer leaving two wrong answers and one correct answer.
                <img src = {hints} alt = "Quiz App hints example"></img>
                </li>
                <li>Feel free to quit the game at any time. In that case your score will be revealed.</li>
                <li>The timer starts as soon as the game loads</li>
                <li>Let's do this if you think you have got what it takes</li>
            </ul>
            <div>
                <span className = "left"><Link to = "/">No, take me back</Link></span>
                <span className = "right"><Link to = "/play/quiz">Okay, Let's do this</Link></span>
            </div>
        </div>
    </Fragment>
)

export default Instructions ;