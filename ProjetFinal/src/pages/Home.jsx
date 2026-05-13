import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ArticleCard from "../components/ArticleCard";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await api.get('/articles');
                setArticles(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des articles :', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="home-container">
            <h2>Derniers Articles</h2>
            <div className="articles-grid">
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
export default Home;