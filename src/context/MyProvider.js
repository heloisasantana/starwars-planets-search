import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import fetchPlanets from '../services/fetchAPIStarWars';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    const resolvedAPI = async () => {
      const results = await fetchPlanets();
      const filtered = results.filter((item) => item !== item.residents);
      setPlanets(filtered);
    };
    resolvedAPI();
  }, []);

  const valueInfo = { planets, filterByName, setFilterByName };

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
