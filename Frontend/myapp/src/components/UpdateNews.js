// src/UpdateNews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

function UpdateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const { id } = useParams(); // Use useParams to get route parameters

    useEffect(() => {
        axios.get(`http://localhost:3001/api/news/${id}`)
            .then(response => {
                const { title, content, author, image_path } = response.data;
                setTitle(title);
                setContent(content);
                setAuthor(author);
                setImage(image_path);
            })
            .catch(error => {
                console.error('There was an error fetching the news!', error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('author', author);
        if (image) {
            formData.append('image', image);
        }

        axios.put(`http://localhost:3001/api/news/${id}`, formData)
            .then(response => {
                console.log('News updated successfully!', response);
            })
            .catch(error => {
                console.error('There was an error updating the news!', error);
            });
    };

    return (
        <div>
            <h2>Update News</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateNews;
