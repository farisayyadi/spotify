import React from "react";
import "./footer.scss";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    artist: [],
    volume: {
      isMoving: false,
      percent: 50,
    },
    isPlaying: false,
    progressBar: {
      currentNum: 0,
      maxNum: 11700,
      percent: 0,
    },
  };

  milisecontToMinute = (millisecond) => {
    let second = millisecond / 60;
    let minute = parseInt(second / 60);

    second = parseInt(second - minute * 60);
    if (second < 10) {
      second = "0" + second;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }

    return minute + ":" + second;
  };

  playingProgressBar = () => {
    let progressBarNum = this.state.progressBar;
    progressBarNum.currentNum += 60;
    const percent = parseInt(
      (100 * progressBarNum.currentNum) / progressBarNum.maxNum
    );
    progressBarNum.percent = percent;

    this.setState({
      progressBar: progressBarNum,
    });
  };

  progressBarHandler = (e) => {
    const box = e.target.getBoundingClientRect();
    const boxLeft = box.left;
    const mouseLeft = parseInt(e.clientX);
    const diff = mouseLeft - boxLeft;
    const boxWidth = parseInt(box.width);

    if (diff < 0) diff = 0;
    let percent = parseInt((100 * diff) / boxWidth);
    let newCurrentNum = parseInt(
      (percent * this.state.progressBar.maxNum) / 100
    );

    if (percent < 2) {
      percent = 0;
    } else if (percent > 98) {
      percent = 100;
    }

    let newProgressBar = this.state.progressBar;
    newProgressBar.percent = percent;
    newProgressBar.currentNum = newCurrentNum;

    this.setState({
      progressBar: newProgressBar,
    });
  };

  volumeHandler = () => {
    let newVolume = this.state.volume;
    if (newVolume.percent == 0) {
      newVolume.percent = 50;
    } else {
      newVolume.percent = 0;
    }
    this.setState({
      volume: newVolume,
    });
  };

  playHandler = () => {
    let newState = !this.state.isPlaying;
    this.setState({
      isPlaying: newState,
    });
  };

  mouseDownHandler = () => {
    let newVolume = this.state.volume;
    newVolume.isMoving = true;

    this.setState({
      volume: newVolume,
    });
  };

  mouseUpHandler = () => {
    let newVolume = this.state.volume;
    newVolume.isMoving = false;

    this.setState({
      volume: newVolume,
    });
  };

  clickHandler = (e) => {
    const box = e.target.getBoundingClientRect();
    const boxLeft = box.left;
    const mouseLeft = parseInt(e.clientX);
    const diff = mouseLeft - boxLeft;
    const boxWidth = parseInt(box.width);

    if (diff < 0) diff = 0;
    let percent = (100 * diff) / boxWidth;

    if (percent < 5) {
      percent = 0;
    } else if (percent > 95) {
      percent = 100;
    }

    let newVolume = this.state.volume;
    newVolume.percent = percent;

    this.setState({
      volume: newVolume,
    });
  };

  render() {
    return (
      <div id="footer">
        <div id="info">
          <figure>
            <img
              src={require(`../../assets/images/${this.props.data.image}`)}
              alt="this.props.data.trackName"
            />
          </figure>
          <figcaption>
            {this.props.data.trackName}
            <p>{this.props.data.singerName}</p>
          </figcaption>
          <div className="icons">
            <i className="las la-heart"></i>
            <i className="las la-share-square"></i>
          </div>
        </div>

        <div id="controller">
          <div>
            <i className="las la-random"></i>
            <i className="las la-fast-backward"></i>
            {this.state.isPlaying === false ? (
              <i className="las la-play" onClick={this.playHandler}></i>
            ) : (
              <i className="las la-pause" onClick={this.playHandler}></i>
            )}

            <i className="las la-forward"></i>
            <i className="las la-redo-alt"></i>
          </div>
          <div id="progressBar">
            <span>
              {this.milisecontToMinute(this.state.progressBar.currentNum)}
            </span>
            <span id="firstProgressLine" onClick={this.progressBarHandler}>
              <span
                id="secondProgressLine"
                style={{ width: this.state.progressBar.percent + "%" }}
              ></span>
            </span>

            <span>
              {this.milisecontToMinute(this.state.progressBar.maxNum)}
            </span>
          </div>
        </div>

        <div id="audio" className="icons">
          <i className="las la-microphone-alt"></i>
          <i className="las la-bars"></i>
          <i className="lab la-connectdevelop"></i>

          {this.state.volume.percent == 0 && (
            <i className="las la-volume-mute" onClick={this.volumeHandler}></i>
          )}

          {this.state.volume.percent !== 0 &&
            this.state.volume.percent !== 100 && (
              <i
                className="las la-volume-down"
                onClick={this.volumeHandler}
              ></i>
            )}

          {this.state.volume.percent == 100 && (
            <i className="las la-volume-up" onClick={this.volumeHandler}></i>
          )}

          <span
            id="firstAudioMeasure"
            onMouseDown={this.mouseDownHandler}
            onMouseUp={this.mouseUpHandler}
            onClick={this.clickHandler}
          >
            <span
              id="secondAudioMeasure"
              style={{ width: this.state.volume.percent + "%" }}
            >
              <span id="circle"></span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
