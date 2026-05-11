import { useState } from "react";

function TodoForm({ AddTask }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Nouvelle tâche : ${text}`);
        AddTask(text);
        setText('');
    };


    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ajouter une tâche"
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default TodoForm;