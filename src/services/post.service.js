import axios from "@/services/axios";

const postService = {
  getPosts(params = {}) {
    return axios.get("/api/posts", { params });
  },

  getPostDetail(slug) {
    return axios.get(`/api/posts/${slug}/`);
  },

  createPost(data) {
    return axios.post("/api/posts/", data);
  },

  updatePost(slug, data) {
    return axios.patch(`/api/posts/${slug}/`, data);
  },

  getCategories() {
    return axios.get("/api/categories/");
  },

  getTags(search = "") {
    return axios.get("/api/tags/", {
      params: { search },
    });
  },
};

export default postService;
