import React, { useEffect, useState } from 'react';

function App() {
  const [investmentData, setInvestmentData] = useState([]);
  const [start_month, setStartMonth] = useState("2000-01-01");
  const [interval, setInterval] = useState("1mo");
  const [investment, setInvestment] = useState(1000);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInvestmentData();
  }, [start_month, interval, investment]);

  const fetchInvestmentData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/investments?start_month=${start_month}&investment=${investment}&interval=${interval}`
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
    setStartMonth(event.target.value);
  }

  function handleIntervalChange(event) {
    setInterval(event.target.value);
  }

  function handleInvestmentChange(event) {
    setInvestment(event.target.value);
  }

  return (
    <div className="App">
      <h1>Investment performance</h1>
      <div>
        <label htmlFor="startMonth">From date:</label>
        <input
          type="text"
          id="startMonth"
          value={start_month}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="investment">Investment:</label>
        <input
          type="number"
          id="investment"
          value={investment}
          onChange={handleInvestmentChange}
        />
      </div>
      <div>
        <label htmlFor="interval">Interval:</label>
        <select id="interval" value={interval} onChange={handleIntervalChange}>
          <option value="1d">1d</option>
          <option value="1wk">1wk</option>
          <option value="1mo">1mo</option>
          <option value="3mo">3mo</option>
        </select>
      </div>
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
            <tr
              key={investment.date}
              style={{
                background:
                        investment.total_invested.length === investment.total_net.length
        ? investment.total_invested >= investment.total_net
          ? 'red'
          : 'green'
        : investment.total_invested.length > investment.total_net.length
        ? 'red'
        : 'green',
              }}
            >
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
