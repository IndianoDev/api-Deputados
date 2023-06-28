import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados';
import React from 'react'


const partidos = (props) => {
console.log(props)
   
  return (
    <Pagina>
   
   <Carousel>
      
      
      <Carousel.Item>
        <img
          className="d-block w-30"
          src={"https://www.camara.leg.br/internet/Deputado/img/partidos/AL.gif"}
          alt="First slide"
        />
      </Carousel.Item>

      </Carousel>
    </Pagina>
  )
}


export default partidos;

export async function getServerSideProps(context){

  const id = context.params.id

  const res = await apiDeputados.get ('/partidos/' + id)
  const partidos = res.data.dados

  return{
    props: { partidos },
  }
}