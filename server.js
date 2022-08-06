const express = require('express')

const { createEnvelope, getEnvelopes, getEnvelopeByName, updateEnvelope, deleteEnvelope, transferMoney } = require('./controllers/envelopeController')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.use('/env', router)

app.get('/', getEnvelopes)
app.get('/:name', getEnvelopeByName)
app.post('/', createEnvelope)
app.put('/:name', updateEnvelope)
app.delete('/:name', deleteEnvelope)
app.post('/transfer', transferMoney)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
})
