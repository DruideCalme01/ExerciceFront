import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const MyArticles = () => {
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get(`/articles`);
                const myArticles = response.filter(article => article.authorName === user.email);
                setArticles(myArticles);      
            } catch (error) {
                console.error("Erreur lors de la récupération des articles :", error);
            }
        };

        if (user) {
            fetchArticles();
        }
    }, [user]);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            try {
                await api.delete(`/articles/${id}`);
                setArticles(articles.filter(article => article.id !== id));
            } catch (error) {
                console.error("Erreur lors de la suppression de l'article :", error);
            }   
        }
    };

    return (
        <div className="container">
            <h2>Mes Articles</h2>
            <p>Voici la liste de vos articles :</p>

            <div className="articles-grid">
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h2>{article.title}</h2>
                            <p className="article-meta">
                                Par <strong>{article.authorName}</strong>
                            </p>
                            <p className="article-content">
                                {article.content ? article.content.substring(0, 100) : ""}...
                            </p>
                            <div className="btn-group">
                                <Link to={`/edit/${article.id}`} className="btn-action btn-edit">Modifier</Link>
                                <button onClick={() => handleDelete(article.id)} className="btn-action btn-delete">Supprimer</button>           
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-contact">Vous n'avez pas encore d'articles. <Link to="/create-article">Créez-en un maintenant !</Link></p>
                )}        
            </div>
        </div>
    );
}


export default MyArticles;