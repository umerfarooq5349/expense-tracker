import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { prepareChartData, chartColors } from './data';


ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




export const ExpenseCategoryChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('https://expense-tracker-backend-gray-one.vercel.app/api/transections'); // Replace with your API URL
                const transactions = response.data.message;
                const data = prepareChartData(transactions);
                setChartData(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Expenses and Income by Category',
                font: {
                    size: 20,
                    weight: 'bold',
                },
                color: chartColors.green,
            },
            legend: {
                labels: {
                    color: chartColors.black,
                },
            },
        },
        scales: {
            x: {
                ticks: {

                    color: chartColors.black,
                },
            },
            y: {
                ticks: {
                    color: chartColors.black,
                },
            },
        },

        layout: {
            padding: 20,
        },
        elements: {

            bar: {
                borderColor: chartColors.green,
            },
        },


    };

    return <Bar data={chartData} options={options} />;
};
