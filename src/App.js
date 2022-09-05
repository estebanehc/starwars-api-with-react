import { useState, useEffect, useRef } from 'react';
import { getCharacter, getPeople, searchCharacter } from './API/people';
import styles from './App.module.css'
import { Banner } from './banner';

function App() {
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);

  useEffect (() =>{
    getPeople(page)
    .then(setPeople);
  }, [page]);

  useEffect (()=>{getCharacter(currentCharacter).then(setDetails);}, [currentCharacter]);

  const showDetails = (character) =>{
    const id = Number(character.url.split('/').slice(-2)[0])
    setCurrentCharacter(id);
  }

  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  };

  const onSearchSubmit = (event) => {
    if (event.key !== "Enter") return;

    inputSearch.current.value = "";
    setDetails({});
    searchCharacter(textSearch).then(setPeople);
  };

  const onChangePage = (next) =>{
    if(!people.previous && page + next <= 0) return;
    if(!people.next && page + next >= 9) return;

    setPage(page+next);
  }

  return (
    <div>
      <div className={styles.title}>
        <br></br>
        <h1 >STARWARS</h1>
        <br></br>
      </div>
      <div className={styles.searchContainer}>
      <input className={styles.searchBox}
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder="Search for a Character"
      />
      </div>
      <br></br>
      <br></br>
      <div className={styles.container}>
        <div className={styles.index}>
        <h1>Characters</h1>
          <ul>
          {people?.results?.map((character)=>(
            <li className={styles.line} key={character.name} onClick={()=>showDetails(character)}>{character.name}</li>
          ))}
          </ul>
          <section>
            <button className={styles.btn} onClick={()=> onChangePage(-1)}>Prev</button> | {page} | <button className={styles.btn} onClick={()=> onChangePage(1)}>Next</button>
            <br></br>
            <br></br>
          </section>
        </div>
      
      
      {details && (
        <aside className={styles.bio}>
          <h1>{details.name}</h1>
          <ul className={styles.biotext}>
            <li><strong>Height: </strong>{details.height} cm.</li>
            <li><strong>Mass: </strong>{details.mass} lb.</li>
            <li><strong>Birth Year: </strong>{details.birth_year}</li>
            <li><strong>Hair Color: </strong>{details.hair_color}</li>
            <li><strong>Eyes Color: </strong>{details.eye_color}</li>
            <li><strong>Gender: </strong>{details.gender}</li>
          </ul>
        </aside>
      )}
      </div>
      
      
    </div>
  );
}

export default App;
