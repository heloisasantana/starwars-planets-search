import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { planets, filterByName, setFilterByName } = useContext(MyContext);

  const handleChange = (event) => {
    const { value } = event.target;
    setFilterByName({ name: value });
  };

  return (
    <div>
      <h1>Star Wars Planets Search</h1>
      <input
        type="text"
        onChange={ handleChange }
        data-testid="name-filter"
      />
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
          { planets.filter((item) => item.name.includes(filterByName.name))
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
