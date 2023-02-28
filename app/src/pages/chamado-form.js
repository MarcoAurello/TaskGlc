import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { Avatar, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip } from "@mui/material";
import Paper from '@mui/material/Paper';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TaskItemDoChamado from "../components/task-item-do-chamado";


const getCookie = require('../utils/getCookie')

const PageContainer = styled.div`
  margin: 16px;
  padding: 32px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 20px -18px #424242;
`

const AtividadeForm = (props) => {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const { id } = props.match.params;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')

  const [classificacao, setClassificacao] = useState('')
  const [newClassificacao, setNewClassificacao] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [newStatusControler, setNewStatusControler] = useState('')

  const [protocolo, setProtocolo] = useState('')
  const [status, setStatus] = useState('')
  const [valueArea, setValueArea] = useState('')
  const [valueUnidade, setValueUnidade] = useState('')
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')
  const[emailUsuarioSolicitante , setEmailUsuarioSolicitante] = useState('')
  const[telefoneSolicitante,setTelefoneSolicitante]= useState('')
  const[setorSolicitante, setSetorSolicitante]= useState('')

  const [tempoEstimando, setTempoEstimado] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [title, setTitle] = useState('')

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [fkUnidade, setFkUnidade] = useState('')
  const [fkArea, setFkArea] = useState('')
  const [unidade, setUnidade] = useState([])
  const [area, setArea] = useState([])
  const [atividade, setAtividade] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [classificarChamado, setClassificarChamado] = useState([])
  const [alterarStatus, setAltararStatus] = useState([])


  const [usuarioExecutor, setusuarioExecutor] = useState([])
  const [fkUsuarioExecutor, setFKUsuarioExecutor] = useState('')
  const [fkAreaDemandada, setFkAreaDemandada] = useState('')


  const [idChamado, setIdChamado] = useState('')






  useEffect(() => {
    function carregarRegistro() {
      setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              setClassificacao(data.data.Classificacao.nome)
              setProtocolo(data.data.protocolo)
              setStatus(data.data.Status.nome)
              setValueArea(data.data.Area.nome)
              setValueUnidade(data.data.Area.Unidade.nome)
              setUsuarioSolicitante(data.data.Usuario.nome)
              setEmailUsuarioSolicitante(data.data.Usuario.email)
              setTelefoneSolicitante(data.data.Usuario.telefone)
              // setSetorSolicitante(data.data.Usuario.Area.nome)
              setTitle(data.data.titulo)
              setFkAreaDemandada(data.data.fkArea)
              setIdChamado(data.data.id)



              carregarMensagem()

            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    function carregarMensagem() {
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/?fkAtividade=${id}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if (status === 200) {
              setOpenLoadingDialog(false)
              setMensagens(data.data)
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    function carregarUnidade() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/unidade/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
            } else if (status === 200) {
              setUnidade(data.data)
              if (id) {
                carregarRegistro()
              } else {
                setOpenLoadingDialog(false)
              }
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }


    function carregarClassificacao() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/classificacao/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)

            if (status === 401) {

            } else if (status === 200) {
              setClassificarChamado(data.data)
              // alert("3")
              // alert(JSON.stringify(data))

            }
          }).catch(err => setOpenLoadingDialog(true))
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
              setAltararStatus(data.data)
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





    if (id) {
      carregarRegistro()
      carregarClassificacao()
      carregarFuncionarios()
      carregarStatus()
    } else {
      carregarUnidade()
    }
  }, [])


  useEffect(() => {
    function carregarArea() {
      // setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/area/?fkUnidade=${fkUnidade}`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            setOpenLoadingDialog(false)
            if (status === 401) {
            } else if (status === 200) {
              setArea(data.data)
              setOpenLoadingDialog(false)

            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if (fkUnidade) {
      carregarArea()

    }
  }, [fkUnidade])


  const onSaveStatus = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        newStatus
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/${id}/edit`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {




            setMessage(data.message)
            setOpenMessageDialog(true)

            window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }


  const onSave = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkUnidade,
        fkArea,
        titulo,
        conteudo
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`


            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  const novaInteracao = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkAtividade: id,
        conteudo
      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/mensagem/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            // setArea(data.data)

          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }





  const criarExecucao = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        fkClassificacao: newClassificacao,
        fkAtividade: idChamado,
        fkUsuario: fkUsuarioExecutor,
        ativo: true

      })
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuarioAtividade/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if (status === 401) {
            // alert('o1')
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {


            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home`

            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  return (
    <PageContainer>
      <h3>Atividade</h3>
      {/* {id ? <div style={{ flex: 1, marginBottom: 16, marginLeft: 25 }}>
          <TextField size="small" fullWidth label="Protocolo" disabled variant="outlined" value={protocolo} />
        </div> : ''} */}
      {classificacao == "Não Definido" && status == "Aberto" ?
        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
          <Button variant="contained" color="error" onClick={() => setOpen(true)}>Encaminhar Chamado</Button>
        </div> : ''

      }

      {classificacao != "Não Definido" && protocolo != '' ?
        <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
          <Button variant="contained"  onClick={() => setOpenStatus(true)}>Alterar Status do chamado</Button>
        </div> : ''

      }


      {id ? <div >
      <TaskItemDoChamado
        protocolo={protocolo}
        unidade={valueUnidade}
        area={valueArea}
        classificacao={classificacao}
        solicitante={usuarioSolicitante}
        status={status}
        titulo={title}
        setorSolicitante={setorSolicitante}
        emailUsuarioSolicitante={emailUsuarioSolicitante}
        telefoneSolicitante={telefoneSolicitante}
        setorSol={valueUnidade}
        
      />
      </div> : ''} 



     
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginRight: 3 }}>







        <div style={{ flex: 1 }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Unidade" disabled variant="outlined" value={valueUnidade} />
        </div> : ''}
        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Área" disabled variant="outlined" value={valueArea} />
        </div> : ''}

        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Classificacao" disabled variant="outlined" value={classificacao} />
        </div> : ''} */}
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Status" disabled variant="outlined" value={status} />
        </div> : ''}
        {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value={usuarioSolicitante} />
        </div> : ''} */}
        {/* {id ? <div style={{ flex: 1, marginBottom: 16 }}>
          <TextField size="small" fullWidth label="Chamado" disabled variant="outlined" value={title} />
        </div> : ''} */}
        {!id ? <>
          <FormGroup>

            <div style={{ flex: 1, marginBottom: 16 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Unidade</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Unidade"
                  value={fkUnidade}>
                  <MenuItem value="" onClick={() => setFkUnidade("")}>
                    <em>Nenhum</em>
                  </MenuItem>
                  {unidade.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkUnidade(item.id)}>{item.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div style={{ flex: 1, marginBottom: 16 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small">Área</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Unidade"
                  value={fkArea}>
                  <MenuItem value="" onClick={() => setFkUnidade("")}>
                    <em>Nenhum</em>
                  </MenuItem>
                  {area.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkArea(item.id)}>{item.nome}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div style={{ flex: 1, marginBottom: 16 }}>
              <TextField size="small" fullWidth label="Título" variant="outlined" value={titulo} onChange={e => setTitulo(e.target.value)} />
            </div>
            <div style={{ flex: 1, marginBottom: 16 }}>
              <TextField size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button>
              <div style={{ flex: 1 }}></div>
              <Button variant="contained" onClick={onSave}>{'Criar'}</Button>
            </div>
          </FormGroup>
        </> : ''}


        {/* {envioFuncionario ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value='ssssssssddfdfssfgd' />
        </div> : 'dddddd'} */}



        {id ? <>
          <h4>Enviar um comentário</h4>
          {/* {classificacao == "Não Definido" && status == "Aberto" ?
            <div style={{ flex: 1, marginBottom: 16, marginLeft: 5 }}>
              <Button variant="contained" onClick={() => setOpen(true)}>{'Encaminhar chamado'}</Button>
            </div> : ''

          } */}

          <div style={{ flex: 1, marginBottom: 16 }}>
            <TextField size="small" fullWidth label="Descrição" multiline rows={2} variant="outlined" value={conteudo} onChange={e => setConteudo(e.target.value)} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
            <div style={{ flex: 1 }}></div>
            <Button variant="contained" onClick={novaInteracao}>{'Enviar'}</Button>
          </div>
          <h4>Histórico do chamado</h4>
          {mensagens.map((item, index) => <div style={{ borderTop: '1px solid #e0e0e0', padding: 2, background: '#EEE9E9', borderRadius: 5, marginBottom: 1, border: '2px solid #e0e0e0' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <b style={{ fontSize: 10 }}>{item.Usuario.nome}</b>
                <div style={{ flex: 1 }}></div>
                <b style={{ fontSize: 10 }}>{new Date(item.createdAt).toLocaleString()}</b>
              </div>
            </div>
            <p>{item.conteudo}</p>
          </div>)}
        </> : ''}

      </div>

      <Dialog open={openLoadingDialog}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 120, height: 120 }}>
          <CircularProgress />
        </div>
      </Dialog>

      <Dialog
        open={openMessageDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Atenção
        </DialogTitle>
        <DialogContent style={{ width: 400 }}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atividade ? () => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${atividade.id}/edit` : () => setOpenMessageDialog(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <hr></hr>

      <Dialog open={open} >
        <DialogTitle style={{ color: '#1E90FF' }} >Encaminhar Chamado</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>

          <InputLabel id="demo-select-small"><b>Titulo Chamado:</b></InputLabel>
          {title}
          <br></br>
          <InputLabel id="demo-select-small"><b>Unidade</b></InputLabel>
          {valueUnidade}
          <InputLabel id="demo-select-small"><b>Solicitante</b></InputLabel>
          {usuarioSolicitante}

          <hr></hr>

          <p></p>

          <FormControl fullWidth labelId="demo-simple-select-label" id="demo-simple-select">


            <select style={{ fontSize: 14 }} onChange={e => setNewClassificacao(e.target.value)}>
              <option >CLASSIFIQUE O CHAMADO</option>)

              {
                classificarChamado.map((classificacao, key) => <option name={classificacao.nome} value={classificacao.id} >
                  {classificacao.nome}</option>)
              }
            </select>

            <hr></hr>

            <select style={{ fontSize: 14 }} onChange={e => setFKUsuarioExecutor(e.target.value)}>

              <option >SELECIONE  O EXECUTOR</option>)
              {
                usuarioExecutor.map((user, key) => <option name={user.nome} value={user.id} >
                  {user.nome}</option>)
              }

            </select>

            
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => { criarExecucao() }} >Enviar</Button>
        </DialogActions>
      </Dialog>






      <Dialog open={openStatus}  >

        <DialogContent>
          <DialogContentText>

          </DialogContentText>



          <p></p>

          <FormControl fullWidth labelId="demo-simple-select-label" id="demo-simple-select" style={{width: 250}}>
          <InputLabel id="demo-simple-select-label"> Altarar Status do chamado</InputLabel>
             

            <Select style={{ fontSize: 20 }} onChange={e => setNewStatus(e.target.value)}>
            

              {
                alterarStatus.map((status, key) => <MenuItem name={status.nome} value={status.id} >
                  {status.nome}</MenuItem>)
              }
            </Select>

            <hr></hr>


          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={() => { onSaveStatus() }} >Alterar</Button>
        </DialogActions>
      </Dialog>




    </PageContainer>
  );
};

export default AtividadeForm;
