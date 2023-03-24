import { Box, Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import TaskItem from '../components/task-item'
import { display } from "@mui/system";
import MinhasAtividades from "./minhasAtividades";
import { Chart } from "react-google-charts";


const getCookie = require('../utils/getCookie')

const SolicitadasSetor = (props) => {
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


  function carregarAtividadesDoSetor() {
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/solicitadasSetor/`, params)
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
    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/searchSolicitadas?pesquisa=${pesquisa}`, params)
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

    ["Status", ''],
    ["Iniciadas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Iniciado', 0)],
    ["Em Aberto", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Aberto', 0)],
    ["Para iniciar", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Planejado para Iniciar', 0)],
    ["Concluidas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Concluido', 0)],
    ["Canceladas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Cancelado', 0)],
    ["Pendentes", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Pendente', 0)],
    ["Paradas", meuSetor.reduce((contador, item) => contador += item.Status.nome === 'Parado', 0)],
    
  ];
  // const data1 = [
  //   ["Classificação ", ''],
  //   ["Circunstancial", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Circunstancial', 0)],
  //   ["Não Definido", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Não Definido', 0)],
  //   ["Importante", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Importante', 0)],
  //   ["Urgente", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Urgente', 0)],
  //   ["Execução Imediata", meuSetor.reduce((contador, item) => contador += item.Classificacao.nome === 'Execução Imediata', 0)],
   

  // ];
  const options = {
    title: "Status Atividades Solicitadas",
    is3D: true,
    sliceVisibilityThreshold: .2

    

  };
  // const options1 = {
  //   title: "Classificação Atividades Solicitadas",
  //   is3D: true,

  // };



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



        <p></p>
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
          <p></p>

          {pesquisa === '' ?
          <div>
                <div style={{
          fontSize: 24, fontWeight: 'bold',
          marginBottom: 4, marginRight: 8, paddingLeft: 5, alignItems: 'center'
        }}>
          <Chart style={{ fontSize: 8 }}
            chartType="PieChart"
            width="200px%"
            height="200px"
            data={data}
            options={options}
           
          />
          {/* <Chart style={{ fontSize: 8 }}
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data1}
            options={options1}
          /> */}
          Todas Solicitadas pelo seu setor<br></br>

        </div>
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
           
           <div>
              <div style={{
          fontSize: 24, fontWeight: 'bold',
          marginBottom: 4, marginRight: 8, paddingLeft: 5, alignItems: 'center'
        }}>
          {/* <Chart style={{ fontSize: 8 }}
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
          /> */}
          Solicitadas Por Status<br></br>

        </div>
           <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 20 }}>
       {/* <thead>
         <th>titulo</th>
         <th>ver Atividade</th>
       </thead> */}
       <tbody>

         {respostas.map((item, index) =>
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
         </div>}

    


      </center>



      






      <SpeedDial
        ariaLabel="Nova Tarefa"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<EditIcon />}
        onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}
      />







    </div>
  );
};

export default SolicitadasSetor;