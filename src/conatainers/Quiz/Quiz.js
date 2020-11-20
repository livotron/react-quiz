import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActieQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/Actions/quiz';
class Quiz extends Component {

    retryHandler = () => {
 
    }

    componentDidMount() {
        console.log(this.props)
       this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        console.log(this.props)

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Reply to all questions</h1>
                    {   
                        this.props.loading  || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                OnRetry={this.props.retryQuiz}
                            ></FinishedQuiz>
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        isFinished: state.quiz.isFinished,
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quiz)