import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Header from "./Header";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import PostDetails from "./PostDetails";
import ErrorGeneral from "./ErrorGeneral";
import Footer from "./Footer";
import ErrorSpecific from "./ErrorSpecific";

function App() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  const baseURL = `${import.meta.env.VITE_API_URL}/posts`;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(baseURL);
        if (res.status === 200) {
          setPosts(res.data);
        } else if (res.status === 204) {
          setPosts([]);
        }
        setError(null);
      } catch (err) {
        if (err.code === AxiosError.ERR_NETWORK) {
          setError(err.message);
        } else {
          setError(err.response?.data?.message);
        }
      }
    };
    getPosts();
  }, []);

  const createPost = async (newPost) => {
    try {
      const res = await axios.post(baseURL, newPost);
      setPosts((prevPosts) => [...prevPosts, res.data]);
      setError(null);
    } catch (err) {
      if (err.code === AxiosError.ERR_NETWORK) {
        setError(err.message);
      } else {
        setError(err.response?.data?.message);
      }
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      const res = await axios.put(`${baseURL}/${updatedPost._id}`, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === res.data._id ? res.data : post))
      );
      setError(null);
    } catch (err) {
      if (err.code === AxiosError.ERR_NETWORK) {
        setError(err.message);
      } else {
        setError(err.response?.data?.message);
      }
    }
  };

  const deletePost = async (deletedPost) => {
    try {
      const res = await axios.delete(`${baseURL}/${deletedPost._id}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== res.data._id)
      );
      setError(null);
    } catch (err) {
      if (err.code === AxiosError.ERR_NETWORK) {
        setError(err.message);
      } else {
        setError(err.response?.data?.message);
      }
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
                    onDelete={deletePost}
                    onUpdate={updatePost}
                  />
                }
              />
              <Route
                path="create"
                element={<CreatePost onCreate={createPost} />}
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
