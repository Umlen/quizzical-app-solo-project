import { useState, useEffect } from 'react';

export default function Quiz() {
    const [quiz, setQuiz] = useState([]);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => setQuiz(data.results));
    }, []);

    function renderQuiz() { 
        return quiz.map((question, key) => {
            const answersArray = createAnswersArray(question.correct_answer, question.incorrect_answers);
            return ( 
                <div key={key}>
                    <p>{question.question}</p>
                    {answersElements(answersArray)}
                </div>
            );
        });
    }

    function createAnswersArray(correctAnswer, incorrectAnswersArr) {
        const arrayCopy = [...incorrectAnswersArr];
        arrayCopy.splice(Math.floor(Math.random() * 4), 0, correctAnswer);
        return arrayCopy;
    }

    const answersElements = (answersArr) => answersArr.map((answer, key) => <div key={key}>{answer}</div>);

    return (
        <div className="quiz-container">
            {renderQuiz()}
        </div>
    );
}