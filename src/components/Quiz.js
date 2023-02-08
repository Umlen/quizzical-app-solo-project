import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Buffer } from 'buffer';

const CheckBtn = (props) => {
    return (
        <button className='button-base-style quiz-btn' onClick={props.clickHandler}>
            Check answers
        </button>
    );
};            

const QuizResult = (props) => {
    return (
        <div className='quiz-result-container'>
            <h3>You scored {props.scores}/5 correct answers</h3>
            <button className='button-base-style quiz-btn' onClick={props.quizStateToggler}>
                Play again
            </button>
        </div>
    );
};

export default function Quiz(props) {
    const [quiz, setQuiz] = useState([]);
    const [scores, setScores] = useState(undefined);

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&type=multiple&encode=base64${props.category}`)
            .then(res => res.json())
            .then(data => {
                const quizArray = data.results.map((question) => {
                    const answersArray = createAnswersArray(question.correct_answer, question.incorrect_answers);
                    return {
                            id: nanoid(),
                            question: decodeApiData(question.question),
                            answers: answersArray,
                            correctAnswer: decodeApiData(question.correct_answer)
                    };
                });
                setQuiz(quizArray);
            });
    }, []);

    function createAnswersArray(correctAnswer, incorrectAnswersArr) {
        const arrayCopy = [...incorrectAnswersArr];
        const answersArray = [];
        arrayCopy.splice(Math.floor(Math.random() * 4), 0, correctAnswer);
        arrayCopy.map(answer => 
            answersArray.push( 
                {
                    id: nanoid(),
                    answer: decodeApiData(answer), 
                    selected: false,
                    style: 'answer-wrapper unselected-answer'
                }
            )
        );
        return answersArray;
    }

    function decodeApiData(str) {
        return Buffer.from(str, 'base64').toString('utf-8');
    }

    function renderQuiz() { 
        return quiz.map((question, key) => {
            return ( 
                <div key={key} className='question-container'>
                    <p className='question-text'>{question.question}</p>
                    <div className='answers-container' id={question.id}>
                        {answersElements(question.answers)}
                    </div>
                </div>
            );
        });
    }

    function answersElements(answersArr) {
        return answersArr.map((answer, key) => {
            return (
                <div key={key} id={answer.id} className={answer.style} onClick={answerClickHandler}>
                    <p>{answer.answer}</p>
                </div>
            );
        });
    }

    function answerClickHandler(e) {
        if (scores === undefined) {
            const selectedAnswerId = e.currentTarget.id;
            const questionId = e.currentTarget.parentElement.id;
            setQuiz(oldQuiz => oldQuiz.map(question => {
                if (questionId === question.id) {
                    return {
                        ...question,
                        answers: question.answers.map(answer => {
                            if (answer.id === selectedAnswerId) {
                                return {
                                    ...answer,
                                    selected: true,
                                    style: 'answer-wrapper selected-answer'
                                };
                            } else {
                                return {
                                    ...answer,
                                    selected: false,
                                    style: 'answer-wrapper unselected-answer'
                                };
                            }
                        })
                    };  
                } else {
                    return question;
                }
            }));
        }
    }

    function checkAnswers() {
        let correctAnswers = 0;
        for (let question of quiz) {
            for (let answer of question.answers) {
                if (answer.selected && answer.answer === question.correctAnswer) {
                    correctAnswers += 1;
                    answer.style = 'answer-wrapper correct-answer';
                } else if (answer.selected && answer.answer !== question.correctAnswer) {
                    answer.style = 'answer-wrapper incorrect-answer';
                } else if (answer.answer === question.correctAnswer) {
                    answer.style = 'answer-wrapper correct-answer';
                }
            };
        };
        setScores(correctAnswers);
    }

    return (
        <div className='quiz-container'>
            {renderQuiz()}
            {scores === undefined ? 
                <CheckBtn clickHandler={checkAnswers} /> : 
                <QuizResult scores = {scores} quizStateToggler={props.newQuizHandler} />
            }
        </div>
    );
}