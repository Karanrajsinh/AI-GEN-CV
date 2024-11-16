

import ProtectedRoute from "@/src/components/ResumeSidebar/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {


    return (

        <ProtectedRoute>
            {children}
        </ProtectedRoute>

    );
}
