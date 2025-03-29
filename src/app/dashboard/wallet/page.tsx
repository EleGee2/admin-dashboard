"use client";

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const mockData = {
  totalFunds: 1000000,
  inflow: 500000,
  outflow: 300000,
  userCount: 1500,
  transactionCount: 3000,
};

const transactionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Inflow',
      data: [65000, 75000, 85000, 95000, 110000, 120000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      label: 'Outflow',
      data: [45000, 55000, 65000, 75000, 85000, 90000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const userActivityData = {
  labels: ['Active', 'Inactive', 'New'],
  datasets: [
    {
      data: [800, 500, 200],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
      ],
      borderColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1,
    },
  ],
};

const dailyTransactionsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Transactions',
      data: [120, 150, 180, 190, 210, 170, 160],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

export default function WalletPage() {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Wallet & Reports</h1>
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Funds</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            ${mockData.totalFunds.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Inflow</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            ${mockData.inflow.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Outflow</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            ${mockData.outflow.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">
            {mockData.userCount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Transaction Trends
          </h3>
          <Line
            data={transactionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            User Activity
          </h3>
          <Doughnut
            data={userActivityData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Daily Transaction Volume
        </h3>
        <Bar
          data={dailyTransactionsData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
} 