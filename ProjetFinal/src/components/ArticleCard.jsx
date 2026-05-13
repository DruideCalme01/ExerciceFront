import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    return (
        <div className="article-card">
            <h2>{article.title}</h2>
            <p className="article-meta">
                Par <strong>{article.authorName}</strong>
            </p>
            <p className="article-content">
                {article.content ? article.content.substring(0, 100) : ""}...
            </p>
            <Link to={`/article/${article.id}`} className="btn-read">Voir l'article complet</Link>
        </div>
    );
}
export default ArticleCard;