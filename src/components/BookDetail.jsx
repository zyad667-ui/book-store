import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem('books') || '[]');
        const foundBook = books.find(b => b.id === parseInt(id));
        if (foundBook) {
            setBook(foundBook);
        } else {
            navigate('/');
        }
    }, [id, navigate]);

    if (!book) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="book-detail-container">
            <div className="book-detail-content">
                <div className="book-detail-cover">
                    <img src={book.coverUrl} alt={book.title} />
                </div>
                <div className="book-detail-info">
                    <h1>{book.title}</h1>
                    <div className="book-meta">
                        <p className="author">par {book.author}</p>
                        <p className="year">Publié en {book.year}</p>
                        <p className="isbn">ISBN: {book.isbn}</p>
                    </div>
                    <div className="book-synopsis">
                        <h2>Synopsis</h2>
                        <p>{book.synopsis}</p>
                    </div>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail; 