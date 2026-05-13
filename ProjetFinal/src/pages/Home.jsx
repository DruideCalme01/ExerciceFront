import ArticleCard from "../components/ArticleCard";

const Home = () => {
    const articles = [
        { id: 1, title: "Premier Article", author: "Alice", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 2, title: "Deuxième Article", author: "Bob", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
        { id: 3, title: "Troisième Article", author: "Charlie", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }
    ];

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