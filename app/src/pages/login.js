import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import isAutenticated from "../utils/isAuthenticated";
import { CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const ImageBackground = require('../assets/bg-image.jpeg')
const ImageLogo = require('../assets/senac_logo.png')


const theme = createTheme()

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [openMessageDialog, setOpenMessageDialog] = useState(false)
  const [message, setMessage] = useState('')
  const [autenticated, setAutenticated] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleCloseMessageDialog = () => setOpenMessageDialog(false)

  const btEntrar = () => {
    setOpenDialog(true)
    const params = { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        password, 
        email 
      }) 
    }

    fetch(`${process.env.REACT_APP_DOMAIN_API}/api/authentication/`, params)
      .then(response => {
        const { status } = response
        response.json().then(data => {
          setOpenDialog(false)
          if(status === 401) {
            setMessage(data.message)
            setOpenMessageDialog(true)
          } else if(status === 200) {
            document.cookie = `_token_task_manager=${data.token}`;
            window.location.href = `${process.env.REACT_APP_DOMAIN}/home`;
          }
        })
      })
  }

  useEffect(() => {
    isAutenticated().then((_) => {
      setAutenticated(_.logged);
      setVerified(true);
    });
  }, []);

  if (autenticated) {
    window.location.href = `${process.env.REACT_APP_DOMAIN}/home`;
  }

  if(!verified || autenticated) {
    return (
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <CircularProgress />
      </div>
    )
  }
  function baixar(){
    // window.location.href = `https://docs.google.com/presentation/d/1vnO8pXkGJIid6I-qdHTTXxySRzg-M13rrkwVNXH8l5I/edit?usp=sharing`
    // window.location.href = `${process.env.REACT_APP_DOMAIN}/atividade/${idChamado}/edit`
    // window.location.href = `https://drive.google.com/file/d/1igAx68w_HlhoeSytnvczEFoCDy0GGu3g/view?usp=share_link`, target=bla
    window.open('https://drive.google.com/file/d/1igAx68w_HlhoeSytnvczEFoCDy0GGu3g/view?usp=share_link', '_blank');
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImageBackground})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <img src={ImageLogo} height={64} />
            <Typography component="h1" variant="h5" style={{ marginTop: 16 }}>
              {process.env.REACT_APP_NAME}
            </Typography>
           
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
               
              <div>Login e senha é o mesmo do seu email @pe.senac.br</div>
              <Button
                fullWidth
                variant="contained" color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  baixar() }}
             
              >Leia o manual aqui antes de usar o Sistema</Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={btEntrar}
              >
                Entrar
              </Button>
             
              <div style={{ marginTop: 16, display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'rgb(117, 117, 117)', fontSize: 11 }}>GTI@2023</div>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openDialog}>
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
          <Button onClick={handleCloseMessageDialog}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default Login
