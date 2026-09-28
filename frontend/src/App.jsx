import React, { useState, useEffect } from "react";
import "./App.css";
import PostForm from "./components/PostForm";
import PostFeed from "./components/PostFeed";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Auto-detect backend URL
  const API_URL = 
    process.env.REACT_APP_API_URL || 
    (window.location.hostname === "localhost" 
      ? "http://localhost:3000" 
      : `http://${window.location.hostname}:3000`);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Post Feed</h1>
        <p className="subtitle">Share your thoughts</p>
      </header>

      <main className="container">
        <PostForm apiUrl={API_URL} onPostCreated={handlePostCreated} />
        
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading posts...</div>}
        
        <PostFeed posts={posts} loading={loading} />
      </main>

      <footer className="footer">
        <p>&copy; 2024 Post Feed. Minimal Design.</p>
      </footer>
    </div>
  );
}

export default App;
