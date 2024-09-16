const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT || 3000
const server = require('./server')

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, 'hello')
    t.end()
  })
})

tape('should respond user-agent', (t) => {
  const opts = { headers: { 'User-Agent': 'tape' } }
  jsonist.get(`${urlBase}/user-agent`, opts, (err, body) => {
    if (err) t.error(err)

    t.equal(body.ua, 'tape')
    t.end()
  })
})

tape('should respond base64', (t) => {
  const encoded = Buffer.from('myphrase').toString("base64") 
  jsonist.get(`${urlBase}/b64/myphrase`,  (err, body) => {
    if (err) t.error(err)

    t.equal(body.b64, encoded)
    t.end()
  })
})


tape('cleanup', function (t) {
  server.close()
  t.end()
})
