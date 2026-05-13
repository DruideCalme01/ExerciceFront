import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    return (
        <div className="article-card">
            <h3>{article.title}</h3>
            <p className="article-meta">
                Par <strong>{article.author}</strong>
            </p>
            <p className="article-content">{article.content.substring(0, 100)}...</p>
            <Link to={`/article/${article.id}`} className="btn-read">Voir l'article complet</Link>
        </div>
    );
}
export default ArticleCard;