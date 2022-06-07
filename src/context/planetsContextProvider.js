import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './planetsContext';
import getUrlPlanets from '../services/planetsApi';

function PlanetsContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [titlesPlanets, setTitlesPlanets] = useState([]);

  useEffect(() => {
    const savedPlanets = async () => {
      const resultPlanets = await getUrlPlanets();
      setData(resultPlanets);
      setTitlesPlanets(Object.keys(resultPlanets[0])
        .filter((planets) => planets !== 'residents'));
    };
    savedPlanets();
  }, []);

  const contextValue = { data, titlesPlanets };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

PlanetsContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default PlanetsContextProvider;
