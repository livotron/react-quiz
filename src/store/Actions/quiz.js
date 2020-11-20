import axios from '../../axios/axios-quiz';
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY, QUIZ_SET_STATE } from './actionTypes';

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
                try {
            const response = await axios.get('/quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test number ${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            console.log(e);
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart);
        console.log(quizId);
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            dispatch(fetchQuizSuccess(response.data))
        } catch(e) {
            fetchQuizesError(e);
        };
    }
}

export function fetchQuizesStart() {
    return {
        type:FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type:FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type:FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return;
            }
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[state.activeQuestion]) {
                results[state.activeQuestion] = 'success';
            }
            dispatch(quizSetState({ [answerId]: 'success' }, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null
                    // })
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[state.activeQuestion] = 'error';
            // this.setState({
            //     answerState: { [answerId]: 'error' },
            //     results
            // })
            dispatch(quizSetState({[answerId]: 'error'},results))
        }
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}