import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { Avatar, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Tooltip } from "@mui/material";
import Paper from '@mui/material/Paper';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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
  const { id } = props.match.params;
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  
  const [classificacao, setClassificacao] = useState('')
  const [protocolo, setProtocolo] = useState('')
  const [status, setStatus] = useState('')
  const [valueArea, setValueArea] = useState('')
  const [valueUnidade, setValueUnidade] = useState('')
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')
  const [tempoEstimando, setTempoEstimado] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [fkUnidade, setFkUnidade] = useState('')
  const [fkArea, setFkArea] = useState('')
  const [unidade, setUnidade] = useState([])
  const [area, setArea] = useState([])
  const [atividade, setAtividade] = useState(null)
  const [mensagens, setMensagens] = useState([])

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
            if(status === 401) {  
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if(status === 200) {
              setClassificacao(data.data.Classificacao.nome)
              setProtocolo(data.data.protocolo)
              setStatus(data.data.Status.nome)
              setValueArea(data.data.Area.nome)
              setValueUnidade(data.data.Area.Unidade.nome)
              setUsuarioSolicitante(data.data.Usuario.nome)
              
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
            if(status === 401) {  
              setMessage(data.message)
              setOpenMessageDialog(true)
            } else if(status === 200) {
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
            if(status === 401) {  
            } else if(status === 200) {
              setUnidade(data.data)
              if(id) {
                carregarRegistro()
              } else {
                setOpenLoadingDialog(false)
              }
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }
    
    if(id) {
      carregarRegistro()
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
            if(status === 401) {  
            } else if(status === 200) {
              setArea(data.data)
              setOpenLoadingDialog(false)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }
    
    if(fkUnidade) {
      carregarArea()
    }
  }, [fkUnidade])


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
          if(status === 401) {  
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if(status === 200) {
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
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
          if(status === 401) {  
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if(status === 200) {
            // alert(JSON.stringify(data.data))
            setAtividade(data.data)
            setMessage(data.message)
            setOpenMessageDialog(true)
            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  return (
    <PageContainer>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16}}>
        <h3>Cadastro de Atividade</h3>
        <div style={{flex: 1}}></div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {id ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Unidade" disabled variant="outlined" value={valueUnidade} />
        </div> : ''}
        {id ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Área" disabled variant="outlined" value={valueArea} />
        </div> : ''}
        {id ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Protocolo" disabled variant="outlined" value={protocolo} />
        </div> : ''}
        {id ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Classificacao" disabled variant="outlined" value={classificacao} />
        </div> : ''}
        {id ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Status" disabled variant="outlined" value={status} />
        </div> : ''}
        {id ? <div style={{flex: 1, marginBottom: 16}}>
          <TextField size="small" fullWidth label="Solicitante" disabled variant="outlined" value={usuarioSolicitante} />
        </div> : ''}
        {!id ? <>
          <FormGroup>
            <div style={{flex: 1, marginBottom: 16}}>
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
            <div style={{flex: 1, marginBottom: 16}}>
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
            <div style={{flex: 1, marginBottom: 16}}>
              <TextField size="small" fullWidth label="Título" variant="outlined" value={titulo}  onChange={e => setTitulo(e.target.value)}/>
            </div>
            <div style={{flex: 1, marginBottom: 16}}>
              <TextField size="small" fullWidth label="Descrição" multiline rows={6} variant="outlined" value={conteudo}  onChange={e => setConteudo(e.target.value)}/>
            </div>
            <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
              <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button>
              <div style={{flex: 1}}></div>
              <Button variant="contained" onClick={onSave}>{'Criar'}</Button>
            </div>
          </FormGroup>
        </> : ''}

        
        {id ? <>  
          <h4>Nova Interação</h4>
          <div style={{flex: 1, marginBottom: 16}}>
            <TextField size="small" fullWidth label="Descrição" multiline rows={6} variant="outlined" value={conteudo}  onChange={e => setConteudo(e.target.value)}/>
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            {/* <Button variant="outlined" onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area/`}>Voltar</Button> */}
            <div style={{flex: 1}}></div>
            <Button variant="contained" onClick={novaInteracao}>{'Enviar'}</Button>
          </div>
          <h4>Histórico</h4>
          {mensagens.map((item, index) => <div style={{borderTop: '1px solid #e0e0e0', padding: 16}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <b style={{fontSize: 13}}>{item.Usuario.nome}</b>
                <div style={{flex: 1}}></div>
                <b style={{fontSize: 12}}>{new Date(item.createdAt).toLocaleString()}</b>
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
        <DialogContent style={{width: 400}}>
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
    </PageContainer>
  );
};

export default AtividadeForm;
