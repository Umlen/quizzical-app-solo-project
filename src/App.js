import { useState } from 'react';
import StartQuiz from './components/StartQuiz';
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizCategory, setQuizCategory] = useState('');

  const quizToggler = () => setStartQuiz(prevStartQuiz => !prevStartQuiz);
  
  function changeCategory(e) {
    const selectedCategory = e.target.value;
    setQuizCategory(selectedCategory);
  }

  console.log(quizCategory)
  return (
    <main>
      {
        startQuiz ? 
          <Quiz newQuizHandler={quizToggler} category={quizCategory} /> : 
          <StartQuiz startBtnHandler={quizToggler} categoryHandler={changeCategory} category={quizCategory} />
      }
    </main>
  );
}

export default App;
