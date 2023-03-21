import { Box, Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'

import { Chart } from "react-google-charts";
import { fontSize } from "@mui/system";



const getCookie = require('../utils/getCookie')

const RecebidasSetor = (props) => {
  const { logged } = props
  const [contador, setContador] = useState(0)
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)


  const [meuSetor, setMeuSetor] = useState([])
  const [openMsg, setOpenMsg] = useState(false);
  const [usuarioExecutor, setusuarioExecutor] = useState([])
  const [pesquisa, setFKUsuarioExecutor] = useState('')
  const [respostas, setRespostas] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('')

  const [status, setStatus] = useState([])



  function carregarAtividadesDoSetor() {
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/recebidasSetor/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          if (status === 401) {
          } else if (status === 200) {

            // alert(JSON.stringify(data.data))

            setMeuSetor(data.data)

          }
        })
      })


  }

  function carregarStatus() {
    // setOpenLoadingDialog(true)
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/status/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)

          if (status === 401) {

          } else if (status === 200) {
            setStatus(data.data)
            // alert("3")
            // alert(JSON.stringify(data))

          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  function carregarFuncionarios() {
    // setOpenLoadingDialog(true)
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuarioAtividade/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)

          if (status === 401) {
            // alert(status)
          } else if (status === 200) {
            setusuarioExecutor(data.data)
            // filtrarUsuariosDemandados()

          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }




  function pesquisar() {


    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    // fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade${pesquisa?`/search?&pesquisa=${pesquisa}` : ''
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/search?pesquisa=${pesquisa}`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          // setOpenLoadingDialog(false)

          if (status === 401) {
            // alert(status)
          } else if (status === 200) {
            // alert(pesquisa)
            // alert(JSON.stringify(data.data))
            setRespostas(data.data)
            // alert(JSON.stringify(respostas))
            // filtrarUsuariosDemandados()

          }
        }).catch(err => console.log(err))
      })
  }


  useEffect(() => {
    carregarAtividadesDoSetor()
    carregarFuncionarios()
    carregarStatus()

    if (pesquisa) {
      pesquisar()
    }

  }, [pesquisa])


  const data = [
    
    ["Status", '11111'],
    ["Iniciadas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Iniciado', 0)],
    ["Em Aberto", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Aberto', 0)],
    ["Para iniciar", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Planejado para Iniciar', 0)],
    ["Concluidas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Concluido', 0)],
    ["Canceladas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Cancelado', 0)],
    ["Pendentes", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Pendente', 0)],
    ["Paradas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Parado', 0)],
    ["Todas do Setor", meuSetor.length],

  ];
  const data1 = [
    ["Classificação ", ''],
    ["Circunstancial", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Circunstancial', 0)],
    ["Não Definido", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Não Definido', 0)],
    ["Importante", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Importante', 0)],
    ["Urgente", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Urgente', 0)],
    ["Execução Imediata", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Execução Imediata', 0)],
   

  ];


  const options = {
    title: "Status todas Atividades Recebidas",
    chartArea: { width: "50%" },
    bar: { groupWidth: "85%" },
    legend: { position: "none" },

  };

  const options1 = {
    title: "Classificação todas Atividades Recebidas",
    is3D: true,


  };


  const dataFuncionario = [

    ["Status", 'funcionario selecionado'],
    ["Iniciadas", respostas.reduce((contador, item) => contador += item.Status.nome === 'Iniciado', 0)],
    ["Em Aberto", respostas.reduce((contador, item) => contador += item.Status.nome === 'Aberto', 0)],
    ["Para iniciar", respostas.reduce((contador, item) => contador += item.Status.nome === 'Planejado para Iniciar', 0)],
    ["Concluidas", respostas.reduce((contador, item) => contador += item.Status.nome === 'Concluido', 0)],
    ["Canceladas", respostas.reduce((contador, item) => contador += item.Status.nome === 'Cancelado', 0)],
    ["Pendentes", respostas.reduce((contador, item) => contador += item.Status.nome === 'Pendente', 0)],
    ["Paradas", respostas.reduce((contador, item) => contador += item.Status.nome === 'Parado', 0)],
    
  ];
  const optionFuncionario = {
    title: "Status funcionario selecionado",
   
    chartArea: { width: "50%" },
    bar: { groupWidth: "85%" },
    legend: { position: "none" },

  };

  const dataClassFuncionario = [
    ["Classificação ", ''],
    ["Circunstancial", respostas.reduce((contador, item) => contador += item.Classificacao.nome === 'Circunstancial', 0)],
    ["Não Definido", respostas.reduce((contador, item) => contador += item.Classificacao.nome === 'Não Definido', 0)],
    ["Importante", respostas.reduce((contador, item) => contador += item.Classificacao.nome === 'Importante', 0)],
    ["Urgente", respostas.reduce((contador, item) => contador += item.Classificacao.nome === 'Urgente', 0)],
    ["Execução Imediata", respostas.reduce((contador, item) => contador += item.Classificacao.nome === 'Execução Imediata', 0)],
    

  ];


  const optionsClassFuncionario = {
    title: "Classificação Atividades do funcionario",
    is3D: true,

  };





  return (
    <div>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        type="text/css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous"
      />


      {logged ? <TaskFilter nome={props.logged.nome} />
        :
        ''
      }
      <center>


        <Box scope='row' sx={{ maxWidth: 420 }}>
          <FormControl fullWidth scope='row'>
            <InputLabel id="demo-simple-select-label">Buscar por funcionario</InputLabel>

            <Select labelId="demo-simple-select-label"
              id="demo-simple-select" style={{ maxWidth: 310, marginBottom: 10 }}
              onChange={e => setFKUsuarioExecutor(e.target.value)} placeholder='Selecione o executor'>

              {
                usuarioExecutor.map((user, key) => <MenuItem name={user.nome} value={user.id} >
                  {user.nome}</MenuItem>)
              }

            </Select>
          </FormControl>

        </Box>
        <p></p>
        {respostas ?
          <div>

            <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 10 }}>

              {respostas != '' ?

                
                <tbody style={{ color: 'red', fontSize: 15, marginLeft: 100, marginRight: 50, padding: 50, backgroundColor: '#D1EDFA' }}>

                  <tr style={{ marginLeft: 100, marginRight: 50, padding: 50 }}>
                    <td>
                      

                      <Chart style={{ fontSize: 8 }}
                        
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={dataFuncionario}
                        options={optionFuncionario}
                      />

                      <Chart style={{ fontSize: 8 }}
                       chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={dataClassFuncionario}
                        options={optionsClassFuncionario}
                      />




                    </td>
                    
                  </tr>





                  <div style={{fontSize:15}}>Lista de atividades do funcionario selecionado</div>
                </tbody>
                : ''}



              <tbody >
                 

                {respostas.map((item, index) =>


                  <tr key={index}>

                    
                    <th scope="row">Titulo: {item.titulo}<br></br> Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br>
                      Situação: {item.Status.nome}
                      <br></br>
                      <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                        ver chamado
                      </Button></th>



                  </tr>)}

              </tbody>


            </table>
            <hr></hr>
          </div>


          :
          ''
        }


        <div style={{
          fontSize: 24, fontWeight: 'bold',
          marginBottom: 4, marginRight: 8, paddingLeft: 5, alignItems: 'center'
        }}>
          Todas Recebidas do seu Setor<br></br>

        </div>

      </center>


      {pesquisa != '' || filtroStatus === '' ?
        <div>
          <Chart style={{ fontSize: 8 }}
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
          <Chart style={{ fontSize: 8 }}
           chartType="PieChart"
            width="100%"
            height="400px"
            data={data1}
            options={options1}
          />

          <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 20 }}>
            {/* <thead>
          <th>titulo</th>
          <th>ver Atividade</th>
        </thead> */}
            <tbody>





              {meuSetor.map((item, index) =>
                <tr key={index}>
                  <th scope="row">Titulo: {item.titulo}<br></br> Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br> </th>
                  <th scope="row">{item.Status.nome === "Iniciado" || item.Status.nome === "Aberto" ||
                    item.Status.nome === "Planejado para Iniciar" ? <div style={{ color: 'green' }}>Na lista de Execução: {item.Status.nome}</div> :
                    <div style={{ color: 'red' }}>Fora da lista de Execução:  {item.Status.nome}</div>} </th>
                  <th>
                    <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                      ver
                    </Button>
                  </th>


                </tr>)}

            </tbody>
          </table>
        </div>

        :
        ''
      }




      <SpeedDial
        ariaLabel="Nova Tarefa"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<EditIcon />}
        onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}
      />


      <Dialog open={openMsg}  >

        <DialogContent>


          <h2>Informe o motivo da alteração do Status</h2>

          {/* {classificacao == "Não Definido" && status == "Aberto" ?
    <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>{'Encaminhar chamado'}</Button>
    </div> : ''

  } */}

        </DialogContent>

      </Dialog>





    </div>
  );
};

export default RecebidasSetor;