import axios, { AxiosError } from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}/posts`;

export async function getPosts() {
  let data = null;
  let error = null;
  try {
    const res = await axios.get(baseURL);
    if (res.status === 200) {
      data = res.data;
    } else if (res.status === 204) {
      data = [];
    }
  } catch (err) {
    if (err.code === AxiosError.ERR_NETWORK) {
      error = err.message;
    } else {
      error = err.response?.data?.message;
    }
  } finally {
    return { data, error };
  }
}

export async function createPost(newPost) {
  let data = null;
  let error = null;
  try {
    const res = await axios.post(baseURL, newPost);
    data = res.data;
  } catch (err) {
    if (err.code === AxiosError.ERR_NETWORK) {
      error = err.message;
    } else {
      error = err.response?.data?.message;
    }
  } finally {
    return { data, error };
  }
}

export async function updatePost(updatedPost) {
  let data = null;
  let error = null;
  try {
    const res = await axios.put(`${baseURL}/${updatedPost.id}`, updatedPost);
    data = res.data;
  } catch (err) {
    if (err.code === AxiosError.ERR_NETWORK) {
      error = err.message;
    } else {
      error = err.response?.data?.message;
    }
  } finally {
    return { data, error };
  }
}

export async function deletePost(deletedPost) {
  let data = null;
  let error = null;
  try {
    const res = await axios.delete(`${baseURL}/${deletedPost.id}`);
    data = res.data;
  } catch (err) {
    if (err.code === AxiosError.ERR_NETWORK) {
      error = err.message;
    } else {
      error = err.response?.data?.message;
    }
  } finally {
    return { data, error };
  }
}

export async function getPost(id) {
  let data = null;
  try {
    const res = await axios.get(`${baseURL}/${id}`);
    data = res.data;
  } catch (err) {
  } finally {
    return data;
  }
}
