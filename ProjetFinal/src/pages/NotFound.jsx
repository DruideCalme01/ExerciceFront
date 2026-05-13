import {Link} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='container'>
            <h1>Page Non Trouvée</h1>
            <p>
                La page que vous recherchez n'existe pas. <br></br>
                Il semble que vous vous soyez perdu dans le blog.
            </p> <br />
            <Link to="/" className='btn-submit'>Retour à l'accueil</Link>
        </div>
    );
}

export default NotFound;