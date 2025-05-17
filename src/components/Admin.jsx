import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        year: '',
        synopsis: '',
        coverUrl: '',
        isbn: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const books = JSON.parse(localStorage.getItem('books') || '[]');
        books.push({
            ...bookData,
            id: Date.now()
        });
        localStorage.setItem('books', JSON.stringify(books));
        alert('Livre ajouté avec succès !');
        setBookData({
            title: '',
            author: '',
            year: '',
            synopsis: '',
            coverUrl: '',
            isbn: ''
        });
    };

    return (
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
    );
};

export default Admin; 