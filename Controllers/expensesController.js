
const getExpenses = (req, res) => {
  res.send(global.expenses)
}

const createExpense = (req, res) => {
  const { name, amount } = req.body

  if (!name || !amount) {
    return res.status(400).send('Name and amount are required')
  } else if (amount < 0) {
    return res.status(400).send('Amount must be a positive number')
  } else {
    const op = Object.keys(global.expenses).reduce((max, op) => Math.max(max, op), 0) + 2

    global.expenses.push({ op, name, amount })
    res.status(200).send(`Expense created: ${name} - ${amount}`)
  }
}

const updateExpense = (req, res) => {
  const { id } = req.params
  const { amount } = req.body

  if (!amount) {
    return res.status(400).send('Name and amount are required')
  } else if (amount < 0) {
    return res.status(400).send('Amount must be a positive number')
  } else {
    const expense = global.expenses.find(ex => ex.op === Number(id))
    if (!expense) {
      return res.status(404).send('Expense not found')
    } else {
      console.log(expense.op, expense.name, expense.amount)
      global.expenses[expense.op] = { op: expense.op, name: expense.name, amount }

      res.status(200).send(`expense updated: name: ${expense.name} / amount: ${amount}`)
    }
  }
}

const deleteExpense = (req, res) => {
  const { id } = req.params

  const expense = Object.values(global.expenses).find(ex => ex.op === Number(id))
  if (!expense) {
    return res.status(404).send('Expense not found')
  } else {
    global.expenses.splice(global.expenses.indexOf(expense), 1)

    res.status(200).send(`expense deleted: ${expense.name} - ${expense.amount}`)
  }
}

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense }
