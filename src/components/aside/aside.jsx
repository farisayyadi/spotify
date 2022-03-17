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
        path: "/",
      },
      {
        title: "Search",
        page: "search",
        icon: "search",
        path: "/",
      },
      {
        title: "Your Library",
        page: "library",
        icon: "list",
        path: "/",
      },
      {
        title: "Create Playlist",
        page: "playlist",
        icon: "folder-plus",
        path: "/",
      },
      {
        title: "Liked Songs",
        page: "songs",
        icon: "heart",
        path: "/",
      },
    ],
  };

  handleClick = (page) => {
    this.props.action(page);
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
              action={this.handleClick}
            />
          ))}
        </ul>
      </aside>
    );
  }
}

export default Aside;
