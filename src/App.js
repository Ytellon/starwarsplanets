import React from 'react';
import './App.css';
import PlanetsContextProvider from './context/planetsContextProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetsContextProvider>
      <Table />
      <span>Hello, App start!</span>
    </PlanetsContextProvider>
  );
}

export default App;
