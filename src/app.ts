import app from './server'

function run () {
  try {
    const PORT = 3354
    const HOST = '0.0.0.0'

    app.listen(PORT, HOST, () => {
      console.log(`The server is running on port ${PORT}`)
    })
  } catch (err) {
    run()
    console.log(err)
  }
}

run()
