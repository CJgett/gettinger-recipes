import { useState } from 'react';
import Tags from '../../constants/Tags';

export default function TagSelection({setTags}) {

    const [currentTags, setCurrentTags] = useState(setTags);

    function isSetTag(tag) {
        return currentTags.includes(tag);
    }

    function handleTagChange(event) {
        const tag = event.target.value;
        if (event.target.checked) {
            setCurrentTags([...currentTags, tag]);
        } else {
            setCurrentTags(currentTags.filter((t) => t !== tag));
        }
    }

    return (
        <fieldset className="tag-selection">
            <legend>
                Please select the appropriate tag(s)
            </legend>
            {Tags.map((tag, index) => (
                <div key={index}>
                <input type="checkbox" id={tag} name="tags" value={tag} checked={isSetTag(tag)} onChange={handleTagChange}/>
                <label htmlFor={tag}>{tag}</label>
                </div>
            ))}
        </fieldset>
    );
}