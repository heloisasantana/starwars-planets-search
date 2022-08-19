import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchPlanets from '../services/fetchAPIStarWars';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparision, setFilterComparision] = useState('maior que');
  const [filterValue, setFilterValue] = useState(0);
  const [activesFilters, setActivesFilters] = useState(0);

  useEffect(() => {
    const resolvedAPI = async () => {
      const results = await fetchPlanets();
      const filtered = results.filter((item) => item !== item.residents);
      setPlanets(filtered);
    };
    resolvedAPI();
  }, []);

  const valueInfo = {
    planets,
    planetsList,
    setPlanetsList,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    filterColumn,
    setFilterColumn,
    filterComparision,
    setFilterComparision,
    filterValue,
    setFilterValue,
    activesFilters,
    setActivesFilters,
  };

  return (
    <MyContext.Provider value={ valueInfo }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
