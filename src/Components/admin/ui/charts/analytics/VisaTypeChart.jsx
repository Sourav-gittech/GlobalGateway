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
import { Doughnut } from "react-chartjs-2";

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

export function VisaTypeChart() {
    const chartData = useMemo(
        () => ({
            labels: ["Work", "Student", "Tourist", "Family", "Business"],
            datasets: [
                {
                    label: "Applications by Type",
                    data: [1450, 980, 620, 450, 347],
                    backgroundColor: [
                        "rgba(59, 130, 246, 0.8)",
                        "rgba(16, 185, 129, 0.8)",
                        "rgba(6, 182, 212, 0.8)",
                        "rgba(245, 158, 11, 0.8)",
                        "rgba(139, 92, 246, 0.8)",
                    ],
                    borderColor: [
                        "#3b82f6",
                        "#10b981",
                        "#06b6d4",
                        "#f59e0b",
                        "#8b5cf6",
                    ],
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
            plugins: {
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        color: "#94a3b8",
                        padding: 15,
                        font: { size: 11, weight: "500" },
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
                    callbacks: {
                        label: function (context) {
                            return context.label + ": " + context.parsed.toLocaleString();
                        },
                    },
                },
            },
            animation: { duration: 750, easing: "easeInOutQuart" },
        }),
        []
    );

    return (
        <div className="w-full h-full min-h-[250px] flex items-center justify-center">
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
}