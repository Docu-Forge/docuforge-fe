'use client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Table from '@/components/Tables/Table';
import { User } from '@/types/User';
import React, { use, useEffect } from 'react';
interface DashboardModuleProps {
  user:User
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({user}) => {
  return (
    <div className="flex items-center justify-center h-full pt-20 px-8">
      <Table user={user}/>
    </div>
  )
};
