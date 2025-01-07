// components/ReportsDashboard.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { getPopularRoutes, getAverageBookingValue, getCancellationRate, getUserActivity } from '../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const ReportsDashboard = () => {
    const [popularRoutes, setPopularRoutes] = useState([]);
    const [averageBookingValue, setAverageBookingValue] = useState(null);
    const [cancellationRate, setCancellationRate] = useState(null);
    const [userActivity, setUserActivity] = useState([]);

    useEffect(() => {
        // Fetch data from API using the service functions
        const fetchReports = async () => {
            try {
                const routesData = await getPopularRoutes();
                const averageValueData = await getAverageBookingValue();
                const cancellationRateData = await getCancellationRate();
                const userActivityData = await getUserActivity();

                setPopularRoutes(routesData);
                setAverageBookingValue(averageValueData);
                setCancellationRate(cancellationRateData);
                setUserActivity(userActivityData);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, []);

    const popularRoutesData = {
        labels: popularRoutes.map(route => `${route._id.departure} → ${route._id.arrival}`),
        datasets: [{
            label: 'Bookings Count',
            data: popularRoutes.map(route => route.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointRadius: 5, // increase point size for better visibility
        }],
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Booking Reports Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Most Popular Routes */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold text-white mb-4">Most Popular Routes</h2>
                    <div className="space-y-2">
                        {popularRoutes.length > 0 ? (
                            popularRoutes.map(route => (
                                <p key={route._id} className="text-white">{route._id.departure} → {route._id.arrival}: <span className="font-bold">{route.count} bookings</span></p>
                            ))
                        ) : (
                            <p className="text-white">No data available</p>
                        )}
                    </div>
                </div>

                {/* Average Booking Value */}
                <div className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold text-white mb-4">Average Booking Value</h2>
                    <p className="text-2xl text-white font-bold">₹{averageBookingValue}</p>
                </div>

                {/* Cancellation Rate */}
                <div className="bg-gradient-to-r from-red-500 to-red-400 p-6 rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold text-white mb-4">Cancellation Rate</h2>
                    <p className="text-2xl text-white font-bold">{cancellationRate}%</p>
                </div>
            </div>

            {/* User Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">User Activity</h2>
                <ul className="space-y-2">
                    {userActivity.map((user) => (
                        <li key={user._id} className="text-gray-600">
                            {user.name} ({user.email}) - <span className="font-semibold text-indigo-600">{user.bookingsCount} bookings</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Popular Routes Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Booking Trends</h2>
                <Line data={popularRoutesData} options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Booking Trends (Routes)',
                            font: {
                                size: 18,
                                weight: 'bold',
                            },
                            color: '#333',
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleFont: { size: 14 },
                            bodyFont: { size: 12 },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                },
                            },
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 12,
                                    weight: 'bold',
                                },
                                beginAtZero: true,
                            },
                        },
                    },
                }} />
            </div>
        </div>
    );
};

export default ReportsDashboard;
