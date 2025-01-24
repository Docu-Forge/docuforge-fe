import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DocumentRequest } from "@/types/DocumentRequest";
import React, { useEffect } from "react";
import { LoadingSpinner } from "../ui/spinner";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

const refreshTable = async () => {
  const token = getCookie("token");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-document-requests`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();
    const documentRequests: DocumentRequest[] = data.contents;
    return documentRequests;
  } catch (e) {
    console.error(e);
  }
};

const Table: React.FC = () => {
  const [data, setData] = React.useState<DocumentRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const documentRequests = await refreshTable();
      setData(documentRequests || []);
      setIsLoading(false);
      toast.success("Data loaded successfully");
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:text-bodydark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Incoming Requests</h4>
          <div className="flex flex-col">
            {/* Table headers */}
            <div className="hidden sm:grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Fullname</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Document Number</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Document Type</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Document Status</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Created Date</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Expired Date</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Comments</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
              </div>
            </div>

            {/* Table rows */}
            {data.map((datum, key) => (
              <div
                className={`grid grid-cols-1 sm:grid-cols-8 gap-4 sm:gap-0 p-4 sm:p-0 ${
                  key === data.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Fullname:</p>
                  <p className="text-black dark:text-white">{datum.fullname}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Document Number:</p>
                  <p className="text-meta-3">{datum.document_number}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Document Type:</p>
                  <p className="text-meta-3">{datum.document_type}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Document Status:</p>
                  <Badge variant={datum.document_status.split(" ")[0] as "secondary" | "default" | "destructive" | "outline" | "active"}>
                    {datum.document_status}
                  </Badge>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Created Date:</p>
                  <p className="text-meta-5">{new Date(datum.created_date).toLocaleString("id-ID")}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Expired Date:</p>
                  <p className="text-meta-5">{new Date(datum.expired_date).toLocaleString("id-ID")}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Comments:</p>
                  <p className="text-black">{datum.comments_notes}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Actions:</p>
                  <Popover>
                    <PopoverTrigger>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className="h-6 cursor-pointer">
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
                      </svg>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit z-99999">
                      <div className="flex flex-col gap-2">
                        <Link href={datum.link_to_details}>
                          <Button variant="outline" size="sm" className="text-wrap">View Details</Button>
                        </Link>
                        <Link href={datum.link_to_document}>
                          <Button variant="outline" size="sm" className="text-wrap">View Document</Button>
                        </Link>
                        {datum.document_status === "Sent for Signature" ? (
                          <Link href={datum.link_to_document}>
                            <Button variant="green" size="sm" className="text-wrap">Sign Document</Button>
                          </Link>
                        ) : null}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
