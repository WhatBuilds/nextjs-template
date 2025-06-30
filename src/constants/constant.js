export const API_ENDPOINTS = {
  userLogin: `/auth/login`,
  userRegister: `/auth/register`,
  userProfile: `/user/profile`,
  userUpdate: `/user/update`,
  getPosts: `/posts`,
  createPost: `/posts/create`,
  updatePost: `/posts/update`,
  deletePost: `/posts/delete`,
  getComments: `/comments`,
  createComment: `/comments/create`,
  fetchData: `/data/fetch`,
  submitData: `/data/submit`,
};

export const columns = [
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "email", label: "Email" },
];

export const data = [
  { name: "John Doe", age: 28, email: "john.doe@example.com" },
  { name: "Jane Smith", age: 34, email: "jane.smith@example.com" },
  { name: "Alice Johnson", age: 24, email: "alice.johnson@example.com" },
];

export default { API_ENDPOINTS, data, columns };
