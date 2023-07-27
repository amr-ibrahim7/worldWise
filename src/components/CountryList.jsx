import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountriesList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    // If the current city.country is not already in the arr (meaning it's a new country entry), the code creates a new object with the country and emoji properties taken from the current city. It then adds this new object to the arr using the spread operator [...arr].
    else return arr;
    // If the city.country is already present in the arr (meaning it's a duplicate country entry), the code does not add anything to the arr.
  }, []);
  // In summary, the code takes an array of cities, and from that, it creates a new array containing unique country entries along with their respective emojis. The code filters out duplicate country entries, ensuring that each country appears only once in the countries array.

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountriesList;
// 1- npm i json server
// 2- open package.json
// 3- "scripts" => "server": "json-server --watch data/cities.json --port 9000 --delay 500"
// 4- npm run server
