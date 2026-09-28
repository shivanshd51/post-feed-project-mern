import React, { useState } from "react";
import "./PostForm.css";

function PostForm({ apiUrl, onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile || !caption.trim()) {
      setError("Please add an image and caption");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("caption", caption);

      const response = await fetch(`${apiUrl}/create-post`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();

      // Reset form
      setCaption("");
      setSelectedFile(null);
      setPreview(null);
      setSuccess(true);

      // Call callback
      if (onPostCreated && data.post) {
        onPostCreated(data.post);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Create Post</h2>

        {error && <div className="form-error">{error}</div>}
        {success && (
          <div className="form-success">Post created successfully!</div>
        )}

        <div className="form-group">
          <label htmlFor="image-input" className="file-label">
            <div className="file-input-wrapper">
              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-image" />
                  <button
                    type="button"
                    className="change-btn"
                    onClick={() => {
                      document.getElementById("image-input").click();
                    }}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="file-input-placeholder">
                  <span className="icon">+</span>
                  <span className="text">Click to select image</span>
                </div>
              )}
            </div>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-input"
            />
          </label>
        </div>

        <div className="form-group">
          <textarea
            className="caption-input"
            placeholder="Write your caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={500}
            rows={4}
          />
          <div className="char-count">
            {caption.length}/500
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading || !selectedFile || !caption.trim()}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
