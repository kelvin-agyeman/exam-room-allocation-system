import { Outlet } from '@tanstack/react-router'

export const Route = {
    component: StudRootLayout,
}

export function StudRootLayout() {
    return (
        <div className="stud-root-layout">
            <Outlet />
        </div>
    )
}