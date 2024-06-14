import React from 'react'
import Buscador from './Buscador';
import { useState, useEffect } from 'react';

function Api_Amiibo() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    const url = "https://www.amiiboapi.com/api/amiibo";

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data.results);
            setLoading(false);
        } catch (error) {
            console.error('error 1 ------->', error);
            setError(error);
            setLoading(false);
        }}

        const filteredData = data.filter(amiibo => amiibo.character.toLowerCase().includes(query.toLowerCase()))
        const sortedData =filteredData.sort((a,b) => a.character.localeCompare(b.character))

        if (loading) {
            return ( <div>loading</div>)
        }

        if (error) {
            return ( <div>ERROR: {error.message} </div>)
        }

  return (
    <div>

        <h2>Amiibo List</h2>
        <Buscador 
            query = {query}
            setQuery = {setQuery}/>
        <ul>
        {filteredData.map((amiibo) =>(
            <li key={amiibo.character}>{amiibo.character}</li>
        ))}
        </ul>

    </div>
  )
}

export default Api_Amiibo