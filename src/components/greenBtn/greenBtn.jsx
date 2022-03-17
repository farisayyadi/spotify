import React from "react";
import "./greenBtn.scss";

class GreenBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    isPlaying: false,
  };

  render() {
    return (
      <div id="greenBtn">
        {this.state.isPlaying === true ? (
          <i className="las la-pause"></i>
        ) : (
          <i className="las la-play"></i>
        )}
      </div>
    );
  }
}

export default GreenBtn;
