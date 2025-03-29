# Admin Panel

A comprehensive admin panel built with Next.js, Tailwind CSS, and Firebase Authentication. This panel provides powerful tools for managing users, transactions, risk monitoring, and generating reports.

## Features

### 1. User Management
- View and search users by name, phone, email
- Activate/deactivate user accounts
- View KYC verification status
- Impersonate users for customer support

### 2. Transaction Management
- View transactions with filters (date, status, type)
- Approve/decline manual funding requests
- Refund or reverse transactions
- Export transaction history as CSV/PDF

### 3. Fraud & Risk Monitoring
- Monitor flagged transactions
- View blacklist status
- Send alerts to flagged users
- Risk scoring dashboard

### 4. Wallet Balances & Reports
- View total funds in the system
- See breakdown of inflows/outflows
- Generate reports on user activity
- Visualize transaction trends

### 5. Real-time Notifications & Logs
- Admin receives alerts for high-risk transactions
- Logs of admin actions
- WebSocket integration for real-time updates

### 6. Role-Based Access Control (RBAC)
- Define roles (Super Admin, Finance Team, Support Staff)
- Restrict actions based on role
- Audit logs for admin actions

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Heroicons
- **Real-time Updates**: WebSocket (Socket.io)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── shared/           # Shared components
├── lib/                   # Library code
├── types/                 # TypeScript types
├── utils/                # Utility functions
├── hooks/                # Custom React hooks
└── services/             # External service integrations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
