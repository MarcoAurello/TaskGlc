import { SpeedDial } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import TaskItem from '../components/task-item'

const getCookie = require('../utils/getCookie')

const ChamadosAbertos = (props) => {
  const [minhasAtividades,setMinhasAtividades] = useState([])


  function carregarMinhasAtividades() {
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

            setMinhasAtividades(data.data)
            
            // alert('oi ' +JSON.stringify( minhasAtividades))
            // setUsuariosNaoValidados(data.data)
          }
        })
      })
      

  }



  useEffect(() => {
    carregarMinhasAtividades()

  }, [])







  return (
    <div>
      <TaskFilter />
      <center>
      <div style={{fontSize: 24, fontWeight: 'bold',
       marginBottom: 4, marginRight: 8, alignItems:'center',
       }}>Atividades Solicitadas</div></center>

      {minhasAtividades.map((item, index) =>
      <TaskItem key={index} 
      idChamado= {item.id}
      tituloChamado={item.titulo}
      protocoloChamado={item.protocolo}
      criacaoChamado={item.createdAt}
      classificacao={item.Classificacao.nome}
      status={item.Status.nome}
      tela={'solicitada'}
      // usuarioDemandante={item.Usuario.nome}
      // usuarioDemandanteTelefone={item.Usuario.telefone}
      // usuarioDemandanteEmail={item.Usuario.email}
      // logado ={item.UsuarioAtividade.Usuario.nome}
      
      />
      )}
      
      <SpeedDial
        ariaLabel="Nova Tarefa"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<EditIcon />} 
        onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`}
        />

          



    </div>
  );
};

export default ChamadosAbertos;