const initDB = async () => {
 try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Add your database seeding logic here

 } catch (error) {
    console.error('Error fetching transactions:', error);
 }
};

initDB();
