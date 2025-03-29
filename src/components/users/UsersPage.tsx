import { exportToCSV } from '@/utils/exportToCSV';

const handleExport = () => {
  const usersData = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    status: user.status,
    kycStatus: user.kycStatus,
    createdAt: user.createdAt,
  }));

  exportToCSV('users.csv', usersData);
};

// In your JSX, add the export button
<button
  onClick={handleExport}
  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Export Users
</button> 