import React, { useState, useContext } from 'react';
import Context from '../context/planetsContext';

function Form() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const { setFilterByNumericValues, filterByNumericValues } = useContext(Context);

  const handleNumericFilter = () => {
    const filteredPlanets = {
      column,
      comparison,
      value,
    };
    setFilterByNumericValues([...filterByNumericValues, filteredPlanets]);
  };

  return (
    <form>
      <select
        onChange={ (event) => setColumn(event.target.value) }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ (event) => setComparison(event.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ (event) => setValue(event.target.value) }
        data-testid="value-filter"
        type="number"
        placeholder="0"
        value={ value }
      />
      <button
        onClick={ handleNumericFilter }
        data-testid="button-filter"
        type="button"
      >
        Filter
      </button>
      <div>
        { filterByNumericValues.map((filterPlanet, index) => (
          <p key={ index }>
            {
              `${filterPlanet.column} ${filterPlanet.comparison} ${filterPlanet.value}`
            }
          </p>
        )) }
      </div>
    </form>
  );
}

export default Form;
