import { postData } from "../../services/Request";

const URL = `http://localhost:3001/users/login`;

const userRoutes = {
  admin: "/admin/orders",
  client: "/products",
};

const getUserAndSaveToken = async (body) => {
  const { data, error } = await postData({
    endpoint: URL,
    body,
  });
  
  if (error) {
    return { error };
  }
  
  localStorage.setItem("token", data.token);

  return { user: data.user };
};

async function handleSubmit({ event, body, history, setMessage }) {
  event.preventDefault();

  const { user, error } = await getUserAndSaveToken(body);
 
  if (error) {
    setMessage({ value: error.message || error.status, type: "ALERT" });
  } else {
    user && history.push(userRoutes[user.role]);
  }
}

export { handleSubmit };
