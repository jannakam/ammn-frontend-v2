import React from 'react';
import { Power } from 'lucide-react';
import { logout } from '@/actions/auth';

export function Logout() {
    return (
    <Power onClick={logout} className="fixed top-8 right-8 h-6 w-6 cursor-pointer"/>
    )
}