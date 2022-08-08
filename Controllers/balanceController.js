
const setBudget = (req, res) => {
  const { budget } = req.body

  if (!budget || budget < 0) {
    return res.status(400).send('Budget must be a positive number')
  } else {
    global.totalBudget = budget
    res.status(200).send(`Total budget set to ${budget}`)
  }
}

const getBalance = (req, res) => {
  // const total = 0
  let expenses = 0
  let totalEnvelopes = 0

  console.log(global.envelopes)

  totalEnvelopes = global.envelopes.reduce((acc, curr) => {
    return acc + curr.amount
  }, 0)

  console.log(totalEnvelopes)

  expenses = global.expenses.reduce((acc, curr) => {
    return acc + curr.amount
  }, 0)

  res.status(200).send(`Total budget: ${global.totalBudget}
  \nTotal expenses: ${expenses}
  \nTotal balance: ${global.totalBudget - expenses}`)
}

module.exports = { setBudget, getBalance }
