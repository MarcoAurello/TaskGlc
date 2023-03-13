import { Button, Dialog, DialogContent, SpeedDial } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import TaskFilter from '../components/task-filter'
import TaskItem from '../components/task-item'
import { display } from "@mui/system";


const getCookie = require('../utils/getCookie')

const MinhasAtividades = (props) => {
  const {logged} = props

  const [minhasAtividades,setMinhasAtividades] = useState([])
  const [openMsg, setOpenMsg] = useState(false);


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


  useEffect(() => {
    carregarMinhasAtividades()
   

  }, [])


   
  







  return (
    <div>
     
      
       {logged ? <TaskFilter  nome={props.logged.nome}/>
      :
      ''
      }
      <center>
      <div style={{fontSize: 24, fontWeight: 'bold',
       marginBottom: 4, marginRight: 8, paddingLeft: 5, alignItems:'center',
       }}>Execute na ordem apresentada<br></br>
         <Button variant="contained" size="small"  onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividadesArquivadas`}>
           Arquivadas
          </Button>
          <Button  style={{marginLeft: 5}} variant="contained" size="small"  onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/todasAsPendencias`}>
           Todas as Pendências
          </Button>
          </div>
       
       </center> 

      {minhasAtividades.map((item, index) =>
      <TaskItem key={index} 
      idChamado= {item.id}
      tituloChamado={item.titulo}
      protocoloChamado={item.protocolo}
      criacaoChamado={item.createdAt}
      classificacao={item.Classificacao.nome}
      status={item.Status.nome}
      usuarioDemandante={item.Usuario.nome}
      usuarioDemandanteTelefone={item.Usuario.telefone}
      usuarioDemandanteEmail={item.Usuario.email}
      tela={'minhas'}
      fkUsuarioSoloicitante={item.fkUsuarioSolicitante}
      fklogado={props.logged.id}
      // logado ={item.UsuarioAtividade.Usuario.nome}
      Arquivado={item.arquivado}
      usuarioExecutor={item.fkUsuarioExecutor}
      tempoEstimado={item.tempoEstimado}
      
      />
      )}
      
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

export default MinhasAtividades;