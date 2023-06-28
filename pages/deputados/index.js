import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import { Card, Col, Container, Dropdown, Form, Row } from 'react-bootstrap'



  const index = ({ deputados }) => {

    const [searchValue, setSearchValue] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [unidadesFederativas, setUnidadesFederativas] = useState([]);
  
  
  
    // Filtra a lista de deputados com base no valor da pesquisa e no filtro selecionado
    const filteredDeputados = deputados.filter(item =>
      item.nome.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedFilter === '' || item[selectedFilter] === selectedValue || selectedValue === '')
    );
  
    // Atualiza o valor da pesquisa quando o usuário digita no campo de pesquisa
    const handleSearchChange = (e) => {
      setSearchValue(e.target.value);
    };
  
   
  
    const fetchDeputados = async (searchValue, filter, value) => {
      try {
        const resultado = await apiDeputados.get('/deputados', {
          params: {
            nome: searchValue,
            [filter]: value
          }
        });


        const deputadosPesquisados = resultado.data.dados;
        setDeputados(deputadosPesquisados);
          } catch (error) {
            console.error(error);
          }
        };

    return (
      <Pagina titulo='Deputados'>

      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchValue}
          onChange={handleSearchChange}
          style={{ marginBottom: "53px" }}
        />
        
      </Form>

        
           <Row md={4} xs={1} className="g-4">
    
               {filteredDeputados.map(item => (
                  <Col>
                      <Card>
                         <Card.Img variant="top"  src={item.urlFoto} class="rounded"></Card.Img>
                         <Card.Body className='bg-success rounded-bottom'>
                               <Card.Title>{item.nome}</Card.Title>
                               <Container>
                               <Link className='btn btn-success ms-5' href={'/deputados/' + item.id}>Detalhes</Link>
                               </Container>
                         </Card.Body>

                     </Card>
                   </Col>
    
                ))}
            </Row>
  
        </Pagina>
     )
}

export default index

export async function getServerSideProps(context){

  const resultado = await apiDeputados.get ('/deputados/')
  const deputados = resultado.data.dados

  return{
    props: { deputados },
  }
}