import { useState } from "react";
import { createPost } from "../services/PostService"; // You can move the createPost function to a service file if preferred

const PostCreationForm = ({ userId }) => {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Call the createPost function to upload post data to Firestore
    await createPost(userId, content, imageFile);

    // Reset the form after submission
    setContent("");
    setImageFile(null);
    setLoading(false);
  };

  return (
    <div className="post-creation-form">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your post..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostCreationForm;
