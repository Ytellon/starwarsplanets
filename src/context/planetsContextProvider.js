import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './planetsContext';
import getUrlPlanets from '../services/planetsApi';

function PlanetsContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [titlesPlanets, setTitlesPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterPlanets, setFilterPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [saveColums, setSaveColums] = useState('population');
  const [saveOrder, setSaveOrder] = useState('asc');
  const [order, setOrder] = useState({
    column: saveColums,
    sort: saveOrder,
  });

  useEffect(() => {
    const savedPlanets = async () => {
      const resultPlanets = await getUrlPlanets();
      resultPlanets.sort((a, b) => a.name.localeCompare(b.name));
      setData(resultPlanets);
      setFilterPlanets(resultPlanets);
      setTitlesPlanets(
        Object.keys(resultPlanets[0]).filter(
          (planets) => planets !== 'residents',
        ),
      );
    };
    savedPlanets();
  }, []);

  useEffect(() => {
    const filteredPlanets = data.filter((planet) => planet.name.toLowerCase()
      .includes(filterByName.name.toLowerCase()));
    const result = filterByNumericValues.reduce(
      (acc, filter) => acc.filter((planets) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(planets[filter.column]) > Number(filter.value);
        case 'menor que':
          return Number(planets[filter.column]) < Number(filter.value);
        case 'igual a':
          return Number(planets[filter.column]) === Number(filter.value);
        default:
          return true;
        }
      }),
      filteredPlanets,
    );
    setFilterPlanets(result);
  }, [filterByName, data, filterByNumericValues]);

  useEffect(() => {
    setOrder({ column: saveColums, sort: saveOrder });
  }, [saveColums, saveOrder]);

  const changeOrder = () => {
    setOrder({ column: saveColums, sort: saveOrder });
    switch (order.sort) {
    case 'asc':
      return setFilterPlanets(
        filterPlanets.sort((a, b) => a[order.column] - b[order.column]),
      );
    case 'desc':
      return setFilterPlanets(
        filterPlanets.sort((a, b) => b[order.column] - a[order.column]),
      );
    default:
      return true;
    }
  };

  const contextValue = {
    data,
    titlesPlanets,
    setFilterByName,
    filterByName,
    filterPlanets,
    filterByNumericValues,
    setFilterByNumericValues,
    saveColums,
    setSaveColums,
    saveOrder,
    setSaveOrder,
    changeOrder,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

PlanetsContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default PlanetsContextProvider;
