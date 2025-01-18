// 'use client'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Combobox } from "@/components/Combobox";
import { DocumentRequest } from "@/types/DocumentRequest";

interface TableProps {
  data: DocumentRequest[];
  refreshTable: () => Promise<void>;
}

const Table:React.FC<TableProps> = ({ data, refreshTable }) => {
  
  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:text-bodydark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Incoming Requests
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
              Document Number
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Document Type
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Document Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Created Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Expired Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Comments
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
              <p className="text-meta-3">{datum.documentNumber}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{datum.documentType}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Badge variant={datum.documentStatus.split(" ")[0] as "secondary" | "default" | "destructive" | "outline" | "active"}>{datum.documentStatus}</Badge>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">{new Date(datum.createdDate).toLocaleString('id-ID')}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">{new Date(datum.expiredDate).toLocaleString('id-ID')}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">{datum.commentsNotes}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <Popover>
                <PopoverTrigger>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className="h-6 cursor-pointer">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
                  </svg>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <div className="flex flex-col gap-2">
                    <Link href={datum.linktoDetails}>
                      <Button variant="outline" size="sm" className="text-wrap">View Details</Button>
                    </Link>
                    <Link href={datum.linktoDocument}>
                      <Button variant="outline" size="sm" className="text-wrap">View Document</Button>
                    </Link>
                    {
                      datum.documentStatus === "Sent for Signature" ? (
                        <Link href={datum.linktoDocument}>
                          <Button variant="green" size="sm" className="text-wrap">Sign Document</Button>
                        </Link>
                      ):(
                        <></>
                      )
                    }
                    
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
