import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Content from "./components/content";

import Home from './pages/home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Usuario from './pages/usuario'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MinhasAtividades from './pages/minhasAtividades'
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import todasAsPendencias from "./pages/todasAsPendencias";
import MinhasAtividadesArquivadas from './pages/minhasAtividadesArquivadas'
import ChamadosAbertos from './pages/chamadosAbertos'
import AddTaskIcon from '@mui/icons-material/AddTask';
import MenuIcon from '@mui/icons-material/Menu'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FaceIcon from '@mui/icons-material/Face';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from './components/toolbar'
import { Badge, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, TextField, Tooltip } from "@mui/material";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

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
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import PeopleIcon from '@mui/icons-material/People';
import UsuarioForm from "./pages/usuario-form";
import HomeIcon from '@mui/icons-material/Home';
import RecebidasSetor from "./pages/recebidasSetor";
import isAuthenticated from './utils/isAuthenticated'
import ConfiguracaoForm from "./pages/configuracao-form";
import Unidade from "./pages/unidade";
import UnidadeForm from "./pages/unidade-form";
import Area from "./pages/area";
import AreaForm from "./pages/area-form";
import PerfilUtils from "./utils/perfil.utils";
import UserNotificationItem from "./components/user-notification-item";
import AtividadeNotificationItem from "./components/atividade-notification-item";
import AtividadeRecebidaNotificationItem from "./components/atividadeRecebida-notification-item";

