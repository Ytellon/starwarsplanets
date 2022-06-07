import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/planetsContext';
import Header from './HeaderSearch';

function Table() {
  const { titlesPlanets, data, filterByName } = useContext(Context);
  const [filterPlanets, setFilterPlanets] = useState([]);

  useEffect(() => {
    if (filterByName.name === '') {
      setFilterPlanets(data);
    } else {
      const filteredPlanets = data.filter((planet) => planet.name.toLowerCase()
        .includes(filterByName.name.toLowerCase()));
      setFilterPlanets(filteredPlanets);
    }
  }, [filterByName, data]);

  return (
    <div>
      <Header />
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
