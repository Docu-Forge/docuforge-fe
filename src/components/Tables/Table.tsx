// 'use client'
import { DummyData } from "@/types/DummyData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Combobox } from "@/components/Combobox";

interface TableProps {
  data: DummyData[];
  refreshTable: () => Promise<void>;
}

const Table:React.FC<TableProps> = ({ data, refreshTable }) => {
  
  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:text-bodydark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Incoming Applicant
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Fullname
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Registration Number
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              View Details
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Docusign Document Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Download Signed Documents
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Application Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Time
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {data.map((datum, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-8 ${
              key === data.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{datum.fullname}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{datum.registration_number}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Link href={datum.link_to_details}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Badge variant={datum.status.toLowerCase() as "secondary" | "default" | "destructive" | "outline" | "active"}>{datum.status}</Badge>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Link href={datum.link_to_document}>
                <Button variant="outline" size="sm">View Document</Button>
              </Link>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {datum.application_status !== "Pending" ? (
                <Badge variant={datum.application_status as "default" | "secondary" | "active" | "pending" | "inactive" | "Approved" | "destructive" | "outline"}>{datum.application_status}</Badge>
              ):<Combobox onChangeFunction={refreshTable} id={datum.id}></Combobox>}
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">{new Date(datum.time).toLocaleString('id-ID')}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Popover>
                <PopoverTrigger>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className="h-8 cursor-pointer">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
                  </svg>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <div className="flex flex-col gap-2">
                    <Link href={datum.link_to_details}>
                      <Button variant="outline" size="sm" className="text-wrap">View Details</Button>
                    </Link>
                    <Link href={datum.link_to_document}>
                      <Button variant="outline" size="sm" className="text-wrap">View Document</Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
