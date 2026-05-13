import { useState } from "react";

const TodoForm = ({ AddTask }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Nouvelle tâche : ${text}`);
        if (text.trim().length === 0) return;
        AddTask(text);
        setText('');
    };


    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input  
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ajouter une tâche"
                className="input-field"
            />
            <button type="submit" className="btn-submit">Ajouter</button>
        </form>
    );
}

export default TodoForm;