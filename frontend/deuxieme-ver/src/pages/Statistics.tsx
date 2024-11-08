import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Statistics: React.FC = () => {
    const lineDataHospitalisation = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Durée moyenne d\'hospitalisation (jours)',
                data: [5, 4.5, 6, 5.5, 6.2, 5.8],
                borderColor: '#4A90E2',
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                fill: true,
            },
        ],
    };

    const barDataTraitement = {
        labels: ['Grippe', 'H1N1', 'COVID-19', 'Varicelle'],
        datasets: [
            {
                label: 'Nombre de traitements',
                data: [300, 450, 800, 200],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
            },
        ],
    };

    const pieDataPersonnel = {
        labels: ['Médecins', 'Infirmières', 'Aides-soignants', 'Techniciens'],
        datasets: [
            {
                label: 'Répartition du personnel médical',
                data: [30, 50, 15, 5],
                backgroundColor: ['#4CAF50', '#FFEB3B', '#F44336', '#2196F3'],
            },
        ],
    };

    const doughnutDataAge = {
        labels: ['0-18 ans', '19-35 ans', '36-50 ans', '51-65 ans', '66+ ans'],
        datasets: [
            {
                label: 'Répartition des patients par âge',
                data: [15, 30, 25, 20, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#AB47BC'],
            },
        ],
    };

    return (
        <div className="container">
            <h2 className="title">Tableau de Bord des Statistiques</h2>

            {/* Disposition en grille pour le dashboard */}
            <div className="dashboard-grid">
                {/* Durée moyenne d'hospitalisation */}
                <div className="chart-card">
                    <h3 className="chart-title">Durée Moyenne d'Hospitalisation</h3>
                    <Line data={lineDataHospitalisation} />
                </div>

                {/* Nombre de traitements par type */}
                <div className="chart-card">
                    <h3 className="chart-title">Nombre de Traitements par Type</h3>
                    <Bar data={barDataTraitement} />
                </div>

                {/* Répartition du personnel médical */}
                <div className="chart-card">
                    <h3 className="chart-title">Répartition du Personnel Médical</h3>
                    <Pie data={pieDataPersonnel} />
                </div>

                {/* Répartition des patients par âge */}
                <div className="chart-card">
                    <h3 className="chart-title">Répartition des Patients par Tranche d'Âge</h3>
                    <Doughnut data={doughnutDataAge} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
