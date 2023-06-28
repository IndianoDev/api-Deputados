import Pagina from '@/components/Pagina'
import React from 'react'
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap'
import apiDeputados from '@/services/apiDeputados'

const index = ({ deputado }) => {

  return (
    <Pagina titulo= 'Camâra dos Deputados'>

      <Card className='g-4'>
        <Card.Body>
          <Card.Text>
            É importante questionar o quanto a hegemonia do ambiente político não pode mais se dissociar das condições políticas e governamentais exigidas. Ainda assim, existem dúvidas a respeito de como a contínua implementação de obras garante a contribuição de um grupo importante na determinação de todos os recursos públicos envolvidos. Percebemos, cada vez mais, que o início da atividade geral de formação de atitudes maximiza as possibilidades por conta dos níveis de motivação da sociedade. O cuidado em identificar as demandas dos eleitores a crescente influência da mídia desafia a capacidade de equalização das regras de conduta normativas.
          </Card.Text>
        </Card.Body>
      </Card>
      <br></br>



      <Carousel xs={1} md={2} lg={4} className="g-4 justify-content-center">

        <Carousel.Item>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
            <Card style={{ width: '40rem', height: 'auto' }} >
              <img
                className="d-block w-30"
                src="https://classic.exame.com/wp-content/uploads/2023/01/camara.jpg?quality=70&strip=info&w=1024"
              />
            </Card>
          </Row>
        </Carousel.Item>


        <Carousel.Item>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
            <Card style={{ width: '40rem', height: 'auto' }} >
              <img
                className="d-block w-30"
                src="https://www.camara.leg.br/midias/image/2021/01/cupula-da-camara-dos-deputados-763x607.jpg"
              />
            </Card>
          </Row>
        </Carousel.Item>


        <Carousel.Item>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
            <Card style={{ width: '40rem', height: 'auto' }} >
              <img
                className="d-block w-30"
                src="https://static.poder360.com.br/2023/04/fachada-cldf-Renato-Araujo-GDF-24-jan-2019-scaled-e1683210321560-848x477.jpg"
              />
            </Card>
          </Row>
        </Carousel.Item>


        <Carousel.Item>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
            <Card style={{ width: '40rem', height: 'auto' }} >
              <img
                className="d-block w-30"
                src="https://s2.glbimg.com/TmNMQKVYiA3Axw_LCbnpSpzl9Y8=/0x0:1280x852/984x0/smart/filters:strip_icc()/s.glbimg.com/jo/g1/f/original/2018/05/02/whatsapp_image_2018-05-02_at_06.09.23_1.jpeg"
              />
            </Card>
          </Row>
        </Carousel.Item>


        <Carousel.Item>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
            <Card style={{ width: '40rem', height: 'auto' }} >
              <img
                className="d-block w-30"
                src="https://admin.folhadirigida.com.br/filemanager/files/noticias/Fotos/CLDF_Foto_Bruna_Somma.jpeg"
              />
            </Card>
          </Row>
        </Carousel.Item>



      </Carousel>

    </Pagina>
  )
}

export default index

export async function getServerSideProps(context) {


  const res = await apiDeputados.get('/deputados/')
  const deputado = res.data.dados


  return {
    props: { deputado },
  }
}