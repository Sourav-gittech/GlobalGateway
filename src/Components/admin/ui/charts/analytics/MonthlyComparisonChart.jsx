import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Filler,
    Legend
);

export function MonthlyComparisonChart() {
    const chartData = useMemo(
        () => ({
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
                {
                    label: "2024",
                    data: [320, 380, 310, 420, 380, 450],
                    backgroundColor: "rgba(59, 130, 246, 0.8)",
                    borderColor: "#3b82f6",
                    borderWidth: 2,
                },
                {
                    label: "2023",
                    data: [280, 310, 290, 350, 320, 380],
                    backgroundColor: "rgba(100, 116, 139, 0.5)",
                    borderColor: "#64748b",
                    borderWidth: 2,
                },
            ],
        }),
        []
    );

    const chartOptions = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    align: "end",
                    labels: {
                        color: "#94a3b8",
                        padding: 15,
                        font: { size: 11, weight: "500" },
                        usePointStyle: true,
                        pointStyle: "circle",
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: "rgba(17, 24, 39, 0.95)",
                    titleColor: "#fff",
                    bodyColor: "#cbd5e1",
                    borderColor: "rgba(59, 130, 246, 0.3)",
                    borderWidth: 1,
                    padding: 12,
                    bodyFont: { size: 13, weight: "600" },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#94a3b8",
                        font: { size: 11, weight: "500" },
                        padding: 8,
                    },
                    grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false },
                    border: { display: false },
                },
                y: {
                    ticks: {
                        color: "#94a3b8",
                        font: { size: 11, weight: "500" },
                        padding: 8,
                    },
                    grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false },
                    border: { display: false },
                    beginAtZero: true,
                },
            },
            animation: { duration: 750, easing: "easeInOutQuart" },
        }),
        []
    );

    return (
        <div className="w-full h-full min-h-[250px]">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}