"use client";

// This remains a Server Component (no "use client" needed)
import AuthGuard from '@/components/auth/AuthGuard';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
} 