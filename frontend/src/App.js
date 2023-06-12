import React, { useEffect, useState } from "react";
import TableInvest from "./component/TableInvest";
import InformationUser from "./component/InformationUser";
import Nav from "react-bootstrap/Nav";
import Charts from "./component/Charts";
import "./App.css";

function App() {
  const [investmentData, setInvestmentData] = useState([]);
  const [start_month, setStartMonth] = useState("2022-01-01");
  const [interval, setInterval] = useState("1mo");
  const [investment, setInvestment] = useState(1000);
  const [error, setError] = useState("");

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
        console.log(data);
        setError("");
      } else {
        setError("Invalid start month format. Please use YYYY-MM-DD.");
      }
    } catch (error) {
      console.error("Error fetching investment data:", error);
      setError("Failed to fetch investment data. Please try again later.");
    }
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Investment performance</h1>
      </div>
      <InformationUser
        interval={interval}
        investment={investment}
        start_month={start_month}
        setInterval={setInterval}
        setStartMonth={setStartMonth}
        setInvestment={setInvestment}
      ></InformationUser>
      <div className="body">
        <TableInvest investmentData={investmentData}></TableInvest>
        <Charts data={investmentData}></Charts>
      </div>
    </div>
  );
}

export default App;
