import React, { useState, useEffect } from 'react';
import './Style.css';
import Navbar from './Components/Navbar/Navbar';
import Window from './Components/Window/Window';
import Footer from './Components/Footer/Footer';
import axios from 'axios';

function App() {
  const [stockSymbol, setStockSymbol] = useState("HDFC");
  const [listItemClicked, setListItemClicked] = useState(false);
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [currPrice, setCurrPrice]= useState("");
  const [currQuantity, setCurrQuantity]= useState("");


  const handleStockSymbol = (data, listItemClicked) => {
    setStockSymbol(data);  // Update Stock Symbol
    setListItemClicked(listItemClicked); // Update listItemClicked state
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5681/data');
        
        // Dynamically set state based on the stockSymbol
        setTime((response.data[`${stockSymbol}t`]).map(t => new Date(t * 1000))); 
        setPrice(response.data[`${stockSymbol}p`]);  setCurrPrice(response.data[`${stockSymbol}p`][0]);
        setQuantity(response.data[`${stockSymbol}q`]);  setCurrQuantity(response.data[`${stockSymbol}q`][0]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Fetch data initially
    fetchData();
    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);

  }, [stockSymbol]); // Run useEffect when stockSymbol changes

  return (
    <div className="App">
      <Navbar onData={handleStockSymbol} />
      <Window
        stockSymbol={stockSymbol}
        listItemClicked={listItemClicked}
        time={time}
        price={price}
        quantity={quantity}
        currPrice={currPrice}
        currQuantity={currQuantity}
      />
      <Footer />
    </div>
  );
}

export default App;
