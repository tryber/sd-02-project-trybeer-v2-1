import { getData } from "../../../services/Request";

const URL = `http://localhost:3001/products`;

const calculeTotal = () => {
  const products = JSON.parse(localStorage.getItem("products") || "{}");

  return Object.keys(products)
    .reduce((acc, id) => acc + products[id].price * products[id].count, 0)
    .toFixed(2);
};

const getProducts = async () => {
  const { data, error } = await getData(URL);

  if (error) {
    return { error: error.message || error.status, data: [] };
  }

  if (!data) {
    return { error: "", data: [] };
  }

  return { error: "", data: data.products };
};

export { calculeTotal, getProducts };
