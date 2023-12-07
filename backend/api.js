const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
	methods: 'GET',
	allowedHeaders: '*',
  }));
  app.get('/api/stock-data/:symbol', async (req, res) => {
	const symbol = req.params.symbol;
	const interval = req.query.interval || '1mo'; // Pega o intervalo da query, se não existir, usa '1mo'
	try {
	  const response = await axios.get(`https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?range=${interval}&interval=1d`);
	  res.json(response.data);
	} catch (error) {
	  console.error('Error fetching data from Yahoo Finance:', error.message);
	  res.status(500).json({ error: 'Internal Server Error', details: error.message });
	}
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
