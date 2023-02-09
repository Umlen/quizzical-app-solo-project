export default function DifficultyComponent(props) {
    return (
        <div className='option-wrapper'>
            <label htmlFor='difficult-select'>Choose quiz difficult</label>
            <select 
                value={props.difficult} 
                onChange={(e) => props.difficultyHandler(e)} 
                id='difficult-select' 
                name='category' 
                className='option-select'
            >
                <option value='&difficulty=easy'>Easy</option>
                <option value='&difficulty=medium'>Medium</option>
                <option value='&difficulty=hard'>Hard</option>
            </select>
        </div>
    );
}
