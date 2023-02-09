import CategoryComponent from './CategoryComponent';
import DifficultyComponent from './DifficultyComponent';
import topBlob from '../images/top-blob.png';
import bottomBlob from '../images/bottom-blob.png';

export default function StartQuiz(props) {
    return (
        <div className='start-quiz-container'>
            <img src={topBlob} className='top-blob' alt=""/>
            <h1 className='start-quiz-header'>Quizzical</h1>
            <div className='quiz-options-container'>
                <CategoryComponent category={props.category} categoryHandler={props.categoryHandler} />
                <DifficultyComponent difficult={props.difficult} difficultyHandler={props.difficultyHandler} />
            </div>
            <button 
                className='button-base-style' 
                onClick={props.startBtnHandler}
            >
                Start quiz
            </button>
            <img src={bottomBlob} className='bottom-blob' alt=""/>
        </div>
    );
}