import Equipe from "./pages/equipe";
import ValidarUsuarioForm from "./pages/validar-usuario-form";
import AtividadeForm from "./pages/chamado-form";
import TaskItem from "./components/task-item";
import TodasAsPendencias from "./pages/todasAsPendencias";
import SolicitadasSetor from "./pages/solicitadasSetor";

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
  // const { logged } = props;
  const [anchorElAtividadeNaoAtribuidaNotification, setAnchorElAtividadeNaoAtribuidaNotification] = useState(null)
  const [anchorElAtividadeReceidaNotification, setAnchorElAtividadeRecebidaNotification] = useState(null)
  const [openAtividadeNaoAtribuidaNotification, setOpenAtividadeNaoAtribuidaNotification] = useState(false)
  const [openAtividadeRecebidaNotification, setOpenAtividadeRecebidaNotification] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(true)
  const [openAccountMenu, setOpenAccountMenu] = useState(false)
  const [anchorElAccountMenu, setAnchorElAccountMenu] = useState(null)
  const [openUserNotification, setOpenUserNotification] = useState(false)
  const [anchorElUserNotification, setAnchorElUserNotification] = useState(null)
  const [primeiroLogin, setPrimeiroLogin] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  const [openDialogPrimeiroAcesso, setOpenDialogPrimeiroAcesso] = useState(false)
  const [naoAtrib, setFkNaoAtrib] = useState('')
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
  const [logged, setLogged] = useState(null)
  const [usuariosNaoValidados, setUsuariosNaoValidados] = useState([])
  const [atividadesNaoAtribuidas, setAtividadesNaoAtribuidas] = useState([])
  const [atividadesRecebida, setAtividadeRecebida] = useState([])


  useEffect(() => {
    isAuthenticated().then(_ => {
      setLogged(_.data.data)
      // alert(JSON.stringify(logged))
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
            if (status === 401) {
            } else if (status === 200) {
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
            if (status === 401) {
            } else if (status === 200) {
              setUnidade(data.data)
              setOpenLoadingDialog(false)
            }
          }).catch(err => setOpenLoadingDialog(true))
        })
    }

    if (primeiroLogin) {
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
            if (status === 401) {
            } else if (status === 200) {
              setArea(data.data)
            }
          }).catch(err => setOpenLoadingDialog(false))
        })
    }

    if (fkUnidade) {
      carregarArea()
    }
  }, [fkUnidade])

  useEffect(() => {
    function carregarUsuariosNaoValidados() {
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/usuario/naovalidado/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            if (status === 401) {
              // alert('11')
            } else if (status === 200) {
              // alert(JSON.stringify(data))
              setUsuariosNaoValidados(data.data)
            }
          })
        })
    }


    if (logged && logged.Perfil && (logged.Perfil.nome === PerfilUtils.Gerente || logged.Perfil.nome === PerfilUtils.Coordenador)) {
      setInterval(carregarUsuariosNaoValidados, 1000)
    }
  }, [logged])


  useEffect(() => {
    function carregarAtividadesNaoAtribuidas() {
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/naoatribuida/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            if (status === 401) {
              // alert('11')
            } else if (status === 200) {
              setAtividadesNaoAtribuidas(data.data)
              setFkNaoAtrib(data.data.fkArea)
              // alert(JSON.stringify(naoAtrib))
              // setUsuariosNaoValidados(data.data)
            }
          })
        })
    }



    if (logged && logged.Perfil &&
      (logged.Perfil.nome === PerfilUtils.Gerente || logged.Perfil.nome === PerfilUtils.Coordenador)) {
      setInterval(carregarAtividadesNaoAtribuidas, 1000)
    }
  }, [logged])

  useEffect(() => {
    function carregarAtividadesRecebidas() {
      const token = getCookie('_token_task_manager')
      const params = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      fetch(`${process.env.REACT_APP_DOMAIN_API}/api/atividade/atividadesRecebidas/`, params)
        .then(response => {
          const { status } = response
          response.json().then(data => {
            if (status === 401) {
              // alert('11')
            } else if (status === 200) {
              setAtividadeRecebida(data.data)
              // alert(JSON.stringify(data))
              // setUsuariosNaoValidados(data.data)
            }
          })
        })
    }
    setInterval(carregarAtividadesRecebidas, 1000)
  }, [logged])


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
          if (status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if (status === 200) {
            // alert(JSON.stringify(data.data))
            setMessage(data.message)
            setOpenMessageDialog(true)
            setOpenDialogPrimeiroAcesso(false)
            // setArea(data.data)
          }
        }).catch(err => setOpenLoadingDialog(true))
      })
  }

  const actionsGerente = [
    <Tooltip title="Aprovação Equipe" placement="bottom">
      <IconButton size="large" color="inherit" id="positioned-user-notification-icon-button"
        onClick={(e) => {
          setAnchorElUserNotification(e.currentTarget)
          setOpenUserNotification(true)
        }}>
        <Badge badgeContent={usuariosNaoValidados.length} color="error">
          <ManageAccountsIcon />
        </Badge>
      </IconButton>
    </Tooltip>,
    <Tooltip Tooltip title="Aprovar Atividade" placement="bottom" >
      <IconButton size="small" color="inherit" id="positioned-msg-notification-icon-button"
        onClick={(e) => {
          setAnchorElAtividadeNaoAtribuidaNotification(e.currentTarget)
          setOpenAtividadeNaoAtribuidaNotification(true)
        }}>
        <Badge badgeContent={atividadesNaoAtribuidas.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip >,

    <Tooltip title="Chegou Atividade" placement="bottom">
      <IconButton size="large" color="inherit" id="positioned-newmsg-notification-icon-button"
        onClick={(e) => {
          setAnchorElAtividadeRecebidaNotification(e.currentTarget)
          setOpenAtividadeRecebidaNotification(true)
        }}>
        <Badge badgeContent={atividadesRecebida.length} color="error">
          <AutoAwesomeMotionIcon></AutoAwesomeMotionIcon>
        </Badge>
      </IconButton>
    </Tooltip>,

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
  const actionsCoordenador = [
    
    <Tooltip Tooltip title="Aprovar Atividade" placement="bottom" >
      <IconButton size="small" color="inherit" id="positioned-msg-notification-icon-button"
        onClick={(e) => {
          setAnchorElAtividadeNaoAtribuidaNotification(e.currentTarget)
          setOpenAtividadeNaoAtribuidaNotification(true)
        }}>
        <Badge badgeContent={atividadesNaoAtribuidas.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip >,

    <Tooltip title="Chegou Atividade" placement="bottom">
      <IconButton size="large" color="inherit" id="positioned-newmsg-notification-icon-button"
        onClick={(e) => {
          setAnchorElAtividadeRecebidaNotification(e.currentTarget)
          setOpenAtividadeRecebidaNotification(true)
        }}>
        <Badge badgeContent={atividadesRecebida.length} color="error">
          <AutoAwesomeMotionIcon></AutoAwesomeMotionIcon>
        </Badge>
      </IconButton>
    </Tooltip>,

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

  const actionsFuncionario = [

    <Tooltip title="Chegou Atividade" placement="bottom">
      <IconButton size="large" color="inherit" id="positioned-newmsg-notification-icon-button"
        onClick={(e) => {
          setAnchorElAtividadeRecebidaNotification(e.currentTarget)
          setOpenAtividadeRecebidaNotification(true)
        }}>
        <Badge badgeContent={atividadesRecebida.length} color="error">
          <AutoAwesomeMotionIcon></AutoAwesomeMotionIcon>
        </Badge>
      </IconButton>
    </Tooltip>,

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
  const menu = <IconButton style={{ backgroundColor: '#2c73d1', color:'#f0f2f5' }} onClick={() => setOpenDrawer(true)} size="large" edge="start"  aria-label="menu" sx={{ mr: 2 }}>
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
        <div style={{ width: 120, display: 'flex', flexDirection: 'row' }}>
          <AccountBoxIcon />
          <div style={{ paddingLeft: 16 }}>Meu Perfil</div>
        </div>
      </MenuItem>
      <MenuItem onClick={() => {
        setOpenAccountMenu(false)
        window.location.href = `${process.env.REACT_APP_DOMAIN}/logout`
      }} disableRipple>
        <div style={{ width: 120, display: 'flex', flexDirection: 'row' }}>
          <LogoutIcon />
          <div style={{ paddingLeft: 16 }}>Sair</div>
        </div>
      </MenuItem>
    </Menu>
  );


  const renderUserNotification = (
    <Menu
      anchorEl={anchorElUserNotification}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="positioned-use-notification"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openUserNotification}
      onClose={() => setOpenUserNotification(false)}
    >
      {usuariosNaoValidados.map((item, index) => <UserNotificationItem key={index} item={item} />)}
    </Menu>
  );

  const renderNaoAtribuidosNotification = (
    <Menu
      anchorEl={anchorElAtividadeNaoAtribuidaNotification}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="positioned-naoAtribuido-notification"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openAtividadeNaoAtribuidaNotification}
      onClose={() => setOpenAtividadeNaoAtribuidaNotification(false)}
    >
      {atividadesNaoAtribuidas.map((item, index) => <AtividadeNotificationItem key={index} item={item} />)}
    </Menu>
  );

  const renderAtividadeRecebida = (
    <Menu
      anchorEl={anchorElAtividadeReceidaNotification}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id="positioned-recebido-notification"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openAtividadeRecebidaNotification}
      onClose={() => setOpenAtividadeRecebidaNotification(false)}
    >
      {atividadesRecebida.map((item, index) => <AtividadeRecebidaNotificationItem key={index} item={item} />)}
    </Menu>

  );


  useEffect(() => {
    const closeDrawerAfterAFewSecounds = () => {
      setTimeout(() => {
        setOpenDrawer(false)
      }, 200)

    }

    closeDrawerAfterAFewSecounds()
  }, [])





  return (
    <MasterPageContainer>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText   style={{ fontSize: 14, color: '#2c73d1' }} primary='Home' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/home`} />
              </ListItemButton>
            </ListItem>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >

                <Typography style={{ fontSize: 14, color: '#2c73d1' }}>Atividades Solicitadas<ArrowForwardIcon style={{color:'FFA500'}}></ArrowForwardIcon></Typography>
              </AccordionSummary>
              <AccordionDetails>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CampaignIcon style={{color:'FFA500'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Solicitar Atividade' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/cadastro`} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/chamadosAbertos/`}>
                    <ListItemIcon>
                      <FormatListNumberedIcon style={{color:'FFA500'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Minhas Solicitações' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/solicitadasSetor/`}>
                    <ListItemIcon>
                      <LeaderboardIcon style={{color:'FFA500'}} />
                    </ListItemIcon>
                    <ListItemText primary='Solicitações do Setor' />
                  </ListItemButton>
                </ListItem>

              </AccordionDetails>
            </Accordion>


            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >

                <Typography style={{ fontSize: 14, color: '#2c73d1' }}>Atividades Recebidas <ArrowBackIcon style={{color:'FFA500'}} /></Typography>
              </AccordionSummary>
              <AccordionDetails>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividades/`}>
                    <ListItemIcon>
                      <PlaylistAddCheckIcon  style={{color:'FFA500'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Minha lista de Execução' />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/minhasAtividadesArquivadas/`}>
                    <ListItemIcon>
                      <AddTaskIcon  style={{color:'FFA500'}}/>
                    </ListItemIcon>
                    <ListItemText primary='Fora da lista de execução' />
                  </ListItemButton>
                </ListItem>




                <ListItem disablePadding>
                  <ListItemButton onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/recebidasSetor/`}>
                    <ListItemIcon>
                      <LeaderboardIcon style={{color:'FFA500'}} />
                    </ListItemIcon>
                    <ListItemText primary='Recebidas do Setor' />
                  </ListItemButton>
                </ListItem>

              </AccordionDetails>
            </Accordion>





            {/* <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary='Equipe' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/equipe`} />
              </ListItemButton>
            </ListItem> */}



            {
              logged && logged.validado && logged.Perfil.nome === PerfilUtils.Administrador ?
                <>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <PhonelinkSetupIcon />
                      </ListItemIcon>
                      <ListItemText primary='Configuração' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/configuracao`} />
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
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <HomeWorkIcon />
                      </ListItemIcon>
                      <ListItemText primary='Unidade' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/unidade`} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBalanceIcon />
                      </ListItemIcon>
                      <ListItemText primary='Área' onClick={() => window.location.href = `${process.env.REACT_APP_DOMAIN}/area`} />
                    </ListItemButton>
                  </ListItem>
                </> : ''
            }
          </List>
        </Box>
      </Drawer>
      <CssBaseline />

      {logged && logged.Perfil && (logged.Perfil.nome === PerfilUtils.Gerente
        || logged.Perfil.nome === PerfilUtils.Administrador) ?
        <Toolbar
          menu={menu}
          title='Atividades- Gerente'
          actions={actionsGerente} />
        :
        ''

      }
         {logged && logged.Perfil && ( logged.Perfil.nome === PerfilUtils.Coordenador) ?
        <Toolbar
          menu={menu}
          title='Atividades- Coordenador'
          actions={actionsCoordenador} />
        :
        ''

      }
         {logged && logged.Perfil && (logged.Perfil.nome === PerfilUtils.Funcionário) ?
        <Toolbar
          menu={menu}
          title='Atividades- Funcionário'
          actions={actionsFuncionario} />
        :
       ''
      }
     
      {renderMenu}
      {renderUserNotification}
      {renderNaoAtribuidosNotification}
      {renderAtividadeRecebida}
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
            path="/configuracao"
            render={(props) => <ConfiguracaoForm {...props} logged={logged} />}
          />

          <Route
            exact
            path="/atividade/:id/edit"
            render={(props) => <AtividadeForm {...props} logged={logged} />}
          />

          <Route
            exact
            path="/atividade/cadastro"
            render={(props) => <AtividadeForm {...props} logged={logged} />}
          />

          <Route
            exact
            path="/minhasAtividades"
            render={(props) => <MinhasAtividades {...props} logged={logged} />}
          />

          <Route
            exact
            path="/minhasAtividadesArquivadas"
            render={(props) => <MinhasAtividadesArquivadas {...props} logged={logged} />}
          />

          <Route
            exact
            path="/todasAsPendencias"
            render={(props) => <TodasAsPendencias {...props} logged={logged} />}
          />

          <Route
            exact
            path="/chamadosAbertos"
            render={(props) => <ChamadosAbertos {...props} logged={logged} />}
          />



          <Route
            exact
            path="/recebidasSetor"
            render={(props) => <RecebidasSetor {...props} logged={logged} />}
          />

          <Route
            exact
            path="/solicitadasSetor"
            render={(props) => <SolicitadasSetor {...props} logged={logged} />}
          />


          <Route
            exact
            path="/unidade"
            render={(props) => <Unidade {...props} logged={logged} />}
          />

          <Route
            exact
            path="/unidade/:id/edit"
            render={(props) => <UnidadeForm {...props} logged={logged} />}
          />

          <Route
            exact
            path="/unidade/cadastro"
            render={(props) => <UnidadeForm {...props} logged={logged} />}
          />



          <Route
            exact
            path="/area"
            render={(props) => <Area {...props} logged={logged} />}
          />

          <Route
            exact
            path="/area/:id/edit"
            render={(props) => <AreaForm {...props} logged={logged} />}
          />

          <Route
            exact
            path="/area/cadastro"
            render={(props) => <AreaForm {...props} logged={logged} />}
          />


          <Route
            exact
            path="/equipe"
            render={(props) => <Equipe {...props} logged={logged} />}
          />


          <Route
            exact
            path="/validar/:id"
            render={(props) => <ValidarUsuarioForm {...props} logged={logged} />}
          />

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
            <FormControl fullWidth size="small" variant="standard" style={{ marginTop: 8 }}>
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
            <FormControl fullWidth size="small" variant="standard" style={{ marginTop: 16 }}>
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
            <FormControl fullWidth size="small" variant="standard" style={{ marginTop: 16 }}>
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
          <DialogContent style={{ width: 400 }}>
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
