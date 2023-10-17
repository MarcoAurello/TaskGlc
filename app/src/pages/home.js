import { Button, FormControl, InputAdornment,Dialog,DialogContent, InputLabel, MenuItem, Select, SpeedDial, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';

import { Box } from "@mui/system";




const getCookie = require('../utils/getCookie')




const Home = (props) => {
  const { logged } = props
  const [pesquisa, setPesquisa] = useState('')
  const [respostas, setrespostas] = useState([])
  const [setor, setSetor] = useState([])
  // alert(JSON.stringify(props.logged))
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [checked, setChecked] = React.useState(false);
  const [fkArea, setfkArea] = useState('')
  const [subarea, setSubArea] = useState([])
  const [meuSetor, setMeuSetor] = useState([])
  const [todosEmails, setEmails] = useState([])
  const [emailNaoEncontrado, setEmailNaoEncontrado]=useState(false)




  //  const nome = Logged.Perfil.nome;
  const [minhasAtividades, setMinhasAtividades] = useState([])
  const [solicitacaoAtividades, setSolicitacaoAtividades] = useState([])
  const [nomeUsuario, setNomeUsuario] = useState('')
  const [minhas, setMinhas] = useState(true);
  // const [fkUnidade, setFkUnidade]= useState(props.logged.Area.fkUnidade)



  function carregarSolicitacaoAtividades() {
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/chamadosAbertos/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          if (status === 401) {
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))

            setSolicitacaoAtividades(data.data)

            // alert('oi ' +JSON.stringify( minhasAtividades))
            // setUsuariosNaoValidados(data.data)
          }
        })
      })


  }

  function carregarAtividadesDoSetor() {
    setOpenLoadingDialog(true)
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
          setOpenLoadingDialog(false)
          if (status === 401) {
          } else if (status === 200) {
            setOpenLoadingDialog(false)

            // alert(JSON.stringify(data.data))

            setMeuSetor(data.data)

          }
        })
      })


  }

  function carregarEmails() {
    setOpenLoadingDialog(true)
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/email/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
          } else if (status === 200) {
            setOpenLoadingDialog(false)

            // alert(JSON.stringify(data.data))

            setEmails(data.data)

          }
        })
      })


  }




  function carregarMinhasAtividades() {
    const token = getCookie('_token_task_manager')
    const params = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/minhasAtividades/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          if (status === 401) {
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))

            setMinhasAtividades(data.data)


            // alert('oi ' +JSON.stringify( minhasAtividades))
            // setUsuariosNaoValidados(data.data)
          }
        })
      })


  }
  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  const Change = (event) => {
    setMinhas(event.target.checked);
  }


  useEffect(() => {
    carregarMinhasAtividades()
    carregarSolicitacaoAtividades()
    carregarAtividadesDoSetor()
    carregarEmails()


    if(todosEmails && logged){
      let encontrado = false;
      todosEmails.forEach(emailObj => {
        if (emailObj.email === props.logged.email) {
          encontrado = true;
        }
      });

      if (!encontrado) {
        setEmailNaoEncontrado(true);
      }

    }

  

   

  }, [todosEmails, emailNaoEncontrado])

  useEffect(() => {



    if (pesquisa) {
      pesquisar()
    }
  }, [pesquisa])

  // useEffect(() => {
  //   pesquisa()
  // }, [pesquisa])

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
            setrespostas(data.data)
            // alert(JSON.stringify(respostas))
            // filtrarUsuariosDemandados()

          }
        }).catch(err => console.log(err))
      })
  }

  useEffect(() => {
    function carregarSetor() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/area/?fkUnidade=${logged ? logged.Area.fkUnidade : ''}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
            } else if (status === 200) {
              setSetor(data.data)
              setOpenLoadingDialog(false)

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if (checked) {
      carregarSetor()


    }
  }, [checked])



  useEffect(() => {
    function carregarSubArea() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/subarea/?fkArea=${fkArea}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
            } else if (status === 200) {
              setSubArea(data.data)
              setOpenLoadingDialog(false)

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if (fkArea) {
      carregarSubArea()


    }
  }, [fkArea])






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

      {/* {logged ? <TaskFilter nome={props.logged.email} />
        :
        ''
      } */}
      <center>
        <div >
          {/* <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`} >
            Atividades Recebidas<KeyboardDoubleArrowLeftIcon /><div style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 24 }}>{minhasAtividades.length}</div></Button><br></br>

          <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`} >
            Atividades Solicitadas<KeyboardDoubleArrowRightIcon /><div style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 24 }}>{solicitacaoAtividades.length}</div></Button><br></br> */}

          <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}>Solicitar Atividade</Button><br></br><p></p>

        </div></center>
      <center>

        <div style={{ fontSize: 20, color: '#5499FA' }}>Recebidas  por área
          <Switch
            label="Selecionar por Area"
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }

            }

          />
        </div> <hr></hr>




        {!checked ?
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >
            <TextField fullWidth id="filled-basic" variant="filled"
              label="Pesquise por Protocolo"
              name='pesquisa' value={pesquisa}
              type='number'

              style={{ backgroundColor: '#FFFACD' }}
              onChange={e => setPesquisa(e.target.value)} />
            <p></p>

            {/* <Button type="button" className="btn btn-primary" onClick={(e) => { pesquisar() }}>Buscar </Button> */}



          </Box>

          :
          ''

        }

        {checked ?
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}
          >

            <div style={{ flex: 1, marginBottom: 16 }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-select-small">Área</InputLabel>
                <Select
                  fullWidth

                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="pesquisa"
                  style={{ backgroundColor: '#fff3d1' }}
                  value={pesquisa}>

                  {setor.map((item, index) => <MenuItem key={index} value={item.nome} onClick={() => [setPesquisa(item.nome),
                  setfkArea(item.id)]}>{item.nome}</MenuItem>)}


                </Select><p></p>

              </FormControl>
              {subarea ?
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-select-small">Sub Área </InputLabel>
                  <Select
                    fullWidth

                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="pesquisa"
                    style={{ backgroundColor: '#fff3d1' }}
                    value={pesquisa}>

                    {subarea.map((item, index) => <MenuItem key={index} value={item.nome} onClick={() => setPesquisa(item.nome)}>{item.nome}</MenuItem>)}


                  </Select>
                </FormControl>
                : ''
              }

            </div>
          </Box>

          :
          ''

        }

        {respostas ? <center>
          <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 10, width: '100%' }}>

            <tbody>
              {respostas.map((item, index) =>
                <tr key={index}>
                  <th scope="row" style={{ wordBreak: "break-all" }}>
                    {!item.fkUsuarioExecutor ? <div style={{ color: 'red', size: 28 }}> Executor: &#10067; </div> :
                      <div style={{ color: 'Blue' }}> Executor: {item.UsuarioExecutor.nome}&#128587; </div>}
                    {'Titulo: ' + item.titulo}<br></br>
                    {'Status : ' + item.Status.nome}{item.Status.nome == 'Concluido' ? <a>&#9989;</a> : <a> &#128341;</a>}<br></br>
                    {item.categoria === '' ? '' : 'Categoria : ' + item.categoria}<br></br>


                  </th><br></br>

                  <th>
                    <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                      abrir atividade
                    </Button>
                  </th>

                </tr>)}

            </tbody>
          </table>

        </center> :
          ''
        }




      </center>
      <SpeedDial
        ariaLabel="Nova Tarefa"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<EditIcon />}
        onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}
      />




      <hr></hr>

      {minhas== true ? 
      <div style={{ fontSize: '18px' }}> <center>Minhas Pendências<br></br></center></div>
      :<div style={{ fontSize: '18px' }}> <center>Pêndencias do Setor<br></br></center></div>}
      {meuSetor.length === 0 ?<div style={{color:'red'}}><center>Seu setor não usa o Task Manager para receber e gerenciar tarefas?<br></br>
      Controle por Funcionário, por Status, por criticidade, tudo no celular.<br></br>Habilite essa função com a GTI</center> </div> :""}
      <div></div>
      <table style={{
        backgroundColor: '#FFFACD',
        height: '100%',
        paddingRight: '10px',
        borderCollapse: 'collapse',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
        borderRadius: '10px',
      }}>
        <Checkbox
          id="meu"
          minhas={minhas}
          onChange={Change}
          color="primary"
          inputProps={{ 'aria-label': 'checkbox example' }}
          checked={minhas}
        />
        <label htmlFor="meu" style={{ paddingRight: '10px' }}>Minhas Pendências</label>

      </table><p></p>

      <table className="table table-striped" style={{
        fontFamily: "arial",
        fontSize: '12px',
        marginLeft: 10, marginRight: 20,
        borderCollapse: 'collapse',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '3px',
      }}>

        {minhas === false ?
          <tbody>
            {meuSetor.filter((item) =>  item.Status.nome != "Concluido" && item.Status.nome != "Cancelado" ).map((item, index) =>
              <tr key={index}>

                < th scope="row" style={{ wordBreak: "break-all" }}>Titulo: {item.titulo}<br></br>
                  Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br>
                  Demandante: {item.Usuario.Area.Unidade.nome}<br></br>


                  {item.fkUsuarioExecutor ? <div style={{ color: 'blue' }}>Executor: {item.UsuarioExecutor.nome} &#128590;</div> :
                    <div style={{ color: 'red' }}>Selecione o executor &#10067;</div>}

                  {item.Status.nome === "Concluido" ? <div style={{ color: 'blue' }}>Status: {item.Status.nome} &#9989;</div> :
                    <div style={{ color: 'red' }}>Status:  {item.Status.nome}&#x23F3;</div>}
                </th>
                <th>
                  <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                    ver
                  </Button>
                </th>


              </tr>)}<p></p>


          </tbody> :
          <tbody>
            {meuSetor.filter((item) => item.fkUsuarioExecutor === logged.id &&(item.Status.nome != "Concluido" && item.Status.nome != "Cancelado") ).map((item, index) =>
              <tr key={index}>

                < th scope="row" style={{ wordBreak: "break-all" }}>Titulo: {item.titulo}<br></br>
                  Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br>
                  Demandante: {item.Usuario.Area.Unidade.nome}<br></br>


                  {item.fkUsuarioExecutor ? <div style={{ color: 'blue' }}>Executor: {item.UsuarioExecutor.nome} &#128590;</div> :
                    <div style={{ color: 'red' }}>Selecione o executor &#10067;</div>}

                  {item.Status.nome === "Concluido" ? <div style={{ color: 'blue' }}>Status: {item.Status.nome} &#9989;</div> :
                    <div style={{ color: 'red' }}>Status:  {item.Status.nome}&#x23F3;</div>}
                </th><th>
                  <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
                    ver
                  </Button>
                </th>


              </tr>)}<p></p>


          </tbody>

        }
      </table>

      <Dialog open={emailNaoEncontrado}  >

<DialogContent>


  <hr></hr>
  <h4>Pesquisa de Satisfação GTI</h4>

 
 <center>
 <Button variant="contained" 
    onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/pesquisa/`}>Responder</Button>
  
 </center>
   
   
    {/* <Button variant="contained" onClick={novaInteracao}>{'Enviar'}</Button>


    <Button onClick={() => setOpenMsg(false)}>Cancelar</Button> */}


</DialogContent>

</Dialog>





    </div>


  );
};

export default Home;