import { useState } from 'react';
import StartQuiz from './components/StartQuiz';
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  const startQuizToggler = () => setStartQuiz(prevStartQuiz => !prevStartQuiz);

  return (
    <main>
      {startQuiz ? <Quiz /> : <StartQuiz startBtnHandler={startQuizToggler} />}
    </main>
  );
}

export default App;
