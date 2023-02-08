import { useState, useEffect } from "react";

export default function CategoryComponent(props) {
    const [categories, setCategories] = useState([]);

    useEffect(function() {
        fetch('https://opentdb.com/api_category.php')
            .then(res => res.json())
            .then(data => setCategories(data.trivia_categories));
    }, []); 

    function categoriesRender() {
        return categories.map((category, key) => (
                <option key={key} value={`&category=${category.id}`}>{category.name}</option>
            )
        );
    }

    return (
        <div className='category-select-wrapper'>
            <label htmlFor='category-select'>Choose quiz category</label>
            <select 
                value={props.category} 
                onChange={(e) => props.categoryHandler(e)} 
                id='category-select' 
                name='category' 
                className='category-select'
            >
                <option value=''>Any category</option>
                {categoriesRender()}
            </select>
        </div>
    );
}
