
import { useState, useEffect } from 'react';
import './App.js';
import axios from 'axios';
import Definitions from './Definitions.js';
import * as React from 'react';

let apiKey = "979afc0f-7d93-4b0b-bdb3-84b63edcbc7d";

function SearchItem() {

  const [searchText, setsearchText] = useState('');
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secLoading, setSecLoading] = useState(false);
  const [secItems, setSecItems] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const [synonymsData, setSynonymsData] = useState(null);
  const [antonymsData, setAntonymsData] = useState(null);

  //creating async function 
  const dictionaryApi = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`); // await until you get this data     
      // console.log(searchText);
      const data = res.data[0];
      setLoading(false);
      setItems(data);
      //console.log(data);
      const audio1 = data.phonetics[0].audio;
      //console.log(audio1);
      setAudioUrl(audio1);
      //console.log(audioUrl);
    } catch (error) {
      console.log(error);
    }
  }; //end of dictionaryApi()

  const synonymsApi = async () => {
    try {
      setSecLoading(true);
      const response = await axios.get(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${searchText}?key=${apiKey}`);

      setSecItems(response.data[0].meta);
      //console.log(response.data[0].meta);
      //console.log(response.data.meta.ants);
      const syn = response.data[0].meta.syns[0];
      const ant = response.data[0].meta.ants[0];
      // console.log(syn);
      // console.log(ant);
      setSynonymsData(syn);
      setAntonymsData(ant);
      setSecLoading(false);
    } catch (error) {
      console.log(error);
    }
  }; // end of synonymsApi()
  useEffect(() => {

  }, [searchText]); //end of useEffect

  function handleSubmit(ev) {
    ev.preventDefault(); // prevent page reload
    console.log('Form submitted!');
    dictionaryApi();
    synonymsApi();
    // setAudioLoading(false);
  } // end of handleSubmit

  function handleBookmarks() {
    bookmarks.includes(searchText)
      ?
      alert("Text already exists")
      :
      setBookmarks([...bookmarks, searchText]);
  } // end of handleBookmarks

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type a word to search" onChange={(ev) => setsearchText(ev.target.value)} />

        <button className="search"> Search </button>
      </form>

      <button className="fav" onClick={handleBookmarks}>Favorites</button>
      {/* <button className="favlist" onClick={handleFavList}>View Bookmarks</button> */}

      <div className="favlist">
        <p className="p-fav">Favorites list</p>
        <li>{bookmarks}</li>
      </div>

      <div className="audio">
        {
          audioUrl &&
          <audio
            controls
            src={audioUrl}></audio>
        }
      </div>

      {/* <div className="dropdown">
            <select>
            {bookmarks.map ((options) => (
              
              <option value={options}></option>
            ))}
          </select>
          </div> */}

      <div className="results">
        {loading
          ?
          <p>Loading...</p>
          :
          items &&  // before mapping meanings,items cannot be null
          (<div className='container'>
            {items.meanings.map((meaning) => {
              //console.log(meaning);
              return (
                <Definitions mean={meaning} />
              );
            })}</div>)
        }

        {
          synonymsData &&
          (<div className="syno">
            <h5>Synonyms:</h5>
            {synonymsData.map((d) => {
              return (
                <p>{d}</p>
              );
            })}</div>)
        }

        {
          antonymsData &&
          (<div className="anto">
            <h5>Antonyms:</h5>
            {antonymsData.map((a) => {
              return (
                <p>{a}</p>
              );
            })}</div>)
        }
      </div>
    </>
  );
}

export default SearchItem;
