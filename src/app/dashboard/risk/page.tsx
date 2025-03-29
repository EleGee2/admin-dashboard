"use client";

import { useState } from 'react';
import {
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

interface FlaggedTransaction {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  type: string;
  riskScore: number;
  reason: string;
  date: string;
  status: 'pending' | 'reviewed' | 'cleared';
}

const mockFlaggedTransactions: FlaggedTransaction[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    amount: 50000,
    type: 'withdrawal',
    riskScore: 85,
    reason: 'Unusual transaction amount',
    date: '2024-03-29T10:00:00Z',
    status: 'pending',
  },
  // Add more mock transactions as needed
];

export default function RiskPage() {
  const [flaggedTransactions, setFlaggedTransactions] = useState<FlaggedTransaction[]>(mockFlaggedTransactions);

  const handleSendAlert = (userId: string) => {
    // Implement alert sending logic
    console.log('Sending alert to user:', userId);
  };

  const handleUpdateStatus = (transactionId: string, status: 'reviewed' | 'cleared') => {
    setFlaggedTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status } : t
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Risk Monitoring</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ShieldExclamationIcon className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Risk Score</h3>
              <p className="text-3xl font-bold text-yellow-500">75/100</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Flagged Transactions</h3>
              <p className="text-3xl font-bold text-red-500">{flaggedTransactions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <EnvelopeIcon className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Alerts Sent</h3>
              <p className="text-3xl font-bold text-blue-500">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Flagged Transactions</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flaggedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.userName}
                  </div>
                  <div className="text-sm text-gray-500">ID: {transaction.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">{transaction.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-semibold ${
                      transaction.riskScore >= 80
                        ? 'text-red-600'
                        : transaction.riskScore >= 60
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {transaction.riskScore}/100
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.reason}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'cleared'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'reviewed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleSendAlert(transaction.userId)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Send Alert
                  </button>
                  {transaction.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(transaction.id, 'reviewed')}
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                      >
                        Mark Reviewed
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(transaction.id, 'cleared')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Clear
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 