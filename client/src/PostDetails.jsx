import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ErrorGeneral from "./ErrorGeneral";
import Comments from "./Comments";

function PostDetails({ posts, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState(post?.title || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [body, setBody] = useState(post?.body || "");

  const baseURL = `${import.meta.env.VITE_API_URL}/posts`;

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${baseURL}/${id}`);
        setPost(res.data);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setBody(res.data.body);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [posts]);

  if (!post && !isLoading) {
    return <ErrorGeneral />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && body) {
      const updatedPost = { ...post, title: title, author: author, body: body };
      onUpdate(updatedPost);
      setIsUpdating(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTitle(post.title);
    setAuthor(post.author);
    setBody(post.body);
    setIsUpdating(false);
  };

  const handleDelete = () => {
    onDelete(post);
    navigate("/", { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl p-4 text-left">
      {isLoading && (
        <h2 className="pt-4 text-center font-mono text-4xl font-semibold text-green-900">
          Loading...
        </h2>
      )}
      {!isLoading && isUpdating && (
        <div>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <input
              className="mb-4 block w-full rounded-sm border border-slate-400 bg-green-50 p-1 text-2xl font-medium"
              type="text"
              required
              maxLength="150"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="mb-4 block w-full rounded-sm border border-slate-400 bg-green-50 p-1 text-lg font-normal"
              type="text"
              required
              maxLength="50"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              className="mb-4 block h-80 w-full rounded-sm border border-slate-400 bg-green-50 p-1"
              required
              value={body}
              placeholder="Blog Post"
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <div className="mx-auto mt-4 flex justify-center space-x-20">
              <button
                className="w-32 rounded-2xl bg-green-800 p-3 text-white shadow transition-all duration-100 hover:ring hover:ring-emerald-600 active:bg-green-700"
                type="reset"
              >
                &#8592; Go Back
              </button>
              <button
                className="w-32 rounded-2xl bg-green-800 p-3 text-white shadow transition-all duration-100 hover:ring hover:ring-emerald-600 active:bg-green-700"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
      {!isLoading && !isUpdating && (
        <>
          <div className="mx-2 flex items-start justify-between">
            <div className="mb-3 min-w-[35%] flex-1 p-1">
              <h2 className="truncate pb-1 font-tahoma text-2xl font-medium text-green-700 md:whitespace-normal md:break-words">
                {title}
              </h2>
              <h3 className="truncate text-lg font-normal text-slate-700 md:whitespace-normal md:break-words">
                Written by {author}
              </h3>
              <h3 className="text-lg font-normal text-slate-700">
                Posted {format(post.date, "MMM dd, yyyy, HH:mm")}
              </h3>
            </div>
            <div className="my-auto ml-1 space-x-3">
              <button
                className="w-28 rounded-2xl bg-green-800 p-3 text-white shadow transition-all duration-100 hover:ring-2 hover:ring-emerald-600 active:bg-green-700"
                onClick={() => setIsUpdating(true)}
              >
                Edit Post
              </button>
              <button
                className="w-28 rounded-2xl bg-red-800 p-3 text-white shadow transition-all duration-100 hover:ring-2 hover:ring-red-900 active:bg-red-700"
                onClick={handleDelete}
              >
                Delete Post
              </button>
            </div>
          </div>
          <article className="whitespace-pre-line break-words font-verdana text-slate-950">
            {body}
          </article>
          <hr className="mx-auto my-8 w-3/4" />
          <Comments post={post} onUpdate={onUpdate} />
        </>
      )}
    </div>
  );
}

export default PostDetails;
