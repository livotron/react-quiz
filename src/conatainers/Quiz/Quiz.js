import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActieQuiz'
export default class Quiz extends Component {
    state = {
        quiz: [
            { answers: [ {text: 'Question one'}, {text: 'Question two'},
            {text: 'Question three'}, {text: 'Question for'} ]},
            { answers: [ {text: 'Question one'} ]},
            { answers: [ {text: 'Question one'} ]},
            { answers: [ {text: 'Question one'} ]},
            { answers: [ {text: 'Question one'} ]}

        ]
    }
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                <h1>Quiz</h1>

                    <ActiveQuiz 
                        answers={this.state.quiz[0].answers}
                    />
                </div>
            </div>
        )
    }
}