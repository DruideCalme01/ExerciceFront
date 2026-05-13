import { useNavigate } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import { api } from "../lib/api";

const CreateArticle = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        try {
            await api.post('/articles', data);
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la création de l'article :", error);
        }
    };

    return (
        <div className="container">
            <h1>Créer un Nouvel Article</h1>
            <ArticleForm onSubmit={handleSubmit} buttonlabel="Créer l'article" />
        </div>
    );
};

export default CreateArticle;