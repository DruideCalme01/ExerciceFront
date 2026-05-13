import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Article créé :", { title, content });
        navigate("/");
    };

    return (
        <div className="container">
            <h1>Créer un Nouvel Article</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div>
                    <label htmlFor="title">Titre de l'article</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div>
                    <label htmlFor="content">Contenu de l'article</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <button type="submit" className="btn-submit">
                    Créer l'article
                </button>
            </form>
        </div>
    );
};

export default CreateArticle;