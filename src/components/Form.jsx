import React, { useState, useContext } from 'react';
import { IoPlanetSharp, IoTrashBin } from 'react-icons/io5';
import Context from '../context/planetsContext';
import styles from '../styles/Form.module.css';

function Form() {
  const someColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [optionSelected, setOptionSelected] = useState(someColumns);

  const {
    setFilterByNumericValues,
    filterByNumericValues,
    setSaveColums,
    setSaveOrder,
    changeOrder,
  } = useContext(Context);

  const handleNumericFilter = () => {
    const filteredPlanets = {
      column,
      comparison,
      value,
    };
    const optionFilter = optionSelected.filter((option) => option !== column);
    setOptionSelected(optionFilter);
    setFilterByNumericValues([...filterByNumericValues, filteredPlanets]);
  };

  const removeFilter = (columnFilter) => {
    const filterByNumericValuesCopy = filterByNumericValues.filter(
      (filter) => filter.column !== columnFilter,
    );
    setFilterByNumericValues(filterByNumericValuesCopy);
    setOptionSelected([...optionSelected, columnFilter]);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setOptionSelected(someColumns);
  };

  return (
    <div>
      <form className={ styles.formStyle }>
        <select
          onChange={ (event) => setColumn(event.target.value) }
          data-testid="column-filter"
        >
          {optionSelected.map((option) => (
            <option key={ option } value={ option }>
              {option}
            </option>
          ))}
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
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ removeAllFilters }
        >
          Remove Filters
        </button>
        <label htmlFor="order">
          <select
            onChange={ (event) => setSaveColums(event.target.value) }
            id="order"
          >
            {someColumns.map((option, index) => (
              <option key={ index } value={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div className={ styles.radioContainer }>
          <label className={ styles.planetLabel } htmlFor="ascend">
            ascendente
            <input
              onChange={ (event) => setSaveOrder(event.target.value) }
              value="asc"
              name="order"
              id="ascend"
              type="radio"
            />
            <IoPlanetSharp />
          </label>
          <label className={ styles.planetLabel } htmlFor="descend">
            descendente
            <input
              onChange={ (event) => setSaveOrder(event.target.value) }
              value="desc"
              name="order"
              id="descend"
              type="radio"
            />
            <IoPlanetSharp />
          </label>
        </div>
        <button onClick={ changeOrder } type="button">Order</button>
      </form>
      <section className={ styles.filterDone }>
        {filterByNumericValues.map((filterPlanet, index) => (
          <div data-testid="filter" key={ index }>
            <p>
              {`${filterPlanet.column} ${filterPlanet.comparison} ${filterPlanet.value}`}
            </p>
            <button
              onClick={ () => removeFilter(filterPlanet.column) }
              type="button"
            >
              <IoTrashBin />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Form;
