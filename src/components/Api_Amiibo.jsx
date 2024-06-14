//Importaciones que se necesitan para el funcionamiento de la API y su visualización
import React from 'react'
import Buscador from './Buscador';
import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import logoAmiibo from '../assets/Amiibo_logo.png';
import '../card.css'

//FUNCION PRINCIPAL
function Api_Amiibo() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(100);

    //URL de la API que se ocupa para el desafio
    const url = "https://www.amiiboapi.com/api/amiibo";

    useEffect(() => {
        getData();
    }, []);

    //Funcion que se ocupa para recorrer la API (con el detector de errores y loading)
    const getData = async () => {
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result);
            setData(result.amiibo || []);
            setLoading(false);
        } catch (error) {
            console.error('error 1 ------->', error);
            setError(error);
            setLoading(false);
        }}

        //Filtrado de la API para que no me muestre todo.
        const filteredData = Array.isArray(data) ? data.filter(amiibo => amiibo.character.toLowerCase().includes(query.toLowerCase()) && amiibo.type === "Figure"):[];

        // Eliminar del render los "characters" que se duplican.
    const uniqueData = [];
    const seenCharacters = new Set();

    for (const amiibo of filteredData) {
        if (!seenCharacters.has(amiibo.character)) {
            uniqueData.push(amiibo);
            seenCharacters.add(amiibo.character);
        }
    }

    // Limitar el número de elementos que se muestran en el Render
    const limitedData = uniqueData.slice(0, limit);

        if (loading) {
            return ( <div>loading</div>)
        }

        if (error) {
            return ( <div>ERROR: {error.message} </div>)
        }


  return (
    <div>


<Container> {/* Este es el RENDER que se muestra en el Navegador */}
           
            <div style={{ position: 'relative', display: 'inline-block', width: '100%', padding: '30px' }}>
                <img 
                    src={logoAmiibo} 
                    alt="Search Icon" 
                    style={{width: '200px'}} 
                />
                <Buscador 
                    query={query}
                    setQuery={setQuery}
                />
            </div>
            
            <Row>
                {limitedData.map((amiibo) => (
                    <Col key={amiibo.head + amiibo.tail} md={4} lg={3}>
                        <Card className='cardStyle' style={{ marginBottom: '20px' }}>
                            <Card.Img variant="top" src={amiibo.image} />
                            <Card.Body>
                                <Card.Title>
                                <strong>{amiibo.character}</strong></Card.Title>
                                <Card.Text>
                                    <strong>Game:</strong> {amiibo.gameSeries} <br />
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

    </div>
  )
}

export default Api_Amiibo