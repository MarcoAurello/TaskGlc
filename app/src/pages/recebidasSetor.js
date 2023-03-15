import { Box, Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, SpeedDial } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import TaskItem from '../components/task-item'
import { display } from "@mui/system";
import MinhasAtividades from "./minhasAtividades";


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



            // setUsuariosNaoValidados(data.data)
          }
        })
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


  // function checarIniciado(){
  //   minhasAtividades.reduce((count, item) =>{
  //     if(item.Status.nome == 'Iniciado'){
  //       count ++
  //       if(count > 1){
  //         return alert('O ideal é apenas uma tarefa com Status INICIADO')
  //       }


  //     }
  //     return count

  //   })
  // }

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

    if (pesquisa) {
      pesquisar()
    }




  }, [pesquisa])













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

        <Box sx={{ maxWidth: 320 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Buscar por funcionario</InputLabel>

            <Select labelId="demo-simple-select-label"
              id="demo-simple-select"
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

          <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 20 }}>
            
            <tbody>
              {respostas.map((item, index) =>

                <tr key={index}>
                  <th scope="row">Titulo: {item.titulo}<br></br> Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br>
                  </th>
                  <th>
                    <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                      ver
                    </Button>
                  </th>


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
          Todas do seu Setor<br></br>

        </div>

      </center>

      {meuSetor ?
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