import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TableInvest.css";
import Card from "react-bootstrap/Card";

function TableInvest(props) {
  return (
    <Card
      style={{
        margin: "10px",
        overflowY: "scroll",
        width: "50%",
        height: "40rem",
      }}
    >
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Invested</th>
            <th>Total Net</th>
          </tr>
        </thead>
        <tbody>
          {props.investmentData.map((investment) => (
            <tr
              key={investment.date}
              className={
                investment.total_invested.length === investment.total_net.length
                  ? investment.total_invested >= investment.total_net
                    ? "red"
                    : "green"
                  : investment.total_invested.length >
                    investment.total_net.length
                  ? "red"
                  : "green"
              }
            >
              <td>{investment.date}</td>
              <td>{investment.total_invested}</td>
              <td>{investment.total_net}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default TableInvest;
