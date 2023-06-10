import React, { useEffect, useState } from 'react';

function App() {
  const [investmentData, setInvestmentData] = useState([]);
  const [start_month, setStartMonth] = useState("1990-01-01");
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInvestmentData();
  }, [start_month]);

  const fetchInvestmentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/investments?start_month=${start_month}&monthly_investment=1000`
      );

      if (response.ok) {
        const data = await response.json();
        setInvestmentData(data);
        setError('');
      } else {
        setError('Invalid start month format. Please use YYYY-MM-DD.');
      }
    } catch (error) {
      console.error('Error fetching investment data:', error);
      setError('Failed to fetch investment data. Please try again later.');
    }
  };

  function handleInputChange(event) {
    setStartMonth(event.target.value)
  }

  return (
    <div className="App">
      <h1>Investment Data</h1>
      <input type="text" value={start_month} onChange={handleInputChange}>

      </input>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Invested</th>
            <th>Total Net</th>
          </tr>
        </thead>
        <tbody>
          {investmentData.map((investment) => (
            <tr key={investment.date} style={{ background: investment.total_invested >= investment.total_net ? 'red' : 'green' }}>
              <td>{investment.date}</td>
              <td>{investment.total_invested}</td>
              <td>{investment.total_net}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
