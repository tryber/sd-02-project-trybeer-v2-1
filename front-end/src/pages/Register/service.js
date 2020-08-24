import { postData } from "../../services/Request";

const URL = `http://localhost:3001/users/register`;

const userRoutes = {
  admin: "admin/orders",
  client: "/products",
};

const handleConfirm = ({ value, password, callback }) => {
  const validFormat = value.match(/^.*(.*\d){6,}/);
  const matchPassword = value === password;

  if (validFormat && matchPassword) {
    callback({ value, error: null });
  } else {
    callback({
      value,
      error: "Don't match password and/or invalid format",
    });
  }
};

const postUser = async (body) => {
  const { error, data } = await postData({ endpoint: URL, body });

  if (data && data.token) localStorage.setItem("token", data.token);

  return { error };
};

async function handleSubmit({ event, body, history, setMessage }) {
  event.preventDefault();

  const { error } = await postUser(body);

  if (error) {
    setMessage({ value: error.message || error.status, type: "ALERT" });

    return;
  }

  setMessage({ value: "User created with success", type: "SUCCESS" });

  history.push(userRoutes[body.role]);
}

export { handleConfirm, handleSubmit };
