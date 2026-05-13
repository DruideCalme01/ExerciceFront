import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";


const CreateArticle = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Article créé :", { title, content });
        navigate("/");
    };

    return (
        <div className="container">
            <h1>Créer un Nouvel Article</h1>
            <ArticleForm onSubmit={handleSubmit} buttonlabel="Créer l'article" />
        </div>
    );
};

export default CreateArticle;