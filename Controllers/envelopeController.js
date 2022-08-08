
const getEnvelopes = (req, res) => {
  res.status(200).send(global.envelopes)
}

const getEnvelopeByName = (req, res) => {
  const { name } = req.params
  console.log(name)
  const envelope = global.envelopes.find(env => env.name === name)
  if (!envelope) {
    res.status(404).send('Envelope not found')
  } else {
    res.status(200).send(envelope)
  }
}

const createEnvelope = (req, res) => {
  const { name, amount } = req.body
  console.log(name, amount)

  global.envelopes.push({ name, amount })

  global.totalBudget += amount
  console.log(global.totalBudget)

  res.send(global.envelopes)
}

const updateEnvelope = (req, res) => {
  const { name } = req.params
  const { amount } = req.body

  const envelope = global.envelopes.find(env => env.name === name)
  if (!envelope) {
    res.status(404).send('Envelope not found')
  } else {
    envelope.amount = amount
    res.status(200).send(global.envelopes)
  }
}

const deleteEnvelope = (req, res) => {
  const { name } = req.params

  const envelope = global.envelopes.find(env => env.name === name)
  if (!envelope) {
    res.status(404).send('Envelope not found')
  } else {
    global.envelopes.splice(global.envelopes.indexOf(envelope), 1)
    res.status(200).send(global.envelopes)
  }
}

const transferMoney = (req, res) => {
  // console.log(req.query)
  const { from, to, amount } = req.query

  console.log(from, to, amount)

  const fromEnvelope = global.envelopes.find(env => env.name === from)
  const toEnvelope = global.envelopes.find(env => env.name === to)

  if (!fromEnvelope || !toEnvelope) {
    res.status(404).send('Envelope not found')
  } else {
    console.log(fromEnvelope, toEnvelope)
    fromEnvelope.amount -= Number(amount)
    toEnvelope.amount += Number(amount)
    res.status(200).send(global.envelopes)
  }
}

module.exports = { getEnvelopes, getEnvelopeByName, createEnvelope, updateEnvelope, deleteEnvelope, transferMoney }
