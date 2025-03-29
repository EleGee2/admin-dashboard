"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UsersIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon,
  WalletIcon,
  BellIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuthContext } from '@/components/auth/AuthProvider';

interface NavItem {
  name: string;
  href: string;
  icon: typeof UsersIcon;
}

const navigation: NavItem[] = [
  { name: 'User Management', href: '/dashboard/users', icon: UsersIcon },
  { name: 'Transactions', href: '/dashboard/transactions', icon: CurrencyDollarIcon },
  { name: 'Fraud & Risk', href: '/dashboard/risk', icon: ShieldExclamationIcon },
  { name: 'Wallet & Reports', href: '/dashboard/wallet', icon: WalletIcon },
  { name: 'Notifications', href: '/dashboard/notifications', icon: BellIcon },
  { name: 'Role Management', href: '/dashboard/roles', icon: UserGroupIcon },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { signOut } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-700' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3 text-gray-400" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 