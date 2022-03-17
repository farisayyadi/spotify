import React from "react";
import "./albumsList.scss";

class AlbumsList extends React.Component {
  handlePlaying = (idx) => {
    this.props.playMusic_content(this.props.data_content.title, idx);
  };

  isPlaying = (idx) => {
    const data = this.props.data_content;
    const playInfo = this.props.play_content;

    const cond_1 = playInfo.active;
    const cond_2 = data.id == 1 && idx == 0;
    const cond_3 = data.id == 2 && idx == playInfo.idx;

    return (cond_1 && cond_2) || (cond_1 && cond_3);
  };

  render() {
    return (
      <div id="albumsList">
        <h2>{this.props.data_content.title}</h2>
        {this.props.data_content.tracks.map((item, idx) => (
          <div
            onClick={() => {
              this.handlePlaying(idx);
            }}
            key={idx}
            className={"albums" + (this.isPlaying(idx) ? " active" : "")}
          >
            <figure>
              <img src={item.image} alt={item.singerName} />
            </figure>
            <figcaption>
              {item.singerName}
              <p>{item.albumsName}</p>
            </figcaption>

            {this.isPlaying(idx) ? (
              <i className="las la-pause"></i>
            ) : (
              <i className="las la-play"></i>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default AlbumsList;
