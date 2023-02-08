import topBlob from '../images/top-blob.png';
import bottomBlob from '../images/bottom-blob.png';

export default function StartQuiz(props) {
    return (
        <div className='start-quiz-container'>
            <img src={topBlob} className='top-blob' alt=""/>
            <h1 className='start-quiz-header'>Quizzical</h1>
            <p className='start-quiz-description'>Some description if needed</p>
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