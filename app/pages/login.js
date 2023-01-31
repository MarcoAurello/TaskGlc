import * as React from 'react'
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
import Image from 'next/image'
import Dialog from '@mui/material/Dialog'
import { CircularProgress } from '@mui/material'

const theme = createTheme()

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [openDialog, setOpenDialog] = React.useState(false)

  const btEntrar = () => {
    setOpenDialog(true)
    fetch('http://localhost:3333/api/authentication/', { method: 'POST', mode: 'cors', body: { password, email } })
      .then(response => {
        setOpenDialog(false)
        alert(JSON.stringify(response))
      })
      .catch(err => {
        setOpenDialog(false)
        alert(JSON.stringify(err))
      })
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
            backgroundImage: 'url(http://localhost:3000/bg-image.jpeg)',
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
            }}
          >
            <Image
              src='/senac_logo.png'
              height={64}
              width={120}
            />
            <Typography component="h1" variant="h5" style={{ marginTop: 16 }}>
              Task Manager
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar Acesso"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={btEntrar}
              >
                Entrar
              </Button>
              <div style={{ marginTop: 16, display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'rgb(117, 117, 117)', fontSize: 11 }}>@2023</div>
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
    </ThemeProvider>
  )
}

export default Login
