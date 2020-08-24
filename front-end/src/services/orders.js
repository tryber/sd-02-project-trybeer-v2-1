import { getData, patchData } from "./Request";

const getOrders = async () => {
  const { data, error } = await getData(`http://localhost:3001/orders`);

  if (error) {
    return { error: error.message, data: [] };
  }

  if (!data) {
    return { data: [] };
  }

  return { data: data.orders };
};

const getOrder = async (id) => {
  const { data, error } = await getData(`http://localhost:3001/orders/${id}`);

  if (error) {
    return { error: error.message, data: { orderDate: '', totalPrice: 0.0, products: [] } };
  }

  if (!data) {
    return { data: { orderDate: '', totalPrice: 0.0, products: [] } };
  }

  return { data: data.order };
};

const updateOrder = async (id) => {
  return await patchData(`http://localhost:3001/orders/${id}`);
};

export { getOrders, getOrder, updateOrder };
