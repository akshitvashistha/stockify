import { Component } from "react";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import menu from "../../Assets/menu.png";
import cross from "../../Assets/cross.png";

class Navbar extends Component {
  state = {
    clicked: false,
    selectedStock: null, // Add state to track the selected stock
    listItemClicked: true // Add state to track if any list item is clicked
  };
 // Open and CLose the hamburger Menu
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleStockClick = (stock) => { // Event handler for stock item click
    this.setState({ selectedStock: stock });
    this.setState({ clicked: !this.state.clicked }); // Simultanously close the MEnu
    this.setState({ listItemClicked: true }); // Set listItemClicked to true when a list item is clicked
    this.props.onData(stock, this.state.listItemClicked); // Invoke the callback function with the selected stock symbol
  };

  render() {
    const { selectedStock } = this.state;

    return (
      <nav className="navbar-container">

        <img src={logo} alt="OX" className="logo"></img>
        <h1>OptionX</h1>

        <div className="ham-menu" onClick={this.handleClick}>
          <img src={this.state.clicked ? cross : menu} alt={this.state.clicked ? "X" : "M"} className="menu-icon"></img>
        </div>

        <ul className={this.state.clicked ? "stock-menu active" : "stock-menu"}>
          <li className="stock-item" onClick={() => this.handleStockClick("HDFC")}><b>HDFC</b></li>
          <li className="stock-item" onClick={() => this.handleStockClick("GMRINFRA")}><b>GMRINFRA</b></li>
          <li className="stock-item" onClick={() => this.handleStockClick("TATAMOTORS")}><b>TATA MOTORS</b></li>
          <li className="stock-item" onClick={() => this.handleStockClick("LIC")}><b>LIC</b></li>
          <li className="stock-item" onClick={() => this.handleStockClick("RELIANCE")}><b>RELIANCE</b></li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
