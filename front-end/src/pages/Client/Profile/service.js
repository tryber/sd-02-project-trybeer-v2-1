import { patchData, getData } from "../../../services/Request";

const URL = `http://localhost:3001/users/profile`;


const getUser = async () => {
  const { data, error } = await getData(URL);

  return { data, error };
};

const patchUser = async ({ name, email }) => {
  const { error } = await patchData(URL, { name, email });

  return { error };
};

const handleSubmit = async ({ event, body: { name, email }, setMessage }) => {
  event.preventDefault();
  const { error } = await patchUser({ name, email });
  if (error) {
    setMessage({ value: error.message || error.status, type: "ALERT" });
    return;
  }

  setMessage({ value: "User updated", type: "SUCCESS" });
};

export { getUser, handleSubmit };
