import React from 'react';
import { Component } from "react";
import Plot from 'react-plotly.js';
import "./Window.css";
import img from "../../Assets/image.png"


class Window extends Component {

  constructor(props) {


    super(props);
    this.state = {
      stockSymbol: props.stockSymbol, // Retrieve stockSymbol from props
      listItemClicked: props.listItemClicked, //Retrieve state of ListItem 
      time: props.time, // Retrieve time array from props
      price: props.price, // Retrieve price array from props
      quantity: props.quantity, // Retrieve quantity array from props
      currPrice: props.currPrice,  // Retrieve latest quantity from array
      currQuantity: props.currQuantity  // Retrieve latest price from array
    };
  }

  handleYClick = (selected) => {
    // Update yData and yTitle based on the button clicked
    if (selected === 'Price') {
      this.setState({ yData: this.state.price, yTitle: "Price" });
    } else if (selected === 'Quantity') {
      this.setState({ yData: this.state.quantity, yTitle: "Quantity" });
    }
  }
  componentDidUpdate(prevProps) {
    // Check if the props have changed
    if (prevProps !== this.props) {
      // Update the state with the new props
      this.setState({
        stockSymbol: this.props.stockSymbol,
        listItemClicked: this.props.listItemClicked,
        time: this.props.time,
        price: this.props.price,
        quantity: this.props.quantity,
        currPrice: this.props.currPrice,
        currQuantity: this.props.currQuantity
      });
    }
  }

  render() {
  //  let time=this.state.stockData[0],price=this.state.stockData[1],quantity=[];
  const { stockSymbol, currPrice, currQuantity, time, yData, yTitle } = this.state;
  var w,h;

    function handleResize() {
      if (window.innerWidth < 768) {
        // Code to execute for smaller screen sizes
        w=window.innerWidth*.95;
        h=window.innerHeight*.5;
      } else {
        // Code to execute for larger screen sizes
        w=window.innerWidth*.6;
        h=window.innerHeight*.7;
      }
    }
    handleResize();
// Add event listener for window resize
window.addEventListener('resize', handleResize);


  return (
    <div className='Container'>
        
      <div className='first-window'>
        <div className={this.state.listItemClicked===true?'heading-txt':'heading-txt active'}>
        Trade With Unleashed Speed And Execution
        </div>
        <img src={img} alt='IMAGE' className={this.state.listItemClicked===true?'image':'image active'}></img>
      </div>

      <div className={this.state.listItemClicked===true?'data-plot active':'data-plot'}>
          <Plot 
              data={[
                {
                x: this.props.time, y: this.state.yData || this.state.price, type: 'scatter', marker: {color: 'red'},
                 },
              ]}
              layout={{   
                width: w, height: h,    
                font: {
                 color: '#000', size: 11.5, family: 'monospace',
                },
                paper_bgcolor: '#f7f7f7', plot_bgcolor: 'white',
                xaxis: {
                  title: 'Time', tickmode: 'auto', tick0: 0, dtick: 10, mirror: true, ticks: 'outside', showline: false,
                },
                yaxis: {
                  range: [0, 300], title: yTitle || "Price",
                },hovermode: 'closest'
              }} 
              config={{scrollZoom:true,responsive: true,}}
          />

          <div className='switch-btn'>
            <button className={yTitle === "Price" ? "clicked" : "blank"} onClick={() => this.handleYClick("Price")}>Price</button>
             <button className={yTitle === "Quantity" ? "clicked" : "blank"} onClick={() => this.handleYClick("Quantity")}>Quantity</button>
          </div>

          <div className={this.state.listItemClicked===true?'current-data':'current-data active'}>
          <b>
            Stock : {this.state.stockSymbol}<br></br>
            Price : {this.state.currPrice}<br></br>
            Quantity : {this.state.currQuantity}
          </b>
          </div>
      </div>
    </div>
    );
  }
}

export default Window;