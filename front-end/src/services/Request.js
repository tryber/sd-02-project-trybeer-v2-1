import axios from "axios";

const headers = () => ({ Authorization: localStorage.getItem("token") });

const handleError = ({ error = {} }) => {
  if (error.response) {
    return { error: { ...error.response.data.error, status: error.message } };
  }
  if (error.request || !error.message) {
    return {
      error: { message: "Server internal error", status: error.message },
    };
  }
  return { error: { status: error.message } };
};

const patchData = async (endpoint, params) =>
  axios
    .patch(endpoint, { ...params }, { headers: headers() })
    .catch((error) => handleError({ error }));

const getData = async (endpoint) =>
  axios
    .get(endpoint, { headers: headers() })
    .catch((error) => handleError({ error }));

const validToken = async (endpoint) =>
  axios.get(endpoint, {
    headers: headers(),
  });

const postData = async ({ endpoint, body }) =>
  axios.post(endpoint, body).catch((error) => handleError({ error }));

const postSale = async (endpoint, body) =>
  axios.post(endpoint, { ...body }, { headers: headers() }).catch((error) => handleError({ error }));

const isAdmin = async (endpoint) =>
  axios.get(endpoint, {
    headers: headers(),
  });


export { getData, patchData, postData, validToken, isAdmin, postSale };
