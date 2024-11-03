const API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/"
    : "https://sidsecommerceapi.herokuapp.com/api/";
export default API;
