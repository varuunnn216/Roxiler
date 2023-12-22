import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import Chart from 'react-google-charts';

const Dashboard = () => {
 const [selectedMonth, setSelectedMonth] = useState(2); // default is March (2)
 const [transactions, setTransactions] = useState([]);
 const [totalSale, setTotalSale] = useState(0);
 const [totalSoldItems, setTotalSoldItems] = useState(0);
 const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
 const [barChartData, setBarChartData] = useState([]);
 const [pieChartData, setPieChartData] = useState([]);
 const [searchText, setSearchText] = useState('');
 const [currentPage, setCurrentPage] = useState(0);

 const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
 ];

 const fetchTransactions = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchText}`
    );
    setTransactions(data);
 };

 const fetchStatistics = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/statistics?month=${selectedMonth}`
    );
    setTotalSale(data.totalAmountOfSale);
    setTotalSoldItems(data.totalSoldItems);
    setTotalNotSoldItems(data.totalNotSoldItems);
 };

 const fetchBarChartData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/bar-chart?month=${selectedMonth}`
    );
    setBarChartData(data);
 };

 const fetchPieChartData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/pie-chart?month=${selectedMonth}`
    );
    setPieChartData(data);
 };

 useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
    fetchPieChartData();
 }, [selectedMonth, currentPage, searchText]);

 const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
 };

 const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
 };

 const handleSearch = (e) => {
    setSearchText(e.target.value);
 };

 const handleClearSearch = () => {
    setSearchText('');
 };

 return (
    <div>
      <div>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <button onClick={handleClearSearch}>Clear</button>
      </div>
      <MaterialTable
        title="Transactions"
        data={transactions}
        columns={[
          { title: 'Title', field: 'title' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price', type: 'numeric' },
        ]}
        options={{ pageSizeOptions: [10, 20, 50], pageSize: 10 }}
        actions={[
          {
            icon: 'navigate_before',
            tooltip: 'Previous Page',
            isFreeAction: true,
            onClick: handlePreviousPage,
          },
          {
            icon: 'navigate_next',
            tooltip: 'Next Page',
            isFreeAction: true,
            onClick: handleNextPage,
          },
        ]}
      />
      <div>
        <h3>Total Sale: {totalSale}</h3>
        <h3>Total Sold Items: {totalSoldItems}</h3>
        <h3>Total Not Sold Items: {totalNotSoldItems}</h3>
      </div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={[['Item', 'Amount Sold'], ...barChartData]}
      />
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={[['Item', 'Amount Sold'], ...pieChartData]}
      />
    </div>
 );
};

export default Dashboard;

// This component handles state management and renders a table, charts, and various stats for transactions in a specific month. The state of the component is managed using the useState and useEffect hooks provided by React.

// Please make sure to install the required dependencies:

npm install axios react-google-charts material-table

// This implementation uses MaterialTable for displaying transaction data in a table format, and react-google-charts for rendering charts. Axios is used for making HTTP requests to fetch the data from the server.
