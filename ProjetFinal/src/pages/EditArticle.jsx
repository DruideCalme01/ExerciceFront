import { useParams, useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const existingArticle = {
        id,
        title: "Titre de l'article à éditer",
        content: "Contenu de l'article à éditer",
    };

    const handleUpdate = (updatedData) => {
        console.log("Article mis à jour :", { id, ...updatedData });
        navigate(`/my-articles`);
    };

    return (
        <div className="container">
            <h1>Éditer l'Article</h1>
            <ArticleForm
                initialData={existingArticle}
                onSubmit={handleUpdate}
                buttonlabel="Mettre à jour l'article"
            />
        </div>
    );
};

export default EditArticle;