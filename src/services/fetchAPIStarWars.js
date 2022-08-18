const fetchPlanets = async () => {
  const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json());
  const { results } = await data;
  return results;
};

export default fetchPlanets;
