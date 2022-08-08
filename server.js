const express = require('express')

const app = express()
// const router = express.Router()

global.totalBudget = 0

global.envelopes = [
  { name: 'grocery', amount: 1000 },
  { name: 'gas', amount: 400 },
  { name: 'transportation', amount: 200 }
]

global.expenses = [
  { op: 1, name: 'grocery', amount: 100 },
  { op: 2, name: 'gas', amount: 50 },
  { op: 3, name: 'transportation', amount: 20 }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerEnvelopes = require('./Routes/EnvelopeRouter')
const routerBalance = require('./Routes/BalanceRouter')
const routerExpenses = require('./Routes/ExpensesRouter')

app.use('/env', routerEnvelopes)
app.use('/budget', routerBalance)
app.use('/expenses', routerExpenses)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
})

// module.exports = { app, envelopes, totalBudget }
