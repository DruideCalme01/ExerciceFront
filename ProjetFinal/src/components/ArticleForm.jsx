import { useState, useEffect } from "react";

const ArticleForm = ({ onSubmit, initialData, buttonlabel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
    };

    return (
  <form onSubmit={handleSubmit} className="contact-form">
    <div className="form-group">
      <label>Titre de l'article</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Titre de l'article..." 
      />
    </div>
    <div className="form-group">
      <label>Contenu de l'article</label>
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Contenu de l'article..." 
      />
    </div>
    <button type="submit" className="btn-submit">{buttonlabel}</button>
  </form>
);
}

export default ArticleForm;