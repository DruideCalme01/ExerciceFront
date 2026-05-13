import {Link, useParams} from 'react-router-dom';


const ArticleDetail = () => {   
    const { id } = useParams();

    const article = {
        titre: "Titre de l'article",
        auteur: "Auteur de l'article",
        contenu: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };

    return (
        <div className='container'>
            <Link to="/" className='btn-back'>← Retour à la liste des articles</Link>

            <div className='article-full'>
                <h1>{article.titre}</h1>
                <p className='meta'>Publié par {article.auteur}</p>
                <div className='content'>
                    <p>{article.contenu}</p>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;