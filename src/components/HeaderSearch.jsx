import React, { useContext } from 'react';
import Context from '../context/planetsContext';
import styles from '../styles/HeaderSearch.module.css';
import starlogo from '../asset/image/star-wars-4 (1).svg';

function HeaderSearch() {
  const { setFilterByName } = useContext(Context);

  return (
    <div className={ styles.headerSearch }>
      <img src={ starlogo } alt="starlogo" />
      <input
        data-testid="name-filter"
        onChange={ (event) => setFilterByName({ name: event.target.value }) }
        type="text"
        placeholder="Search"
      />
    </div>
  );
}

export default HeaderSearch;
