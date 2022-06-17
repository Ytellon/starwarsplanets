import React, { useContext } from 'react';
import Context from '../context/planetsContext';
import Header from './HeaderSearch';
import Form from './Form';
import styles from '../styles/Table.module.css';

function Table() {
  const { titlesPlanets, filterPlanets } = useContext(Context);

  return (
    <div className={ styles.containerTable }>
      <Header />
      <Form />
      <table>
        <thead className={ styles.containerThead }>
          <tr>
            {titlesPlanets.map((title, index) => (
              <th key={ index }>{title.toUpperCase().replace('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody className={ styles.containerTbody }>
          {filterPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
