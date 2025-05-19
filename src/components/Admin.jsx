import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        year: '',
        synopsis: '',
        coverUrl: '',
        isbn: '',
        category: ''
    });
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté et est un admin
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user || user.role !== 'admin') {
            navigate('/login-admin');
            return;
        }
        setCurrentUser(user);

        // Charger les livres
        const storedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        setBooks(storedBooks);
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedBooks = [...books];
        updatedBooks.push({
            ...bookData,
            id: Date.now(),
            rating: (Math.floor(Math.random() * 10) + 35) / 10 // Rating aléatoire entre 3.5 et 5.0
        });
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        alert('Livre ajouté avec succès !');
        setBookData({
            title: '',
            author: '',
            year: '',
            synopsis: '',
            coverUrl: '',
            isbn: '',
            category: ''
        });
    };

    const handleDeleteBook = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
            const updatedBooks = books.filter(book => book.id !== id);
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            setBooks(updatedBooks);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Interface d'administration</h1>
                <p>Bienvenue, {currentUser?.firstName} {currentUser?.lastName}</p>
            </div>

            <div className="admin-content">
                <div className="admin-container">
                    <form onSubmit={handleSubmit} className="admin-form">
                        <h2>Ajouter un nouveau livre</h2>

                        <div className="form-group">
                            <input
                                type="text"
                                name="title"
                                placeholder="Titre du livre"
                                value={bookData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="author"
                                placeholder="Auteur"
                                value={bookData.author}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                name="year"
                                placeholder="Année de publication"
                                value={bookData.year}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="category"
                                placeholder="Catégorie (ex: Fiction, Classique, etc.)"
                                value={bookData.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="synopsis"
                                placeholder="Synopsis"
                                value={bookData.synopsis}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="url"
                                name="coverUrl"
                                placeholder="URL de la couverture"
                                value={bookData.coverUrl}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="isbn"
                                placeholder="ISBN"
                                value={bookData.isbn}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">Ajouter le livre</button>
                    </form>
                </div>

                <div className="admin-books-list">
                    <h2>Gestion des livres</h2>
                    {books.length === 0 ? (
                        <p>Aucun livre trouvé.</p>
                    ) : (
                        <div className="books-table-container">
                            <table className="books-table">
                                <thead>
                                    <tr>
                                        <th>Couverture</th>
                                        <th>Titre</th>
                                        <th>Auteur</th>
                                        <th>Année</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map(book => (
                                        <tr key={book.id}>
                                            <td>
                                                <img
                                                    src={book.coverUrl}
                                                    alt={book.title}
                                                    className="book-thumbnail"
                                                />
                                            </td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.year}</td>
                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteBook(book.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;