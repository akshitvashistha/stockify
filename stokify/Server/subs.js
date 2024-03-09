const express = require('express');
const redis = require('redis');

const app = express();
const port = 5681;
let client=null;

// Create Redis client
(async () => {

client = await redis.createClient({
    password: 'kFvb6T7bJfUGgIqALzB0X9M84jyyhIe1',
    socket: {
        host: 'redis-15724.c301.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 15724
    }
});

// Handle Redis client errors
 client.on('error', (err) => {
    console.error('Redis error:', err);
});
await client.connect();
if (!client.connected) {
  console.log('connected')
}



})()

// Route to retrieve Stock data
app.get('/data', async (req, res) => {
  try {
      
    let HDFC=[],HDFCt=[],HDFCp=[],HDFCq = [];
    let GMRINFRA=[],GMRINFRAt=[],GMRINFRAp=[],GMRINFRAq=[];
    let TATAMOTORS=[],TATAMOTORSt=[],TATAMOTORSp=[],TATAMOTORSq=[];
    let RELIANCE=[],RELIANCEt=[],RELIANCEp=[],RELIANCEq=[];
    let LIC=[],LICt=[],LICp=[],LICq=[];
    
    // Retrieve Stock data from Redis list
    const result1 = await client.lRange('stock_data_HDFC', 0, -1);     
     HDFC = result1.map(JSON.parse);

    const result2 = await client.lRange('stock_data_GMRINFRA', 0, -1);
     GMRINFRA = result2.map(JSON.parse);

    const result3 = await client.lRange('stock_data_TATAMOTORS', 0, -1);
     TATAMOTORS = result3.map(JSON.parse);

    const result4 = await client.lRange('stock_data_RELIANCE', 0, -1);
     RELIANCE = result4.map(JSON.parse);

    const result5 = await client.lRange('stock_data_LIC', 0, -1);
     LIC = result5.map(JSON.parse);

    // Pushing the Data to the Array
      for(let i=0;i<HDFC.length;i++){
        HDFCt.push(HDFC[i].timestamp);
        HDFCp.push(HDFC[i].price);
        HDFCq.push(HDFC[i].quantity);
        
        GMRINFRAt.push(GMRINFRA[i].timestamp);
        GMRINFRAp.push(GMRINFRA[i].price);
        GMRINFRAq.push(GMRINFRA[i].quantity);

        TATAMOTORSt.push(TATAMOTORS[i].timestamp);
        TATAMOTORSp.push(TATAMOTORS[i].price);
        TATAMOTORSq.push(TATAMOTORS[i].quantity);

        RELIANCEt.push(RELIANCE[i].timestamp);
        RELIANCEp.push(RELIANCE[i].price);
        RELIANCEq.push(RELIANCE[i].quantity);

        LICt.push(LIC[i].timestamp);
        LICp.push(LIC[i].price);
        LICq.push(LIC[i].quantity);
      }
      const responseData = {
        HDFCt,HDFCp,HDFCq,
        GMRINFRAt,GMRINFRAp,GMRINFRAq,
        TATAMOTORSt,TATAMOTORSp,TATAMOTORSq,
        RELIANCEt,RELIANCEp,RELIANCEq,
        LICt,LICp,LICq
    };

    // Send the combined data as JSON response
    res.json(responseData);

  } catch (error) {
      console.error('Error retrieving HDFC data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;


// Create Redis subscriber for real-time updates
// const subscriber = client.duplicate();
//  subscriber.connect();
// console.log("cOnnected")
//  subscriber.subscribe('stock_data', (message) => { 
//  const data = JSON.parse(message);
//         HDFC.push(data);
// });
// const subscriber = client.duplicate();
// subscriber.on('error', (err) => {
//     console.error('Redis subscriber error:', err);
// });
// subscriber.on('message', (channel, message) => {
//     // Parse message and push to HDFC array
//     const data = JSON.parse(message);
//     HDFC.push(data);
//     console.log('New message from Redis:', data);
// });
// subscriber.subscribe('stock_data');