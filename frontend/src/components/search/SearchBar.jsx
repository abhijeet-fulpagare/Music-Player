import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios"
import "../../css/search/SearchBar.css"
const SearchBar = ({setSearchSongs}) => {

  const [query,setQuery]=useState("");

  const[loading,setLoading]=useState(false);

  useEffect(()=>{
    if(!query.trim())
    {
      setSearchSongs([]);
      return;
    }

    const fetchSongs=async()=>{
      try{
        setLoading(true);
        const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/songs/playlistByTag/${encodeURIComponent(query)}`)

        setSearchSongs(res.data.results)
      }catch(e){
          console.error("Search Failed",e)
          setSearchSongs([]);
      }
      finally{
        setLoading(false)
      }
    }

    const deBounce=setTimeout(fetchSongs,500);
    return()=>clearInterval(deBounce);

  },[query,setSearchSongs])
  return (
    <div className="searchbar-root">
        <div className="searchbar-input-wrapper">
          <input
            className="searchbar-input"
            type="text"
            placeholder="Search songs..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            autoFocus
          />
          <CiSearch className="searchbar-icon" size={20}/>
        </div>

        {!query && !loading && (<p className="searchbar-empty">Search Songs to Display</p>)}

        {loading && <p className="serachbar-loading">Seraching.....</p>}
    </div>
  );
};

export default SearchBar;
