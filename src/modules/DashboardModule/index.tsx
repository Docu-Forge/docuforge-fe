'use client'
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Table from '@/components/Tables/Table';
import React, { useEffect } from 'react';
import { DATA } from './constant';
// import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { DocumentRequest } from '@/types/DocumentRequest';


export const DashboardModule: React.FC = () => {
  const [data, setData] = React.useState<DocumentRequest[]>([]);
  const refreshTable = async () =>{
    //! fetch table data
    try{

    }catch(e){
      console.error(e);
    }

    setData(DATA);
    console.log("refreshTable");
  }
  useEffect(() => {
    refreshTable();
  })

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <DefaultLayout>
        {/* <Breadcrumb pageName="" /> */}
        <div className="flex items-center justify-center h-full ">
          <Table data={data} refreshTable={refreshTable}/>
        </div>
      </DefaultLayout>
    </div>
  )
};
