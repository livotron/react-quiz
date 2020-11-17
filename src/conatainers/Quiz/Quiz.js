import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActieQuiz'
export default class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null, 
        quiz: [
            {
                rightAnswerId: 1,
                answers: [{ text: 'Black', id: 1 }, { text: 'Blue', id: 2 },
                { text: 'Green', id: 3 }, { text: 'Yellow', id: 4 }],
                question: "What color the sky is?"
            },
            {
                question: "When some epic historical stuff happened?",
                rightAnswerId: 3,
                answers: [{ text: '1232',id: 1 },{ text: '33',id: 2 },{ text: '1994',id: 3 }]
            },
            {
                question: "When some dull historical stuff happened?",
                rightAnswerId: 3,
                answers: [{ text: '1232',id: 1 },{ text: '33',id: 2 },{ text: '1994',id: 3 }]
            },
            {
                question: "When some questionable historical stuff happened?",
                rightAnswerId: 3,
                answers: [{ text: '1232',id: 1 },{ text: '33',id: 2 },{ text: '1994',id: 3 }]
            }

        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                console.log(" after timer with id ",answerId)
                if (this.isQuizFinished()) {
                    console.log("finished")
                } else {
                        this.setState({
                            activeQuestion: this.state.activeQuestion + 1,
                            answerState: null
                        })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Reply to all questions</h1>

                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}