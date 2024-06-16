import React, { useState, useEffect } from 'eact';
import axios from 'axios';
import { useParams, Link } from 'eact-router-dom';

const DrugPage = () => {
  const { drugName } = useParams();
  const [drug, setDrug] = useState(null);
  const [ndcs, setNDCs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs/${drugName}`);
        setDrug(response.data.drug);
        const rxcui = response.data.drug.rxcui;
        const ndcResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs`);
        setNDCs(ndcResponse.data.ndcList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [drugName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{drug.name}</h1>
      <p>RXCUI: {drug.rxcui}</p>
      <p>Synonyms: {drug.synonyms.join(', ')}</p>
      <h2>NDCs:</h2>
      <ul>
        {ndcs.map(ndc => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
      <Link to="/drugs/search">Back to search</Link>
    </div>
  );
};

export default DrugPage;