import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import ErrorGeneral from "./errors/ErrorGeneral";
import ErrorSpecific from "./errors/ErrorSpecific";
import { getPosts, createPost, updatePost, deletePost } from "../api/postApi";

function App() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleGetPosts = async () => {
      const { data, error } = await getPosts();
      if (error) {
        setError(error);
      } else {
        setPosts(data);
      }
    };
    handleGetPosts();
  }, []);

  const handleCreatePost = async (newPost) => {
    const { data, error } = await createPost(newPost);
    if (error) {
      setError(error);
    } else {
      setPosts((prevPosts) => [...prevPosts, data]);
    }
  };

  const handleUpdatePost = async (updatedPost) => {
    const { data, error } = await updatePost(updatedPost);
    if (error) {
      setError(error);
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === data._id ? data : post))
      );
    }
  };

  const handleDeletePost = async (deletedPost) => {
    const { data, error } = await deletePost(deletedPost);
    if (error) {
      setError(error);
    } else {
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== data._id)
      );
    }
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          {error ? (
            <ErrorSpecific message={error} />
          ) : (
            <Routes>
              <Route path="/" exact element={<PostList posts={posts} />} />
              <Route
                path=":id"
                element={
                  <PostDetails
                    posts={posts}
                    onDelete={handleDeletePost}
                    onUpdate={handleUpdatePost}
                  />
                }
              />
              <Route
                path="create"
                element={<CreatePost onCreate={handleCreatePost} />}
              />
              <Route path="*" element={<ErrorGeneral />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
