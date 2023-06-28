import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Cabecalho from './Cabecalho'
import { Container } from 'react-bootstrap';
import { RiHome2Line, RiNewsLine, RiUserLine, RiBuilding2Line } from 'react-icons/ri';

const Pagina = (props) => {

    return (
        <>
            <Cabecalho />
            <div className='bg-light text-muted py-1 text-center mb-3'>
           
            <h1>{props.titulo}</h1>
            </div>
            
            <Container className='mb-5'>
                {props.children}
            </Container>

         
        </>
    )
}

export default Pagina