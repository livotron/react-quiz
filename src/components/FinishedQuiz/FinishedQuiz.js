import React from 'react';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = props => {
    console.log(props.results)
    let successCount = Object.keys(props.results).reduce((total, key) => {
        console.log("reducing", total, key)
        if(props.results[key] === 'success') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    console.log(props.results)
                    const cls = [
                        'fa',
                        props.results[index] ==='error' 
                        ? 'fa-times ' + classes.error 
                        : 'fa-check ' + classes.success
                    ]
                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}.</strong>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Correct {successCount} out of {props.quiz.length}</p>
            <div>
                <Button onClick={props.OnRetry} type="primary">Repeat</Button>
                <Button onClick={props.OnRetry} type="success">To the test lists</Button>
            </div>
        </div>
    )
};

export default FinishedQuiz;