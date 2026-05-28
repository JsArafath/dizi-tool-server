const express = require('express');
const router = express.Router();
const { addOrder, getOrderById, updateOrderStatus } = require('../data/orders');
const crypto = require('crypto');

// Simulate payment initialization (since we don't have real API keys yet)
router.post('/initiate', (req, res) => {
  const { items, totalAmount, customerInfo, paymentMethod } = req.body;
  
  // 1. Create Order
  const orderId = 'ORD_' + crypto.randomBytes(6).toString('hex').toUpperCase();
  const newOrder = {
    id: orderId,
    items,
    totalAmount,
    customerInfo,
    paymentMethod,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  
  addOrder(newOrder);

  // 2. Generate Payment URL (Simulation)
  // In a real scenario, you'd call Aamarpay/SSLCommerz API here and get a redirect URL
  // Here we just mock the redirect URL to our own server's success endpoint to simulate successful payment
  
  const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',')[0].trim() : 'http://localhost:5173';
  
  // We'll create a simulated payment page link. Since we don't have one, we will just send
  // a success URL that the frontend can redirect to.
  
  const simulatedPaymentUrl = `${req.protocol}://${req.get('host')}/api/payment/simulate?orderId=${orderId}&clientUrl=${encodeURIComponent(clientUrl)}`;

  res.json({
    success: true,
    paymentUrl: simulatedPaymentUrl,
    orderId
  });
});

// Simulate a payment page on the backend for testing
router.get('/simulate', (req, res) => {
  const { orderId, clientUrl } = req.query;
  const order = getOrderById(orderId);
  
  if (!order) {
    return res.status(404).send('Order not found');
  }

  // HTML page that auto-submits a success form
  const html = `
    <html>
      <head><title>Simulated Payment Gateway</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h2>Simulating ${order.paymentMethod.toUpperCase()} Payment Gateway...</h2>
        <p>Paying: ${order.totalAmount} for Order: ${order.id}</p>
        <form action="/api/payment/success" method="POST">
          <input type="hidden" name="orderId" value="${order.id}" />
          <input type="hidden" name="clientUrl" value="${clientUrl}" />
          <button type="submit" style="padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 5px;">
            Confirm Payment (Simulation)
          </button>
        </form>
      </body>
    </html>
  `;
  res.send(html);
});

// Payment Success Webhook/IPN
router.post('/success', (req, res) => {
  const { orderId, clientUrl } = req.body;
  
  // In a real scenario, you would verify the signature/amount here from the Payment Gateway
  updateOrderStatus(orderId, 'Paid');

  // Redirect user back to the client app success page
  res.redirect(`${clientUrl}/success?orderId=${orderId}`);
});

// Payment Fail Webhook/IPN
router.post('/fail', (req, res) => {
  const { orderId, clientUrl } = req.body;
  
  updateOrderStatus(orderId, 'Failed');

  // Redirect user back to the client app fail page
  res.redirect(`${clientUrl}/fail?orderId=${orderId}`);
});

module.exports = router;
