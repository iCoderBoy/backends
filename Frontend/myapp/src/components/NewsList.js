// src/NewsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewsList() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/news')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the news!', error);
            });
    }, []);

    return (
        <div>
            <h1>News Articles</h1>
            <ul>
                {news.map(article => (
                    <li key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                        <p>By: {article.author}</p>
                        {article.image_path && <img src={`http://localhost:3001${article.image_path}`} alt={article.title} />}
                        <Link to={`/update/${article.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NewsList;
