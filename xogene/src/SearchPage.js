import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    if (searchTerm) {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs/search?name=${searchTerm}`);
        if (response.data.termResults && response.data.termResults.length > 0) {
          history.push(`/drugs/${response.data.termResults[0].name}`);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    } else {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions?term=${searchTerm}`);
        if (response.data.suggestions && response.data.suggestions.length > 0) {
          setSuggestions(response.data.suggestions);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map(suggestion => (
            <li key={suggestion} onClick={() => setSearchTerm(suggestion)}>{suggestion}</li>
          ))}
        </ul>
      )}
      {error && <div>No results found</div>}
    </div>
  );
};

export default SearchPage;