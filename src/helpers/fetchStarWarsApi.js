const fetchStarWarsApi = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();

  return data;
};

export default fetchStarWarsApi;
