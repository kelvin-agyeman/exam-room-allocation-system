import { Outlet } from '@tanstack/react-router'

export const Route = {
    component: StaffRootLayout,
}

export function StaffRootLayout() {
    return (
        <div className="stud-root-layout">
            <Outlet />
        </div>
    )
}