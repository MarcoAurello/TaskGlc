import { Button, SpeedDial } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import TaskItem from '../components/task-item'
const getCookie = require('../utils/getCookie')


const Home = (props) => {
  const { Logged } = props;
  // alert(JSON.stringify(Logged))
  //  const nome = Logged.Perfil.nome;
  const [minhasAtividades,setMinhasAtividades] = useState([])
  const [solicitacaoAtividades,setSolicitacaoAtividades] = useState([])


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
  
  return (
    <div>
      <TaskFilter nome={'nome'} />
      <center>
      <div >
      <Button  size="large" variant="contained" style={{marginRight: 20 ,marginTop:20}} 
      onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`} >
        Atividades Recebidas<KeyboardDoubleArrowLeftIcon/><div style={{color:'yellow', fontWeight:'bold', fontSize:24}}>{minhasAtividades.length}</div></Button><br></br>
      
      <Button size="large" variant="contained"style={{marginRight: 20 ,marginTop:20}} 
      onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`} >
        Atividades Solicitadas<KeyboardDoubleArrowRightIcon/><div  style={{color:'yellow', fontWeight:'bold', fontSize:24}}>{solicitacaoAtividades.length}</div></Button><br></br>
      
      <Button  size="large" variant="contained" style={{marginRight: 20 ,marginTop:20}} 
      onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}>Nova Atividade</Button><br></br>

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