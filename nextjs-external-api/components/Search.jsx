import React, {useState, useEffect} from "react";
import cities from "../lib/city.list.json";
import Link from "next/link";
import Router from "next/router";
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/Search.module.scss';



export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const clearQuery = () => setQuery("");
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 2) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
          continue;
        }
      }
    }

    return setResults(matchingCities);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder="Search Location"
      />
      <SearchIcon className={styles.search__icon}  />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => {
              return (
                <li key={city.slug}>
                  <Link href={`/location/${city.slug}`}>
                    
                    <a>
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}{" "}
                      <span>({city.country})</span>
                    </a>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className={styles.search__noResults}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}