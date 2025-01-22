'use client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Table from '@/components/Tables/Table';
import { User } from '@/types/User';
import React, { use, useEffect } from 'react';
// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
interface DashboardModuleProps {
  user:User
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({user}) => {
  
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <DefaultLayout user={user}>
        {/* <Breadcrumb pageName="" /> */}
        <div className="flex items-center justify-center h-full ">
          <Table />
        </div>
      </DefaultLayout>
    </div>
  )
};
