import { Button, SpeedDial, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TaskItem from '../components/task-item'
import { Box } from "@mui/system";
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

const getCookie = require('../utils/getCookie')




const Home = (props) => {
  const {logged} = props
  const [pesquisa, setPesquisa]= useState('')
  const [ respostas, setrespostas] = useState([])
  // alert(JSON.stringify(props.logged))
  
  
  //  const nome = Logged.Perfil.nome;
  const [minhasAtividades,setMinhasAtividades] = useState([])
  const [solicitacaoAtividades,setSolicitacaoAtividades] = useState([])
  const[nomeUsuario, setNomeUsuario]= useState('')
  


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

  }, [])

  useEffect(() => {
    if(pesquisa) {
      pesquisar()
    }
  }, [pesquisa])

  // useEffect(() => {
  //   pesquisa()
  // }, [pesquisa])

  function pesquisar(){

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

      {logged ? <TaskFilter  nome={props.logged.nome}/>
      :
      ''
      }
      
      <center>
      <div >
      <Button  size="large" variant="contained" style={{marginRight: 20 ,marginTop:20}} 
      onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`} >
        Atividades Recebidas<KeyboardDoubleArrowLeftIcon/><div style={{color:'yellow', fontWeight:'bold', fontSize:24}}>{minhasAtividades.length}</div></Button><br></br>
      
      <Button size="large" variant="contained"style={{marginRight: 20 ,marginTop:20}} 
      onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`} >
        Atividades Solicitadas<KeyboardDoubleArrowRightIcon/><div  style={{color:'yellow', fontWeight:'bold', fontSize:24}}>{solicitacaoAtividades.length}</div></Button><br></br>
      
      <Button  size="large" variant="contained" style={{marginRight: 20 ,marginTop:20}} 
      onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}>Nova Atividade</Button><br></br><p></p>

<Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField fullWidth label="pesquise seu problema..."  name='pesquisa' value={pesquisa}  onChange={e=> setPesquisa(e.target.value)} />
     <p></p>
      {/* <Button type="button" className="btn btn-primary" onClick={(e) => { pesquisar() }}>Buscar </Button> */}

      {respostas  ?
      <table class="table table-striped" style={{ fontFamily: "arial", fontSize: '20px' }}>
        {/* <thead>
          <th>titulo</th>
          <th>ver Atividade</th>
        </thead> */}
        <tbody>
        {respostas.map((item,index)=>
        <tr key={index}>
          <th scope="row">{item.titulo}</th>
          <th>
          <Button variant="contained" size="small"  onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${item.id}/edit`}>
            ver
          </Button>
            </th>


        </tr>)}

        </tbody>
      </table>
      
      :
      ''
      }

    </Box>

      </div>

      
    


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

export default Home;