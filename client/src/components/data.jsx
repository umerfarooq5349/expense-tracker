export const chartColors = {
  yellow: "#f5d202",
  green: "#53ad75",
  white: "#f9f9f9",
  black: "#232323"
};

export const prepareChartData = (transactions) => {
  const expensesByCategory = {};
  const incomeByCategory = {};

  transactions.forEach(transaction => {
    const amount = parseFloat(transaction.amount);
    if (!isNaN(amount)) {
      if (transaction.type === 'expense') {
        expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] || 0) + amount;
      } else if (transaction.type === 'income') {
        incomeByCategory[transaction.category] = (incomeByCategory[transaction.category] || 0) + amount;
      }
    }
  });


  const categories = Array.from(new Set([
    ...Object.keys(expensesByCategory),
    ...Object.keys(incomeByCategory),
  ]));

  // Create datasets for chart
  const expenseData = categories.map(category => expensesByCategory[category] || 0);
  const incomeData = categories.map(category => incomeByCategory[category] || 0);

  return {

    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: chartColors.yellow,

      },
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: chartColors.green,

      },
    ],
  };
};
