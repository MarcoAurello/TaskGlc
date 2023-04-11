import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SpeedDial, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import Switch from '@mui/material/Switch';

import { Box } from "@mui/system";




const getCookie = require('../utils/getCookie')




const Video = (props) => {
  const { logged } = props
 

  









 



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

       <hr></hr>
       <div>
        <div><h2>Tutorial Solicitar Atividade</h2></div>
       <iframe width="560" height="315" src="https://www.youtube.com/embed/FQRb-DA7u_E" 
       title="YouTube video player" frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>

       </div>
<hr></hr>
       <div>
        <div><h2>Turorial Receber Atividades</h2></div>
       <iframe width="560" height="315" src="https://www.youtube.com/embed/_mGoifOa6wE"
        title="YouTube video player"
         frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         allowfullscreen></iframe>
       </div>




        
        

        



        <div >
          {/* <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`} >
            Atividades Recebidas<KeyboardDoubleArrowLeftIcon /><div style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 24 }}>{minhasAtividades.length}</div></Button><br></br>

          <Button size="large" variant="contained" style={{ marginRight: 20, marginTop: 20 }}
            onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`} >
            Atividades Solicitadas<KeyboardDoubleArrowRightIcon /><div style={{ color: '#FFA500', fontWeight: 'bold', fontSize: 24 }}>{solicitacaoAtividades.length}</div></Button><br></br> */}

         
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

export default Video;