'use client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Table from '@/components/Tables/Table';
import React, { use, useEffect } from 'react';
// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';


export const DashboardModule: React.FC = async() => {
  
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <DefaultLayout>
        {/* <Breadcrumb pageName="" /> */}
        <div className="flex items-center justify-center h-full ">
          <Table />
        </div>
      </DefaultLayout>
    </div>
  )
};
