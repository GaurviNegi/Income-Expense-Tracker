import React from "react";
import TransactionList from "../Transactions/TransactionList";
import TransactionChart from "../Transactions/TransactionChart";


const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionList/>
    </>
  );
};

export default Dashboard;