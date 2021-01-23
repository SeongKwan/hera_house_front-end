import axios from "axios";
import { computed } from "mobx";
import authStore from "../stores/authStore";
import errorStore from "../stores/errorStore";
import loginStore from "../stores/loginStore";

const API_ROOT = `http://15.165.30.197:5001/`;

class Agent {
  constructor(baseURL = null) {
    this.axios = axios.create({ baseURL });
  }

  /**
   * 추후 자동으로 basic end points를 생성하는 로직이 필요하다고 여겨질 때 참고
   * https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86
   */
  /* APIs */

  /**
   *
   * Login & SignUp
   */

  signup(userInfo) {
    return this.axios
      .post("/auth/signup", {
        email: userInfo.email,
        password: userInfo.password,
        name: userInfo.name,
      })
      .catch(this._handleError);
  }

  login({ email, password }) {
    return this.axios
      .post(
        "/auth/login",
        { email, password },
        {
          baseURL: API_ROOT,
          headers: {},
        }
      )
      .catch(this._handleError);
  }

  /**
   *
   * Category
   */

  loadCategories() {
    return this.get(`/categories`);
  }

  loadSubCategories() {
    return this.get(`/subcategories`);
  }

  createCategory({ name, description }) {
    return this.post("/categories", { name, description });
  }
  createSubCategory({ name, description, mainCategory }) {
    return this.post("/subcategories", { name, description, mainCategory });
  }

  updateCategoryOrder({ categories }) {
    return this.patch("/categories/order", { categories });
  }

  deleteCategory(categoryId) {
    return this.delete(`/categories/${categoryId}`);
  }

  /**
   *
   * Post
   */

  uploadImage(formData) {
    let { token } = authStore;

    return this.axios
      .post("/api/v1/posts/upload/image", formData, {
        baseURL: API_ROOT,
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .catch(this._handleError);
  }

  loadPosts() {
    return this.get(`/posts`);
  }

  loadFilteredPosts({ type, category, subCategory }) {
    console.log("req load filtered posts");
    return this.post(`/posts/filteredPosts`, { type, category, subCategory });
  }

  loadPost(postId) {
    return this.get(`/posts/${postId}`);
  }

  createPost({
    title,
    category,
    content,
    type,
    subCategory,
    isPublished,
    thumbnail,
  }) {
    console.log("req create post");
    return this.post(`/posts`, {
      title,
      type,
      category,
      subCategory,
      content,
      isPublished,
      thumbnail,
    });
  }

  updatePost(
    postId,
    {
      title,
      content,
      type,
      category,
      subCategory,
      createdAt,
      updatedAt,
      isPublished,
      thumbnail,
    }
  ) {
    return this.patch(`/posts/${postId}`, {
      title,
      content,
      type,
      category,
      subCategory,
      createdAt,
      updatedAt,
      isPublished,
      thumbnail,
    });
  }

  deletePost(postId) {
    return this.delete(`/posts/${postId}`);
  }

  /**
   *
   * User
   */

  loadUsers() {
    return this.get(`/users`);
  }

  refreshToken() {
    let { refreshToken, user_id } = authStore;
    return this.axios
      .post(
        "/auth/token",
        { refreshToken, user_id },
        {
          baseURL: API_ROOT,
          headers: {},
        }
      )
      .catch(this._handleError);
  }

  validateToken() {
    let { refreshToken, user_id } = authStore;
    let { isLoggedIn } = loginStore;
    if (isLoggedIn) {
      return this.axios
        .post(
          "/auth/token/check",
          { refreshToken, user_id },
          {
            baseURL: API_ROOT,
            headers: {},
          }
        )
        .then((res) => {
          if (!res.data) {
            authStore.setExpiredToken(true);

            setTimeout(() => {
              alert("로그인 시간이 만료되었습니다. 다시 로그인하여 주세요.");
            }, 100);
            setTimeout(() => {
              authStore.logout("expiredRefreshToken");
            }, 150);
            setTimeout(() => {
              window.location.href = "http://localhost:3000/admin/login/";
            }, 200);
            // this.refreshToken();
          } else return res.data;
        })
        .catch(this._handleError);
    }
  }

  /* Base REST API method */
  get(url) {
    this.validateToken();
    return this.axios
      .get(`/api/v1${url}`, this.requestConfig)
      .catch(this._handleError);
  }
  put(url, body) {
    this.validateToken();
    return this.axios
      .put(`/api/v1${url}`, body, this.requestConfig)
      .catch(this._handleError);
  }
  patch(url, body) {
    this.validateToken();
    return this.axios
      .patch(`/api/v1${url}`, body, this.requestConfig)
      .catch(this._handleError);
  }
  post(url, body) {
    console.log("post !!!");
    this.validateToken();
    return this.axios
      .post(`/api/v1${url}`, body, this.requestConfig)
      .catch(this._handleError);
  }
  delete(url) {
    this.validateToken();
    return this.axios
      .delete(`/api/v1${url}`, this.requestConfig)
      .catch(this._handleError);
  }

  @computed get requestConfig() {
    let requestConfig = {
      baseURL: API_ROOT,
      headers: {},
    };

    let { token, email, user_id } = authStore;
    requestConfig.headers["user-type"] = "ADMIN";

    if (token) {
      requestConfig.headers["Authorization"] = `bearer ${token}`;
    }
    if (email) {
      requestConfig.headers["email"] = `${email}`;
    }
    if (user_id) {
      requestConfig.headers["user_id"] = `${user_id}`;
    }

    return requestConfig;
  }

  _handleError(error) {
    let type;
    const { inLoggedIn } = loginStore;
    if (error.response !== undefined) {
      type = error.response.data.type;
      if (!window.navigator.onLine) {
        alert("오프라인 상태입니다");
      } else {
        errorStore.setErrorToken(true);
        if (Boolean(error.response.data.type) === true) {
          if (type === "expired" || type === "refresh" || type === "error") {
            return errorStore.authError(error.response.data);
          } else if (type === "guest") {
            if (inLoggedIn) {
              return window.location.reload(true);
            }
            return (window.location.href = "http://hr-archive.com/");
          }
          return window.location.reload(true);
        }
      }
    }
    throw error.response;
  }
}

const agent = new Agent(API_ROOT);

export default agent;
