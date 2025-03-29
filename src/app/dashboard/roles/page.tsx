"use client";

import { useState } from 'react';
import {
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: [
      'manage_users',
      'manage_transactions',
      'manage_roles',
      'view_reports',
      'manage_risk',
    ],
    userCount: 3,
  },
  {
    id: '2',
    name: 'Finance Team',
    description: 'Access to financial transactions and reports',
    permissions: ['view_transactions', 'approve_transactions', 'view_reports'],
    userCount: 8,
  },
  {
    id: '3',
    name: 'Support Staff',
    description: 'Customer support and basic transaction access',
    permissions: ['view_users', 'view_transactions', 'impersonate_users'],
    userCount: 15,
  },
];

const allPermissions = [
  { id: 'manage_users', name: 'Manage Users' },
  { id: 'view_users', name: 'View Users' },
  { id: 'manage_transactions', name: 'Manage Transactions' },
  { id: 'view_transactions', name: 'View Transactions' },
  { id: 'approve_transactions', name: 'Approve Transactions' },
  { id: 'manage_roles', name: 'Manage Roles' },
  { id: 'view_reports', name: 'View Reports' },
  { id: 'manage_risk', name: 'Manage Risk' },
  { id: 'impersonate_users', name: 'Impersonate Users' },
];

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
        <button
          onClick={() => {
            setSelectedRole(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
              <div className="flex items-center">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    {role.name}
                  </h2>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {role.userCount} users
                </span>
                <button
                  onClick={() => handleEditRole(role)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                {role.name !== 'Super Admin' && (
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            <div className="px-6 py-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Permissions
              </h3>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {allPermissions.find((p) => p.id === permission)?.name ||
                      permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Modal - In a real app, this would be a separate component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {selectedRole ? 'Edit Role' : 'Add Role'}
            </h2>
            {/* Add form fields for role management */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {selectedRole ? 'Save Changes' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 