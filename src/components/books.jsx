import React from 'react';

const booksData = [
  {
    id: 1,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
  },
  {
    id: 3,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: 1862,
  },
];

export default function Books() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Catalogue de livres</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {booksData.map(({ id, title, author, year }) => (
          <li key={id} style={bookItemStyle}>
            <h2>{title}</h2>
            <p><strong>Auteur :</strong> {author}</p>
            <p><strong>Année :</strong> {year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const bookItemStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
  backgroundColor: '#fafafa',
};
