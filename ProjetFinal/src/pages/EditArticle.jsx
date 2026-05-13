import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ArticleForm from '../components/ArticleForm';

const EditArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${id}`);
                setArticle(response);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article :", error);
            }
        };

        fetchArticle();
    }, [id,navigate]);


    const handleUpdate = async (updatedData) => {
        try {
            await api.put(`/articles/${id}`, updatedData);
            
            console.log("Article mis à jour avec succès !");
            navigate(`/my-articles`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
            alert("Impossible de modifier l'article.");
        }
    };

    

    return (
        <div className="container">
            <h1>Éditer l'Article</h1>
            <ArticleForm
                initialData={article}
                onSubmit={handleUpdate}
                buttonlabel="Mettre à jour l'article"
            />
        </div>
    );
};

export default EditArticle;