// Statistics.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Statistics: React.FC = () => {
    interface ChartData {
        labels: string[];
        datasets: { label: string; data: number[]; borderColor?: string; backgroundColor: string | string[]; fill?: boolean }[];
    }

    const [lineData, setLineData] = useState<ChartData>({
        labels: [],
        datasets: [{ label: 'Durée moyenne d\'hospitalisation (jours)', data: [], borderColor: '#4A90E2', backgroundColor: 'rgba(74, 144, 226, 0.2)', fill: true }],
    });

    const [barData, setBarData] = useState<ChartData>({
        labels: [],
        datasets: [{ label: 'Nombre de traitements', data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'] }],
    });

    const [pieData, setPieData] = useState<ChartData>({
        labels: [],
        datasets: [{ label: 'Répartition du personnel médical', data: [], backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336', '#2196F3'] }],
    });

    const [doughnutData, setDoughnutData] = useState<ChartData>({
        labels: [],
        datasets: [{ label: 'Répartition des patients par âge', data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#AB47BC'] }],
    });

    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                const lineResponse = await axios.get('/api/Statistics/hospitalization/current');
                setLineData({
                    labels: lineResponse.data.months,
                    datasets: [{ ...lineData.datasets[0], data: lineResponse.data.values }]
                });

                const bestTreatmentResponse = await axios.get('/api/Statistics/bestTreatment');
                const leastTreatmentResponse = await axios.get('/api/Statistics/leastTreatment');
                setBarData({
                    labels: ['Meilleur traitement', 'Moins utilisé'],
                    datasets: [{ ...barData.datasets[0], data: [bestTreatmentResponse.data.value, leastTreatmentResponse.data.value] }]
                });

                const personnelResponse = await axios.get('/api/Personnel/statistics/distribution'); // Exemple d'URL
                setPieData({
                    labels: personnelResponse.data.roles,
                    datasets: [{ ...pieData.datasets[0], data: personnelResponse.data.values }]
                });

                const ageDistributionResponse = await axios.get('/api/Statistics/ageDistribution');
                setDoughnutData({
                    labels: ageDistributionResponse.data.ageGroups,
                    datasets: [{ ...doughnutData.datasets[0], data: ageDistributionResponse.data.values }]
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données de statistiques :", error);
            }
        };

        fetchStatisticsData();
    }, []);

    return (
        <div className="container">
            <h2 className="title">Tableau de Bord des Statistiques</h2>

            <div className="dashboard-grid">
                <div className="chart-card">
                    <h3 className="chart-title">Durée Moyenne d'Hospitalisation</h3>
                    <Line data={lineData} />
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Nombre de Traitements par Type</h3>
                    <Bar data={barData} />
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Répartition du Personnel Médical</h3>
                    <Pie data={pieData} />
                </div>

                <div className="chart-card">
                    <h3 className="chart-title">Répartition des Patients par Tranche d'Âge</h3>
                    <Doughnut data={doughnutData} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
