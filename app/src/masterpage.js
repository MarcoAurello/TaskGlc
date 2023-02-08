import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Content from "./components/content";

import Home from './pages/home';
import Usuario from './pages/usuario'

import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from './components/toolbar'
import { Badge, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, TextField } from "@mui/material";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import UsuarioForm from "./pages/usuario-form";

import isAuthenticated from './utils/isAuthenticated'
const getCookie = require("./utils/getCookie")

const MasterPageContainer = styled.div`
  position: 'absolute'; 
  left: 0; 
  right: 0; 
  top: 0; 
  bottom: 0; 
  background-color: #F5F5F5;
  overflow: none;
  color: #424242
`;

const Masterpage = (props) => {
  const { logged } = props;
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openAccountMenu, setOpenAccountMenu] = useState(false)
  const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null)
  const [primeiroLogin, setPrimeiroLogin] = useState(false)

  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  const [openDialogPrimeiroAcesso, setOpenDialogPrimeiroAcesso] = useState(false)
  
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [chapa, setChapa] = useState('')
  const [fkPerfil, setFkPerfil] = useState(null)  
  const [fkUnidade, setFkUnidade] = useState(null)
  const [fkArea, setFkArea] = useState(null)


  const [perfil, setPerfil] = useState([])
  const [unidade, setUnidade] = useState([])
  const [area, setArea] = useState([])
  const [openLoadingDialog, setOpenLoadingDialog] = useState(false)

  useEffect(() => {
    isAuthenticated().then(_ => {
      setPrimeiroLogin(_.data.data.primeiroLogin)
      setOpenDialogPrimeiroAcesso(_.data.data.primeiroLogin)
    })
  }, []);


  useEffect(() => {
    function carregarPerfil() {
      setOpenLoadingDialog(true)
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/perfil/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            if(status === 401) {  
            } else if(status === 200) {
              setPerfil(data.data)
              carregarUnidade()
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
              setOpenLoadingDialog(false)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if(primeiroLogin) {
      carregarPerfil()
    }

  }, [primeiroLogin])


  useEffect(() => {
    function carregarArea() {
      setOpenLoadingDialog(true)
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
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    if(fkUnidade) {
      carregarArea()
    }
  }, [fkUnidade])


  const salvarDadosPrimeiroAcesso = () => {
    const token = getCookie('_token_task_manager')
    const params = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        nome,
        telefone,
        chapa,
        fkPerfil,
        fkUnidade,
        fkArea,
      }) 
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/edit/primeiroacesso/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenLoadingDialog(false)
          if(status === 401) {  
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if(status === 200) {
            // alert(JSON.stringify(data.data))
            setMessage(data.message)
            setOpenMessageDialog(true)
            setOpenDialogPrimeiroAcesso(false)
            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  const actions = [
    <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
      <Badge badgeContent={17} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>,
    <IconButton 
      size="large" 
      edge="end" 
      aria-haspopup="true" 
      color="inherit" 
      id="positioned-account-icon-button"
      onClick={(e) => {
        setAnchorElAccountMenu(e.currentTarget)
        setOpenAccountMenu(true)
      }}>
      <AccountCircle />
    </IconButton>
  ]

  const menu = <IconButton onClick={() => setOpenDrawer(true)}  size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>

  const renderMenu = (
    <Menu
      anchorEl={anchorElAccountMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="positioned-account-menu"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openAccountMenu}
      onClose={() => setOpenAccountMenu(false)}
    >
      <MenuItem onClick={() => setOpenAccountMenu(false)} disableRipple>
        <div style={{width: 120,  display: 'flex', flexDirection: 'row'}}>
          <AccountBoxIcon />
          <div style={{paddingLeft: 16 }}>Meu Perfil</div>
        </div>
      </MenuItem>
      <MenuItem onClick={() => {
        setOpenAccountMenu(false)
        window.location.href = `${process.env.REACT_APP_DOMAIN}/logout`
      }} disableRipple>
        <div style={{width: 120, display: 'flex', flexDirection: 'row'}}>
          <LogoutIcon />
          <div style={{paddingLeft: 16 }}>Sair</div>
        </div>
      </MenuItem>
    </Menu>
  );

  return (
    <MasterPageContainer>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/home/`}>
                <ListItemIcon>
                  <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary='Atividades' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhonelinkSetupIcon />
                </ListItemIcon>
                <ListItemText primary='Configuração' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary='Usuário' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/usuario`} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <CssBaseline />
      <Toolbar
        menu={menu}
        title='SENAC - Task Manager'
        actions={actions} />
      {renderMenu}
      <Content>
        <Switch>
          {/* Usuarios */}
          {/* 
          <Route
            exact
            path="/usuario/cadastro"
            render={(props) => <UsuarioForm {...props} logged={logged} />}
          />
          */}

          <Route
            exact
            path="/usuario"
            render={(props) => <Usuario {...props} logged={logged} />}
          />

          <Route
            exact
            path="/usuario/:id/edit"
            render={(props) => <UsuarioForm {...props} logged={logged} />}
          />

          <Route
            exact
            path="/usuario/cadastro"
            render={(props) => <UsuarioForm {...props} logged={logged} />}
          />

          {/* Home */}
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} logged={logged} />}
          />
          <Route
            exact
            path="/home"
            render={(props) => <Home {...props} logged={logged} />}
          />
        </Switch>
        <Dialog open={openDialogPrimeiroAcesso}>
          <DialogTitle>Primeiro Acesso</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Para a correta utilização do sistema é necessário o preenchimento dos campos abaixo. Estas informações passaram pela aprovação do gestor imediato.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Nome"
              type="text"
              fullWidth
              variant="standard"
              size="small"              
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Chapa"
              type="text"
              fullWidth
              variant="standard"
              size="small"
              value={chapa}
              onChange={e => setChapa(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Telefone/Ramal"
              type="text"
              fullWidth
              variant="standard"
              size="small"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />
            <FormControl fullWidth size="small" variant="standard" style={{marginTop: 8}}>
              <InputLabel id="label-small-perfil">Perfil</InputLabel>
              <Select
                fullWidth
                labelId="label-small-perfil"
                label="Area"
                value={fkPerfil}>
                <MenuItem value={null} onClick={() => setFkPerfil(null)}>
                  <em>Nenhum</em>
                </MenuItem>
                {perfil.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkPerfil(item.id)}>{item.nome}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" variant="standard" style={{marginTop: 16}}>
              <InputLabel id="label-small-unidade">Unidade</InputLabel>
              <Select
                fullWidth
                labelId="label-small-unidade"
                label="Area"
                value={fkUnidade}>
                <MenuItem value={null} onClick={() => setFkUnidade(null)}>
                  <em>Nenhum</em>
                </MenuItem>
                {unidade.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkUnidade(item.id)}>{item.nome}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" variant="standard" style={{marginTop: 16}}>
              <InputLabel id="label-small-unidade">Área</InputLabel>
              <Select
                fullWidth
                labelId="label-small-unidade"
                label="Area"
                value={fkArea}>
                <MenuItem value={null} onClick={() => setFkArea(null)}>
                  <em>Nenhum</em>
                </MenuItem>
                {area.map((item, index) => <MenuItem key={index} value={item.id} onClick={() => setFkArea(item.id)}>{item.nome}</MenuItem>)}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={salvarDadosPrimeiroAcesso}>Salvar</Button>
          </DialogActions>
        </Dialog>

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
            <Button onClick={() => setOpenMessageDialog(false)}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Content>      
    </MasterPageContainer>        
  );
};

export default Masterpage;
