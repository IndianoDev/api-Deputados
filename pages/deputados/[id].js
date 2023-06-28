import React from 'react';
import { Accordion, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BarController, BarElement, CategoryScale, Chart, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Pagina from '../../components/Pagina';
import Rodape from '@/components/Rodape';
import apiDeputados from '../../services/apiDeputados';
import { format } from 'date-fns'; 

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip);

const Detalhes = ({ deputado, despesasDeputado }) => {
  const formatarCPF = (cpf) => {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    return cpf.replace(cpfRegex, '$1.$2.$3-$4');
  };

  const exportarParaExcel = async () => {
    const despesasData = despesasDeputado.map((item) => [
      item.dataDocumento,
      item.tipoDespesa,
      `R$${item.valorDocumento}`,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      ['Data', 'Descrição', 'Valor'],
      ...despesasData,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Despesas');

    const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'despesas.xlsx');
  };

  const despesasDatas = despesasDeputado
    .map((item) => format(new Date(item.dataDocumento), 'dd/MM/yyyy'))
    .sort((a, b) => new Date(a) - new Date(b));

  const despesasValores = despesasDeputado.map((item) => item.valorDocumento);

  const data = {
    labels: despesasDatas,
    datasets: [
      {
        label: 'Despesas',
        data: despesasValores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pagina>

<Row>

<Col md={3}>
  <Card border="success" style={{ width: '16rem' }}>
    <Card.Header className=' bg-success'></Card.Header>
    <Card.Img variant="top" src={deputado.ultimoStatus.urlFoto} />


  </Card>
</Col>

<Col md={9}> 
  <Card border="success" style={{ width: '50rem' }}>
  <Card.Header className=' bg-success'></Card.Header>
  <Container>
    <p><strong>Nome: {deputado.nomeCivil}</strong></p>
    <p><strong>CPF: {deputado.cpf}</strong></p>
    <p><strong>Data de Nascimento: {deputado.dataNascimento}</strong></p>
    <p><strong>Naturalidade: {deputado.municipioNascimento} - {deputado.ufNascimento}</strong></p>
    <p><strong>Escolaridade: {deputado.escolaridade}</strong></p>
    <p><strong>Partido: {deputado.ultimoStatus.siglaPartido}</strong></p>
    <p><strong>Condição Eleitoral: {deputado.ultimoStatus.condicaoEleitoral}</strong></p>
    <p><strong>Situação: {deputado.ultimoStatus.situacao}</strong></p>
    </Container>
  </Card>
</Col>
</Row>
<br></br>
<Row md={2}>
<Container>
<Accordion eventKey="0" className='pt-1 bg-success  pb-10' >
  <Accordion.Item eventKey="0" >
    <Accordion.Header>Gabinete</Accordion.Header>
    <Accordion.Body>
      <p><strong>Nome: {deputado.ultimoStatus.gabinete.nome}</strong></p>
      <p><strong>Predio: {deputado.ultimoStatus.gabinete.predio}</strong></p>
      <p><strong>Sala: {deputado.ultimoStatus.gabinete.sala}</strong></p>
      <p><strong>Andar: {deputado.ultimoStatus.gabinete.andar}</strong></p>
      <p><strong>Telefone: {deputado.ultimoStatus.gabinete.telefone}</strong></p>
      <p><strong>Email: {deputado.ultimoStatus.gabinete.email}</strong></p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
</Container>

        <div className='mt-5 variant=center'>
          <Bar data={data} plugins={[{ plugin: Tooltip }]} /> {/* Adicione Tooltip */}
        </div>
      </Row>

      <Row md={2}>
      </Row>

      <Row>
        <Col md={12} className='pt-5 pb-10'>
          <Card>
            <Card.Header>Despesas</Card.Header>
            <Card.Body>
              <Table striped>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {despesasDeputado.map(item => (
                    <tr key={item.id}>
                      <td>{item.dataDocumento}</td>
                      <td>{item.tipoDespesa}</td>
                      <td> R${item.valorDocumento}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className='d-flex justify-content-center'>
                <Button
                  variant="outline-success"
                  className='d-flex align-items-center'
                  onClick={exportarParaExcel}
                >
                  <RiFileExcel2Line className="me-2" />
                  Exportar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Rodape />
    </Pagina>
  )
}

export default Detalhes;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/deputados/" + id);
  const deputado = resultado.data.dados;

  const despesas = await apiDeputados.get("/deputados/" + id + "/despesas");
  const despesasDeputado = despesas.data.dados;

  return {
    props: {
      deputado,
      despesasDeputado,
    },
  };
}
