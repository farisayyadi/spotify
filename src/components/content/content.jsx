import React from "react";
import AlbumsList from "../albumsList/albumsList";

import "./content.scss";

class Content extends React.Component {
  handleScroll = (e) => {
    const el = e.target;
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
    if (bottom) {
      this.props.scroll_app();
    }
  };

  render() {
    return (
      <div id="content" onScroll={this.handleScroll}>
        <AlbumsList
          data_content={this.props.data_app.recently}
          playMusic_content={this.props.playMusic_app}
          play_content={this.props.play_app}
        ></AlbumsList>
        <AlbumsList
          data_content={this.props.data_app.all}
          playMusic_content={this.props.playMusic_app}
          play_content={this.props.play_app}
        ></AlbumsList>
      </div>
    );
  }
}

export default Content;
