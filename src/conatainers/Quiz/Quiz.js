import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActieQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
export default class Quiz extends Component {
    state = {
        results: {},
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
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
                answers: [{ text: '1232', id: 1 }, { text: '33', id: 2 }, { text: '1994', id: 3 }]
            },
            {
                question: "When some dull historical stuff happened?",
                rightAnswerId: 3,
                answers: [{ text: '1232', id: 1 }, { text: '33', id: 2 }, { text: '1994', id: 3 }]
            },
            {
                question: "When some questionable historical stuff happened?",
                rightAnswerId: 3,
                answers: [{ text: '1232', id: 1 }, { text: '33', id: 2 }, { text: '1994', id: 3 }]
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
        console.log("checking answer Id", answerId)
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[this.state.activeQuestion]) {
                results[this.state.activeQuestion] = 'success';
            }
            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[this.state.activeQuestion] = 'error';
            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            activeQuestion:0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Reply to all questions</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                OnRetry={this.retryHandler}
                            ></FinishedQuiz>
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}