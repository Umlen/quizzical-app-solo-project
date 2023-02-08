import { useState } from 'react';
import StartQuiz from './components/StartQuiz';
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const quizToggler = () => setStartQuiz(prevStartQuiz => !prevStartQuiz);

  return (
    <main>
      {startQuiz ? <Quiz newQuizHandler={quizToggler} /> : <StartQuiz startBtnHandler={quizToggler} />}
    </main>
  );
}

export default App;
