import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SpeedDial, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import Switch from '@mui/material/Switch';

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




  //  const nome = Logged.Perfil.nome;
  const [minhasAtividades, setMinhasAtividades] = useState([])
  const [solicitacaoAtividades, setSolicitacaoAtividades] = useState([])
  const [nomeUsuario, setNomeUsuario] = useState('')
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



  useEffect(() => {
    carregarMinhasAtividades()
    carregarSolicitacaoAtividades()
    carregarAtividadesDoSetor()

  }, [])

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



  const handleChange = (event) => {
    setChecked(event.target.checked);
  }



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

      {/* {logged ? <TaskFilter nome={props.logged.nome} />
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

        <div style={{ fontSize: 20, color:'#5499FA' }}>Recebidas  por área
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

              style={{ backgroundColor: '#fff3d1' }}
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
                    {'Status : ' + item.Status.nome}{item.Status.nome == 'Concluido' ? <a>&#9989;</a>  : <a> &#128341;</a> }<br></br>
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
            
           <div style={{fontSize: '18px'}}> <center>Atividades Recebidas do seu Setor</center></div> 
           <table className="table table-striped" style={{ fontFamily: "arial", fontSize: '12px', marginLeft: 10, marginRight: 20 }}>

<tbody>
  {meuSetor.map((item, index) =>
    <tr key={index}>
    
      < th scope="row"  style={{ wordBreak:"break-all"}}>Titulo: {item.titulo}<br></br> 
      Solicitado: {new Date(item.createdAt).toLocaleString()} <br></br> 
      Demandante: {item.Usuario.Area.Unidade.nome}<br></br> 
      

       {item.fkUsuarioExecutor ? <div  style={{ color: 'blue' }}>Executor: {item.UsuarioExecutor.nome} &#128590;</div>  : 
       <div style={{ color: 'red' }}>Selecione o executor &#10067;</div> }
       
      {item.Status.nome === "Concluido" ? <div style={{ color: 'blue' }}>Status: {item.Status.nome} &#9989;</div> :
        <div style={{ color: 'red' }}>Status:  {item.Status.nome}&#x23F3;</div>} 
      </th><th>
        <Button variant="contained" size="small" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
          ver
        </Button>
      </th>


    </tr>)}<p></p>
    

</tbody>
</table>





    </div>


  );
};

export default Home;