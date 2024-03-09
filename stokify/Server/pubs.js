const redis = require('redis');

// Create Publisher Client
const publisher = redis.createClient({
  url: 'redis://default:kFvb6T7bJfUGgIqALzB0X9M84jyyhIe1@redis-15724.c301.ap-south-1-1.ec2.cloud.redislabs.com:15724',
});

(async () => {
  // Intialize Five Stocks
  const stocks = ['HDFC', 'GMRINFRA', 'TATAMOTORS', 'LIC', 'RELIANCE'];

  await publisher.connect();
  console.log("Connected");

  setInterval(() => {
    stocks.forEach(stock => {
      // Simulate data for each stock
      const price = ((Math.random() * (200 - 100) + 100).toFixed(2));
      const quantity = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      const timestamp = Math.floor(Date.now() / 1000);
      
      // Create a JSON object for stock data
      const stockData = {
        stock: stock,
        timestamp: timestamp,
        price: price,
        quantity: quantity
      };

      // Convert the JSON object to a string
      const stockDataString = JSON.stringify(stockData);
      
      // Publish the serialized stock data to the Redis channel
      publisher.publish('stock_data', stockDataString);
      // console.log("Published stock data:", stockData);

      // Store the serialized stock data in a Redis list
      publisher.lPush(`stock_data_${stock}`, stockDataString, (err, reply) => {
        if (err) {
          console.error(`Error storing stock_data for ${stock}:`, err);
        } else {
          console.log(`Stock data stored successfully for ${stock}:`, reply);
        }
      });
    });
  }, 5000); // Publish data every 5 seconds
})();
