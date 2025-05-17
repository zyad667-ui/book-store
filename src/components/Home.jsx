import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        setBooks(storedBooks);
    }, []);

    return (
        <div className="home-container">
            <h1>Bienvenue dans notre bibliothèque</h1>
            <div className="books-grid">
                {books.map(book => (
                    <Link to={`/book/${book.id}`} key={book.id} className="book-card">
                        <div className="book-cover">
                            <img src={book.coverUrl} alt={book.title} />
                        </div>
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p className="author">par {book.author}</p>
                            <p className="year">{book.year}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home; 