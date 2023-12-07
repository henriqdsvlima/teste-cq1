const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

app.use(cors({
	methods: 'GET',
	allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.get('/api/stock-data/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const response = await axios.get(`https://query2.finance.yahoo.com/v8/finance/chart/${symbol}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Yahoo Finance:');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
