import React from "react";
import Logo from "../logo/logo";
import Btn from "../btn/btn";

import "./aside.scss";

class Aside extends React.Component {
  state = {
    pages: [
      {
        title: "Home",
        page: "home",
        icon: "home",
      },
      {
        title: "Search",
        page: "search",
        icon: "search",
      },
      {
        title: "Your Library",
        page: "library",
        icon: "list",
      },
      {
        title: "Create Playlist",
        page: "playlist",
        icon: "folder-plus",
      },
      {
        title: "Liked Songs",
        page: "songs",
        icon: "heart",
      },
    ],
  };

  handleClick = (page) => {
    this.props.changePage(page);
  };

  render() {
    return (
      <aside id="aside">
        <Logo />
        <ul>
          {this.state.pages.map((item, idx) => (
            <Btn
              key={idx}
              title={item.title}
              page={item.page}
              icon={item.icon}
              changePage={this.handleClick}
            />
          ))}
        </ul>
      </aside>
    );
  }
}

export default Aside;
