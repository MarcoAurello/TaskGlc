import { Button, SpeedDial } from "@mui/material";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import TaskItem from '../components/task-item'

const home = () => {
  return (
    <div>
      <TaskFilter />
      <center>
      <div >
      <Button  size="large" variant="contained" style={{marginRight: 20 ,marginTop:20}} onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`} >Minhas Tarefas</Button>
      <Button size="large" variant="contained"style={{marginRight: 20 ,marginTop:20}} onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`} >Chamados Abertos</Button>
      <Button  size="large" variant="contained" style={{marginRight: 20 ,marginTop:20}} onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}>Abrir Chamado</Button>

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

export default home;