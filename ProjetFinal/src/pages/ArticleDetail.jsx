import {Link, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../lib/api';



const ArticleDetail = () => {   
    const { id } = useParams();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await api.get(`/articles/${id}`);
                setArticle(data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'article :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <div className='container'>Chargement de l'article...</div>;
    }

    if (!article) {
        return <div className='container'>Article non trouvé.</div>;
    }

    return (
        <div className='container'>
            <Link to="/" className='btn-back'>← Retour à la liste des articles</Link>

            <div className='article-full'>
                <h1>{article.title}</h1>
                <p className='meta'>Publié par {article.authorName} le {article.date}</p>
                <br />
                <div className='content'>
                    <p>Article : <br />{article.content}</p>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;