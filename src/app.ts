import app from './server'

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
