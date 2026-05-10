// In-memory store for orders (replace with MongoDB in production)
let orders = [];

module.exports = {
  orders,
  addOrder: (order) => {
    orders.push(order);
    return order;
  },
  getOrderById: (id) => {
    return orders.find(o => o.id === id);
  },
  updateOrderStatus: (id, status) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
    }
    return order;
  }
};
