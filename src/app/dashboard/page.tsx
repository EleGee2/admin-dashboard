"use client";

import Link from 'next/link';
import {
  UsersIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon,
  WalletIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockStats = {
  totalUsers: 1500,
  activeUsers: 1200,
  totalTransactions: 3000,
  pendingTransactions: 25,
  totalVolume: 1000000,
  riskScore: 75,
};

const transactionTrend = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Transaction Volume',
      data: [65000, 75000, 85000, 95000, 110000, 120000, 130000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.4,
    },
  ],
};

const quickActions = [
  {
    name: 'User Management',
    href: '/dashboard/users',
    icon: UsersIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: CurrencyDollarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Risk Monitoring',
    href: '/dashboard/risk',
    icon: ShieldExclamationIcon,
    color: 'bg-yellow-500',
  },
  {
    name: 'Wallet & Reports',
    href: '/dashboard/wallet',
    icon: WalletIcon,
    color: 'bg-purple-500',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'transaction',
    description: 'New high-value transaction detected',
    timestamp: '5 minutes ago',
    icon: CurrencyDollarIcon,
    iconColor: 'text-green-500',
  },
  {
    id: 2,
    type: 'user',
    description: 'New user registration',
    timestamp: '10 minutes ago',
    icon: UsersIcon,
    iconColor: 'text-blue-500',
  },
  {
    id: 3,
    type: 'risk',
    description: 'Suspicious activity detected',
    timestamp: '15 minutes ago',
    icon: ShieldExclamationIcon,
    iconColor: 'text-red-500',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {mockStats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500 ml-1">12%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                ${mockStats.totalVolume.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
            <span className="text-green-500 ml-1">8%</span>
            <span className="text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Score</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {mockStats.riskScore}/100
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <ShieldExclamationIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
            <span className="text-red-500 ml-1">5%</span>
            <span className="text-gray-500 ml-2">from last week</span>
          </div>
        </div>
      </div>

      {/* Transaction Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Transaction Trend
        </h2>
        {
        <Line
          data={transactionTrend}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        /> 
        }
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">
                {action.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex items-center">
                <activity.icon
                  className={`h-6 w-6 ${activity.iconColor}`}
                />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 