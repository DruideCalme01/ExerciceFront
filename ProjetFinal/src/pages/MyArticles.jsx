import { Link } from "react-router-dom";

const MyArticles = () => {
    const articles = [
        { id: 1, titre: "Mon Premier Article", date: "2024-06-01" },
        { id: 2, titre: "Un Autre Article", date: "2024-06-05" },
    ];

    return (
        <div className="container">
            <h2>Mes Articles</h2>
            <p>Voici la liste de vos articles :</p>

            <div className="my-article-list">
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article.id} className="my-article-item">
                            <span>{article.titre}</span>
                            <div className="btn-group">
                                <Link to={`/edit/${article.id}`} className="btn-action btn-edit">Modifier</Link>
                                <button className="btn-action btn-delete">Supprimer</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-contact">Vous n'avez pas encore d'articles. <Link to="/create">Créez-en un maintenant !</Link></p>
                )}        
            </div>
        </div>
    );
}

export default MyArticles;