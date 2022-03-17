import React from "react";
import axios from 'axios';
import Aside from "./components/aside/aside";
import Content from "./components/content/content";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import "./App.scss";

class App extends React.Component {

  access_token = "BQC_zdmfNI1VAqgaXA9e2mq1s6wuwCuIrroPRPNrYdnJXzMmb-IytBnYi9wPCBmd3i9epFno8lhwiUkcKUVu-1EeNtwF2_AkghJNe0snHpbg4SNEg75bniLaO9wJ4x0U-g2FdQgJVerk_nNZeU7ttcPWFB5RWZtfysY";
  headers = {
    'Authorization': `Bearer ${this.access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  state = {
    currentPage: "home",
    searchText: "",
    isLoaded: false,
    offset: 0,
    play: {
      section: '',
      idx: null,
      active: false,
    },
    track: {
      image: "arash.jpeg",
      trackName: "Broken Angel",
      trackUrl: "Broken_Angel.mp3",
      singerName: "Arash - From Persia"
    },
    data: {
      recently: {
        id: 1,
        title: "Recently played",
        tracks: []
      },
      all: {
        id: 2,
        title: "Albums list",
        tracks: []
      }
    },
    artists: {}
  };

  handleAsideClick = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  loadArtist = (artistName) => {
    const params = `q=${artistName}&type=artist&offset=${this.state.offset}&limit=6`;
    const newData = { ...this.state.data };
    newData.all.tracks = [];
    this.setState({
      artists: {},
      data: newData,
    })

    if (artistName == '') {
      return
    }

    axios.get(
      `https://api.spotify.com/v1/search?${params}`,
      { headers: this.headers }
    ).then(async res => {
      if (res.data) {
        const artistsIdList = res.data.artists.items.map(item => item.id);
        const artists = {};
        for (const artistId of artistsIdList) {
          artists[artistId] = await this.loadAlbums(artistId);
        }
        this.setState({
          artists: artists
        }, () => {
          this.loadMore();
        });
      }
    }).catch(err => {
      console.log(err)
    })
  };

  loadAlbums = async (artistId) => {
    const res = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      { headers: this.headers }
    );
    if (res.data) {
      const albums = res.data.items;
      const albumsList = albums.map(item => {
        return {
          album_id: item.id,
          image_url: item.images[1].url,
          name: item.name,
          artist: item.artists[0].type,
          is_loaded: false,
        }
      });
      return albumsList;
    }
  }

  loadMore = () => {
    let artists = { ...this.state.artists };
    let data = { ...this.state.data };
    let tracks = [];

    exit:
    for (const id in artists) {
      const albums = artists[id];
      for (const album of albums) {
        if (!album.is_loaded) {
          album['is_loaded'] = true;
          tracks.push({
            image: album.image_url,
            singerName: album.name,
            albumsName: album.artist,
            trackId: album.album_id,
          });
          if (tracks.length === 18) break exit;
        }
      }
    }

    data.all.tracks.push(...tracks);

    this.setState({
      artists: artists,
      data: data,
    })
  }

  playMusic = (title, idx) => {
    let newData = { ...this.state.data };
    let newRecentlyTracks = [...newData.recently.tracks];

    if (title == 'Recently played') {
      const removedTrack = newRecentlyTracks.splice(idx, 1);
      newRecentlyTracks = [removedTrack[0], ...newRecentlyTracks];
    } else if (title == "Albums list") {
      const selectedTrackFromAll = this.state.data.all.tracks[idx];
      const trackId = selectedTrackFromAll.trackId;
      newRecentlyTracks = newRecentlyTracks.filter(item => item.trackId != trackId);
      newRecentlyTracks = [selectedTrackFromAll, ...newRecentlyTracks];
    }
    let newPlay = { ...this.state.play };

    let isPlaying = true;
    if (idx === 0 && title === "Recently played") {
      isPlaying = !this.state.data.recently.isPlaying;
    }

    newPlay.section = title;
    newPlay.idx = idx;
    newPlay.active = isPlaying;

    newRecentlyTracks = newRecentlyTracks.slice(0, 6);
    newData.recently.tracks = newRecentlyTracks;
    newData.recently.isPlaying = isPlaying;

    this.setState({
      play: newPlay,
    })


    this.setState({
      data: newData,
    })


  }

  render() {
    return (
      <>
        <Aside action={this.handleAsideClick} />
        <Header
          page={this.state.currentPage}
          title={this.state.currentPage}
          action={this.loadArtist}
        />
        <Content
          data_app={this.state.data}
          scroll_app={this.loadMore}
          playMusic_app={this.playMusic}
          play_app={this.state.play}
        />
        <Footer data={this.state.track} />
      </>
    );
  }
}

export default App;