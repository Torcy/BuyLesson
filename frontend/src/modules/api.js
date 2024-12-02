// api.js
export const BASE_URL = 'http://localhost:3000'; // 替换为你的后端 URL

// fetch product
export const fetchProducts = () => {
  return fetch(`${BASE_URL}/product`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    });
};

// sub order
export const submitOrder = (orderData) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    });
};