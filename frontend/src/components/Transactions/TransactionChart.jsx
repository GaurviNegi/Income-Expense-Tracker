import React from "react";
import {useQuery} from "@tanstack/react-query"
import { Chart as ChartJS, ArcElement, Tooltip ,Legend} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionAPI } from "../API/transactions/transactionServices";


ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
    const {
        data: transactions,
        isError,
        isSuccess,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["list-transactions"],
        queryFn: listTransactionAPI,
      });


      //function calculating total
      const total = transactions?.reduce((acc , transaction)=>{
        if(transaction?.type==="income"){
            acc.income += transaction?.amount;
        }
        else{
            acc.expense += transaction?.amount
        }
        return acc;
      },{income:0 , expense:0});

      //data structure for the chart 
      const data = {
        labels:["Income","Expense"],
        datasets:[
            {
                label:'Transactions',
                data:[total?.income , total?.expense],
                backgroundColor:["#36A2EB" , "#FF6384"],
                borderColor:["#36A2EB" , "#FF6384"],
                borderWidth:1,
                hoverOffset:4
            }
        ]
      }

      const options={
        maintainAspectRatio:false,
        plugins:{
          legend:{
            position:"bottom",
            labels:{
                padding:25,
                boxWidth:12,
                font:{
                    size:14
                }
            }
          },

          title:{
            display:true,
            text:"Income vs Expenses",
            font:{
                size:18,
                weight:"bold"
            },
            padding:{
                top:10,
                bottom:30
            }
          }
       },
        cutout:"70%"
      }
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}><Doughnut data={data} options={options}  /></div>
    </div>
  );
};

export default TransactionChart;