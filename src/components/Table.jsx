import React, { useContext } from 'react';
import Context from '../context/planetsContext';
import Header from './HeaderSearch';
import Form from './Form';

function Table() {
  const { titlesPlanets, filterPlanets } = useContext(Context);

  return (
    <div>
      <Header />
      <Form />
      <table>
        <thead>
          <tr>
            {titlesPlanets.map((title, index) => (
              <th key={ index }>{title.toUpperCase().replace('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
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
              <td>
                {planet.films.map((film) => (
                  <span key={ film }>{film}</span>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
