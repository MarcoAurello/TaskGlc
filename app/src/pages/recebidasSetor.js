import { Box, Button, Dialog, DialogContent, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";

import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'

import { Chart } from "react-google-charts";
import { fontSize } from "@mui/system";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const getCookie = require('../utils/getCookie')

const RecebidasSetor = (props) => {
  const { logged } = props
  const [contador, setContador] = useState(0)
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)



  const [meuSetor, setMeuSetor] = useState([])
  const [openMsg, setOpenMsg] = useState(false);
  const [usuarioExecutor, setusuarioExecutor] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const [respostas, setRespostas] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('')

  const [status, setStatus] = useState([])
  const [clasificacao, setClassificacao] = useState([])
  const [chek, setChek] = useState('')



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

  function carregarClassificacao() {
    // setOpenLoadingDialog(true)
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/classificacao/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)

          if (status === 401) {

          } else if (status === 200) {
            setClassificacao(data.data)
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
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/searchRecebidos?pesquisa=${pesquisa}`, params)
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
    carregarClassificacao()


    if (pesquisa) {
      pesquisar()
      // alert(pesquisa)
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
    // ["Todas do Setor", meuSetor.length],

  ];
  const options = {
    title: "Status todas Atividades Recebidas",
    is3D: true,

  };

  const data1 = [
    ["Classificação ", ''],
    ["Circunstancial", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Circunstancial', 0)],
    ["Não Definido", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Não Definido', 0)],
    ["Importante", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Importante', 0)],
    ["Urgente", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Urgente', 0)],
    ["Execução Imediata", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Execução Imediata', 0)],


  ];
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
    is3D: true,

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
        {/* <FormControl  >
          <FormLabel id="demo-radio-buttons-group-label"><b> Pesquisar por:</b></FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value='funcionario' onChange={e => setChek(e.target.value)} control={<Radio />} label="Funcionario" />
            <FormControlLabel value='status' onChange={e => setChek(e.target.value)} control={<Radio />} label="Status" />
            <FormControlLabel value="clasificacao" onChange={e => setChek(e.target.value)} control={<Radio />} label="Classificação" />
          </RadioGroup>
        </FormControl> */}
         <Box scope='row' sx={{ maxWidth: 420 }}>
        <FormControl  fullWidth sx={{ m: 1, minWidth: 320 }} error>
       
          <InputLabel id="demo-simple-select-error-label">Pesquisar por</InputLabel>
          <Select
           
            id="demo-simple-select"
            value={chek}
            label="Age"
            onChange={e => setChek(e.target.value)}
          >
            <MenuItem value={'funcionario'}>Funcionarios</MenuItem>
            <MenuItem value={'status'}>Status</MenuItem>
            <MenuItem value={"clasificacao"}>Classificação</MenuItem>
          </Select>
          
        </FormControl>
        </Box>


        {chek === 'funcionario' ? <div><br></br>
          <Box scope='row' sx={{ maxWidth: 420 }}>
            <FormControl fullWidth scope='row'>
              <InputLabel id="demo-simple-select-label">Buscar por funcionario</InputLabel>

              <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={e => setPesquisa(e.target.value)} placeholder='Selecione o executor'>

                {
                  usuarioExecutor.map((user, key) => <MenuItem name={user.nome} value={user.id} >
                    {user.nome}</MenuItem>)
                }

              </Select>
            </FormControl>

          </Box>

        </div> : ''}

        {chek === 'status' ? <div><br></br>
          <Box scope='row' sx={{ maxWidth: 420 }}>
            <FormControl fullWidth scope='row'>
              <InputLabel id="demo-simple-select-label">Buscar por Status</InputLabel>

              <Select labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={e => setPesquisa(e.target.value)} >

                {
                  status.map((user, key) => <MenuItem name={user.nome} value={user.id} >
                    {user.nome}</MenuItem>)
                }

              </Select>
            </FormControl>

          </Box>

        </div> : ''}


        {chek === 'clasificacao' ? <div><br></br>
          <Box scope='row' sx={{ maxWidth: 420 }}>
            <FormControl fullWidth scope='row'>
              <InputLabel id="demo-simple-select-label">Buscar por Clasificaçao</InputLabel>

              <Select labelId="demo-simple-select-label"
                id="demo-simple-select" 
                onChange={e => setPesquisa(e.target.value)} >

                {
                  clasificacao.map((user, key) => <MenuItem name={user.nome} value={user.id} >
                    {user.nome}</MenuItem>)
                }

              </Select>
            </FormControl>

          </Box>

        </div> : ''}
        </center>





      <p></p>

      <div>




        {chek === 'funcionario' && pesquisa != '' ?
          <div>
            <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 10, width: '100%' }}>


             
                   {respostas.map((item, index) =>


                <tr key={index}>


                  <th scope="row" style={{ wordBreak: "break-all" }} >Titulo: {item.titulo}<br></br> Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br>
                    Situação: {item.Status.nome}
                    <br></br>
                    <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                      ver Atividade
                    </Button></th>



                </tr>)}

                <tr style={{ marginLeft: 100, marginRight: 50, padding: 50 }}>
                  <td>


                    <Chart style={{ fontSize: 8 }}

                      chartType="PieChart"
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

              

           

            </table>
          </div>
          : ''}

        {chek === 'status' || chek === 'clasificacao' ?
          <div >

            <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 10, width: '100%' }}>

              {respostas.map((item, index) =>
                <tr key={index}>
                  <th style={{ wordBreak: "break-all" }} scope="row">Titulo: {item.titulo}<br></br> Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br> </th>
                  <th scope="row">{item.Status.nome === "Iniciado" || item.Status.nome === "Aberto" ||
                    item.Status.nome === "Planejado para Iniciar" ? <div style={{ color: 'green' }}>Na lista de Execução: {item.Status.nome}</div> :
                    <div style={{ color: 'red' }}>Fora da lista de Execução:  {item.Status.nome}</div>} </th>
                  <th>
                    <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                      ver
                    </Button>
                  </th>


                </tr>)}
            </table>


          </div >
          : ''}










        <hr></hr>
      </div >




      {
        chek === '' ?


          <div><center><h1>Todas recebidas do Setor</h1></center>
            

            <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 20 }}>

              <tbody>





                {meuSetor.map((item, index) =>
                  <tr key={index}>
                    <th scope="row"  style={{ wordBreak:"break-all"}}>Titulo: {item.titulo}<br></br> Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br> </th>
                    <th scope="row">{item.Status.nome === "Iniciado" || item.Status.nome === "Aberto" ||
                      item.Status.nome === "Planejado para Iniciar" ? <div style={{ color: 'green' }}>Na lista de Execução: {item.Status.nome}</div> :
                      <div style={{ color: 'red' }}>Fora da lista de Execução:  {item.Status.nome}</div>} </th>
                    <th>
                      <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                        ver
                      </Button>
                    </th>


                  </tr>)}<p></p>
                  

              </tbody>
            </table>
            <Chart style={{ fontSize: 8 }}
              chartType="PieChart"
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
          </div>
          : ''
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


        </DialogContent>

      </Dialog>





    </div >
  );
};

export default RecebidasSetor;