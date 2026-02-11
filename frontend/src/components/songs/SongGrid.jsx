import React from "react";
import "../../css/songs/SongGrid.css"
import SongCard from "./SongCard";
const SongGrid = ({ songs , onSelectFavourite}) => {
  if(!songs || songs.length === 0)
  {
    return(
      <div className="song=grid-empty">
        <p className="empty-text">No Favoutite Songs yet</p>
        <p className="empty-subtext">Start exploring and add Songs to Favourite</p>
      </div>
    )
  }
  return (
    <div className="song-grid-wrapper">
      <h2 className="song-grid-heading">
        your Favorites
      </h2>

      <div className="song-grid">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} onSelectFavourite={()=>{onSelectFavourite(song)}}/>
      ))}
    </div>
    </div>
  );
};

export default SongGrid;
