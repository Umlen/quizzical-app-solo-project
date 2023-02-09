import './style/app.css';
import { useState } from 'react';
import StartQuiz from './components/StartQuiz';
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizCategory, setQuizCategory] = useState('');
  const [quizDifficult, setQuizDifficult] = useState('&difficulty=easy');

  const quizToggler = () => setStartQuiz(prevStartQuiz => !prevStartQuiz);
  
  function changeCategory(e) {
    const selectedCategory = e.target.value;
    setQuizCategory(selectedCategory);
  }

  function changeDifficult(e) {
    const selectedDifficult = e.target.value;
    setQuizDifficult(selectedDifficult);
  }

  return (
    <main>
      {
        startQuiz ? 
          <Quiz 
            newQuizHandler={quizToggler} 
            category={quizCategory}
            difficult={quizDifficult} 
          /> 
          : 
          <StartQuiz 
            startBtnHandler={quizToggler} 
            category={quizCategory}
            categoryHandler={changeCategory}
            difficult={quizDifficult}
            difficultyHandler={changeDifficult}  
          />
      }
    </main>
  );
}

export default App;
