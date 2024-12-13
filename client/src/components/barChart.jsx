import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { prepareChartData, chartColors } from './data';

// Register chart.js components
ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Color palette


export const ExpenseCategoryChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/transections'); // Replace with your API URL
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
        // Set chart background color to white
        layout: {
            padding: 20,
        },
        elements: {
            // Optional: Set border color for the bars
            bar: {
                borderColor: chartColors.green,
            },
        },
        // Set chart background to white
        backgroundColor: '#ecb365',
    };

    return <Bar data={chartData} options={options} />;
};
