const PLANET_URL_SEARCH = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getUrlPlanets = async () => {
  try {
    const response = await fetch(PLANET_URL_SEARCH);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default getUrlPlanets;
