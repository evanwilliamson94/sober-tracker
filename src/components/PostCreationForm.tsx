import { useState } from "react";
import { createPost } from "../Services/PostService"; // Import the service function

// Define the props type
interface PostCreationFormProps {
  userId: string; // Define the type for userId
}

const PostCreationForm: React.FC<PostCreationFormProps> = ({ userId }) => {
  const [content, setContent] = useState<string>(""); // Explicitly typing state as string
  const [imageFile, setImageFile] = useState<File | null>(null); // Explicitly typing state as File or null
  const [loading, setLoading] = useState<boolean>(false); // Explicitly typing state as boolean

  const handleSubmit = async (e: React.FormEvent) => {
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
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostCreationForm;
