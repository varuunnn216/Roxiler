##First, initialize your project by creating a new folder and running the following commands:

npm init -y
npm install express sequelize pg pg-hstore body-parser cors axios

##Then, create a file called server.js and set up the basic server structure:

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
 res.send('Hello World!');
});

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});
Create the database initialization function:
javascript
Download
Copy code
const initDB = async () => {
 try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

 } catch (error) {
    console.error('Error fetching transactions:', error);
 }
};

initDB();


##Create the APIs for listing all transactions, getting statistics, bar chart, pie chart, and the combined API:

const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.get('/transactions', async (req, res) => {
 try {
    // Replace with actual database call
    const transactions = await getTransactionsFromDatabase();
    res.json(transactions);
 } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions');
 }
});

app.get('/statistics', async (req, res) => {
 try {
    // Replace with actual database call
    const statistics = await getStatisticsFromDatabase();
    res.json(statistics);
 } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).send('Error fetching statistics');
 }
});

app.get('/bar-chart', async (req, res) => {
 try {
    // Replace with actual database call
    const barChartData = await getBarChartDataFromDatabase();
    res.json(barChartData);
 } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).send('Error fetching bar chart data');
 }
});

app.get('/pie-chart', async (req, res) => {
 try {
    // Replace with actual database call
    const pieChartData = await getPieChartDataFromDatabase();
    res.json(pieChartData);
 } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).send('Error fetching pie chart data');
 }
});

app.get('/combined', async (req, res) => {
 try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get('http://localhost:3000/transactions'),
      axios.get('http://localhost:3000/statistics'),
      axios.get('http://localhost:3000/bar-chart'),
      axios.get('http://localhost:3000/pie-chart'),
    ]);

    res.json({ transactions, statistics, barChart, pieChart });
 } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).send('Error fetching combined data');
 }
});

const getTransactionsFromDatabase = async () => {
 // Add your logic to fetch transactions from the database here
};

const getStatisticsFromDatabase = async () => {
 // Add your logic to fetch statistics from the database here
};

const getBarChartDataFromDatabase = async () => {
 // Add your logic to fetch bar chart data from the database here
};

const getPieChartDataFromDatabase = async () => {
 // Add your logic to fetch pie chart data from the database here
};

app.listen(3000, () => {
 console.log('Server is running on port 3000');
});
