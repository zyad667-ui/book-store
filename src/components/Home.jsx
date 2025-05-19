import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Sample book categories for display
const categories = ['Fiction', 'Fantasy', 'Science', 'Histoire', 'Romance', 'Biographie'];

// Function to generate random ratings
const getRandomRating = () => {
    return (Math.floor(Math.random() * 10) + 35) / 10; // Between 3.5 and 5.0
};

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Add a small delay to simulate loading from a server
        const timer = setTimeout(() => {
            let storedBooks = JSON.parse(localStorage.getItem('books') || '[]');

            // Enhance books with additional data if not present
            storedBooks = storedBooks.map(book => ({
                ...book,
                category: book.category || categories[Math.floor(Math.random() * categories.length)],
                rating: book.rating || getRandomRating()
            }));

            setBooks(storedBooks);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading && books.length === 0) {
            const sampleBooks = [
                {
                    id: 1,
                    title: "Le Petit Prince",
                    author: "Antoine de Saint-Exupéry",
                    year: "1943",
                    category: "Fiction",
                    rating: 4.8,
                    synopsis: "Un aviateur, échoué dans le désert du Sahara, rencontre un petit prince venu d'une autre planète. Ce conte poétique et philosophique aborde les thèmes de l'amitié, de l'amour et du sens de la vie.",
                    coverUrl: "https://i5.walmartimages.com/seo/Le-Petit-Prince-French-Edition-Pre-Owned-Hardcover-0152164154-9780152164157-Antoine-de-Saint-Exupry_0028025a-d2fd-4a9b-8054-fdd89799de36.b41821fd7ee7d75ac4e0f3e298445792.jpeg",
                    isbn: "978-2070612758"
                },
                {
                    id: 2,
                    title: "Notre-Dame de Paris",
                    author: "Victor Hugo",
                    year: "1831",
                    category: "Classique",
                    rating: 4.6,
                    synopsis: "Dans le Paris médiéval du XVe siècle, Quasimodo, le bossu de Notre-Dame, s'éprend de la belle bohémienne Esmeralda. Une histoire tragique d'amour impossible.",
                    coverUrl: "https://librairiedefrance.ma/wp-content/webp-express/webp-images/uploads/2022/03/9782253009689-475x500-1.jpg.webp",
                    isbn: "978-2253096337"
                },
                {
                    id: 3,
                    title: "Les Misérables",
                    author: "Victor Hugo",
                    year: "1862",
                    category: "Classique",
                    rating: 4.9,
                    synopsis: "Une fresque sociale et historique du XIXe siècle français, à travers le destin de Jean Valjean, ancien forçat en quête de rédemption.",
                    coverUrl: "https://images.epagine.fr/063/9782075128063_1_75.jpg",
                    isbn: "978-2253096344"
                },
                {
                    id: 4,
                    title: "L'Étranger",
                    author: "Albert Camus",
                    year: "1942",
                    category: "Philosophie",
                    rating: 4.7,
                    synopsis: "Meursault, un Algérois, reçoit un télégramme annonçant la mort de sa mère. Il se rend à l'enterrement, mais n'exprime aucune émotion, ce qui sera utilisé contre lui lorsqu'il sera jugé pour un meurtre qu'il a commis.",
                    coverUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/L%27%C3%89tranger_%28Albert_Camus%29.jpg/960px-L%27%C3%89tranger_%28Albert_Camus%29.jpg",
                    isbn: "978-2070360024"
                }
            ];

            localStorage.setItem('books', JSON.stringify(sampleBooks));
            setBooks(sampleBooks);
        }
    }, [loading, books.length]);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                Chargement des livres...
            </div>
        );
    }

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Découvrez notre collection de livres</h1>
                    <p className="hero-subtitle">
                        Explorez notre vaste bibliothèque numérique et trouvez votre prochaine lecture préférée.
                        Des classiques intemporels aux dernières sorties, il y en a pour tous les goûts.
                    </p>
                    <Link to="#books" className="hero-btn">Parcourir les livres</Link>
                </div>
                <div className="hero-image">
                    <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg" alt="Books illustration" />
                </div>
            </section>

            <section id="books">
                <div className="section-header">
                    <h2 className="section-title">Notre Collection</h2>
                    <p className="section-subtitle">
                        Découvrez notre sélection soigneusement curée de livres pour tous les lecteurs
                    </p>
                </div>

                <div className="books-grid">
                    {books.map(book => (
                        <Link to={`/book/${book.id}`} key={book.id} className="book-card">
                            <div className="book-cover">
                                <img src={book.coverUrl} alt={book.title} />
                                <div className="book-category">{book.category}</div>
                            </div>
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p className="author">par {book.author}</p>
                                <div className="book-rating">
                                    {"★".repeat(Math.floor(book.rating))}
                                    {book.rating % 1 >= 0.5 ? "½" : ""}
                                    {" "}
                                    {book.rating.toFixed(1)}
                                </div>
                                <p className="year">{book.year}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {books.length > 8 && (
                    <div className="view-more">
                        <a href="#" className="view-more-btn">Voir plus de livres</a>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;