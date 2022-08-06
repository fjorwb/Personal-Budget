const envelopes = [
  { name: 'grocery', amount: 1000 },
  { name: 'gas', amount: 400 },
  { name: 'transportation', amount: 200 }
]
let totalBudget = 0

const getEnvelopes = (req, res) => {
  res.status(200).send(envelopes)
}

const getEnvelopeByName = (req, res) => {
  const { name } = req.params
  console.log(name)
  const envelope = envelopes.find(env => env.name === name)
  if (!envelope) {
    res.status(404).send('Envelope not found')
  } else {
    res.status(200).send(envelope)
  }
}

const createEnvelope = (req, res) => {
  const { name, amount } = req.body
  console.log(name, amount)

  envelopes.push({ name, amount })

  totalBudget += amount
  console.log(totalBudget)

  res.send(envelopes)
}

const updateEnvelope = (req, res) => {
  const { name } = req.params
  const { amount } = req.body

  const envelope = envelopes.find(env => env.name === name)
  if (!envelope) {
    res.status(404).send('Envelope not found')
  } else {
    envelope.amount = amount
    res.status(200).send(envelopes)
  }
}

const deleteEnvelope = (req, res) => {
  const { name } = req.params

  const envelope = envelopes.find(env => env.name === name)
  if (!envelope) {
    res.status(404).send('Envelope not found')
  } else {
    envelopes.splice(envelopes.indexOf(envelope), 1)
    res.status(200).send(envelopes)
  }
}

const transferMoney = (req, res) => {
  // console.log(req.query)
  const { from, to, amount } = req.query

  console.log(from, to, amount)

  const fromEnvelope = envelopes.find(env => env.name === from)
  const toEnvelope = envelopes.find(env => env.name === to)

  
  if (!fromEnvelope || !toEnvelope) {
    res.status(404).send('Envelope not found')
  } else {
    console.log(fromEnvelope, toEnvelope)
    fromEnvelope.amount -= Number(amount)
    toEnvelope.amount += Number(amount)
    res.status(200).send(envelopes)
  }
}

module.exports = { getEnvelopes, getEnvelopeByName, createEnvelope, updateEnvelope, deleteEnvelope, transferMoney }
