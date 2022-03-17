import React from "react";
import "./btn.scss";
import "../../assets/styles/line-awesome/scss/line-awesome.scss";

class Btn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <>
        <li
          onClick={() => {
            this.props.action(this.props.page);
          }}
        >
          <i className={"las la-" + this.props.icon}></i>
          <span>{this.props.title}</span>
        </li>
      </>
    );
  }
}

export default Btn;
