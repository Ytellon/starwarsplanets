import React, { useContext } from 'react';
import Context from '../context/planetsContext';

function HeaderSearch() {
  const { setFilterByName } = useContext(Context);

  return (
    <div className="header-search">
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
