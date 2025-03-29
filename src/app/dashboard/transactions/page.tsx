"use client";

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { exportToCSV } from '@/utils/exportToCSV';


interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  status: 'pending' | 'approved' | 'declined';
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    type: 'deposit',
    amount: 1000,
    status: 'pending',
    date: '2024-03-29T10:00:00Z',
  },
  // Add more mock transactions as needed
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const handleApprove = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status: 'approved' } : t
      )
    );
  };

  const handleDecline = (transactionId: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId ? { ...t, status: 'declined' } : t
      )
    );
  };

  const handleExport = () => {
    console.log('Exporting transactions...');
    const transactionsData = transactions.map(transaction => ({
      id: transaction.id,
      userId: transaction.userId,
      userName: transaction.userName,
      type: transaction.type,
      amount: transaction.amount,
      status: transaction.status,
      date: new Date(transaction.date).toLocaleString(),
    }));
    exportToCSV('transactions.csv', transactionsData);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesDate = dateFilter
      ? t.date.startsWith(dateFilter)
      : true;
    const matchesStatus = statusFilter === 'all'
      ? true
      : t.status === statusFilter;
    const matchesType = typeFilter === 'all'
      ? true
      : t.type === typeFilter;
    return matchesDate && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.userName}
                  </div>
                  <div className="text-sm text-gray-500">ID: {transaction.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="capitalize">{transaction.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'declined'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(transaction.id)}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDecline(transaction.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircleIcon className="h-5 w-5" />
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