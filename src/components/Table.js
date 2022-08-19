import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const {
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
  } = useContext(MyContext);

  const showPlanets = () => {
    setPlanetsList(planets);
    if (activesFilters > 0) {
      let newList = [];
      if (filterComparision === 'maior que') {
        newList = planetsList
          .filter((e) => Number(e[filterColumn]) > Number(filterValue));
        setPlanetsList(newList);
      }
      if (filterComparision === 'menor que') {
        newList = planetsList
          .filter((e) => Number(e[filterColumn]) < Number(filterValue));
        setPlanetsList(newList);
      }
      if (filterComparision === 'igual a') {
        newList = planetsList
          .filter((e) => Number(e[filterColumn]) === Number(filterValue));
        setPlanetsList(newList);
      }
    }
  };

  useEffect(() => {
    showPlanets();
  }, [planets, activesFilters]);

  const handleClick = () => {
    const newArray = [
      ...filterByNumericValues,
      {
        column: filterColumn,
        comparison: filterComparision,
        value: filterValue,
      },
    ];
    setFilterByNumericValues(newArray);
    setActivesFilters(activesFilters + Number('1'));
  };

  return (
    <div>
      <h1>Star Wars Planets Search</h1>
      <input
        type="text"
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setFilterColumn(target.value) }
        value={ filterColumn }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setFilterComparision(target.value) }
        value={ filterComparision }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setFilterValue(target.value) }
        value={ filterValue }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { planetsList.filter((item) => item.name.includes(filterByName.name))
            .map((item, index) => (
              <tr key={ index }>
                <td>{item.name}</td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{ item.films.map((film, ind) => <p key={ ind }>{film}</p>)}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
