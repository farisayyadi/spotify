import React from "react";
import "./header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    searchText: "",
    timeout: null,
  };

  handleSearchText = (e) => {
    clearTimeout(this.state.timeout);

    const text = e.target.value;
    const timeout = setTimeout(() => this.props.action(text), 2000);

    this.setState({
      searchText: text,
      timeout: timeout,
    });
  };

  clearInput = () => {
    this.setState({
      searchText: "",
    });
  };

  loadData = () => {
    this.props.action(this.state.searchText);
  };

  render() {
    return (
      <div className="header">
        <i className="las la-chevron-circle-left"></i>
        <i className="las la-chevron-circle-right"></i>
        <span>
          <i className="las la-search" onClick={() => this.loadData}></i>
          <input
            type="text"
            value={this.state.searchText}
            onChange={this.handleSearchText}
            placeholder="Artist Name"
          />
          <i className="las la-times" onClick={this.clearInput}></i>
        </span>
      </div>
    );
  }
}

export default Header;
