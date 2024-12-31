import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ onCreate }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && body) {
      onCreate({
        title: title,
        author: author,
        date: Date.now(),
        body: body,
        comments: []
      });
      setTitle("");
      setAuthor("");
      setBody("");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h2 className="p-3 text-center text-2xl font-semibold text-green-800 underline">
        Create a new post:
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block px-1 pt-1">Title:</label>
        <input
          className="mb-2 block w-full rounded-sm border border-slate-400 bg-green-50 p-1"
          type="text"
          required
          maxLength="150"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block px-1 pt-1">Author:</label>
        <input
          className="mb-2 block w-full rounded-sm border border-slate-400 bg-green-50 p-1"
          type="text"
          required
          maxLength="50"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label className="block px-1 pt-1">Blog Post:</label>
        <textarea
          className="mb-2 block h-40 w-full rounded-sm border border-slate-400 bg-green-50 p-1"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button
          className="mx-auto mt-4 block rounded-2xl bg-green-800 p-3 text-white shadow transition-all duration-100 hover:ring-2 hover:ring-emerald-600 active:bg-green-700"
          type="submit"
        >
          Post to Blog
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
