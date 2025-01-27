import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DocumentRequest } from "@/types/DocumentRequest";
import React, { useEffect } from "react";
import { LoadingSpinner } from "../ui/spinner";
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import { User } from "@/types/User";

const refreshTable = async () => {
  const token = getCookie("AT");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-documents`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const documentRequests: DocumentRequest[] = data.contents;
    return documentRequests;
  } catch (e) {
    console.error(e);
  }
};

const fetchRecipients = async (envelopeId: string, accountId:string) => {
  const token = getCookie("AT");
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-recipients/${envelopeId}/${accountId}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const recipients = (await data.json());
  let recipientList: Recipient[] = [];
  for (let i = 0; i < recipients.contents.recipient_count; i++) {
    recipientList.push({name:recipients.contents.signers[i].name, status:recipients.contents.signers[i].status});
  }
  // console.log(recipientList);
  return recipientList;
}

const fetchDocumentLink = async (envelopeId: string, accountId:string) => {
  const token = getCookie("AT");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-document-link/${envelopeId}/${accountId}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // const documentLink = await data;
  const blob = await response.blob();

  // Buat URL sementara untuk file
  const downloadUrl = window.URL.createObjectURL(blob);

  // Buat elemen link untuk mendownload file
  const link = document.createElement("a");
  link.href = downloadUrl;

  // Set nama file (opsional, jika nama file tidak disediakan backend)
  link.download = "downloaded_file.pdf"; // Ganti sesuai nama file
  document.body.appendChild(link);

  // Trigger klik untuk memulai unduhan
  link.click();

  // Hapus link dari DOM setelah selesai
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}

type Recipient = {
  name: string;
  status: string;
}

const Table: React.FC<{user:User}> = ({user}:{user:User}) => {
  const [data, setData] = React.useState<DocumentRequest[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [recipients, setRecipients] = React.useState<Recipient[][]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const documentRequests = await refreshTable();
      setData(documentRequests || []);
      setIsLoading(false);
      toast.success("Data loaded successfully");
      if (documentRequests) {
        // Fetch recipients for each document request
        const updatedData = await Promise.all(
          documentRequests.map(async (doc) => {
            const recipients = await fetchRecipients(doc.envelope_id, user.accounts[0].account_id);
            return { ...doc, recipients }; // Tambahkan recipients ke dokumen
          })
        );

        setData(updatedData); // Set state dengan data yang diperbarui
        // toast.success("Data loaded successfully");
      }
    };
    fetchData();
  }, []);
  console.log("recipients",recipients);
  return (
    <div className="relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:text-bodydark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Document Requests</h4>
          <div className="flex flex-col">
            {/* Table headers */}
            <div className="hidden sm:grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Document Title</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Document Number</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Document Type</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Created Date</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Expired Date</h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">Recipients Status</h5>
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
                  <p className="font-medium sm:hidden">Document Title:</p>
                  <p className="text-black dark:text-white">{datum.document_title}</p>
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
                  <p className="font-medium sm:hidden">Created Date:</p>
                  <p className="text-meta-5">{new Date(datum.created_date).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Expired Date:</p>
                  <p className="text-meta-5">{new Date(datum.expired_date).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="flex sm:items-center sm:justify-center sm:p-2.5 sm:xl:p-5 gap-2">
                  <p className="font-medium sm:hidden">Recipients Status:</p>
                  <div className="flex flex-col gap-2">
                    {datum.recipients?.map((recipient, index) => (
                      <div key={index} className="flex flex-row gap-2 justify-center items-center">
                        <p className="text-black">{recipient.name}</p>
                        <Badge variant={recipient.status as "sent" | "completed" | "default" | "destructive" | "outline" | "secondary" | "active" | "pending" | "inactive" | "declined"}>{recipient.status.charAt(0).toUpperCase()+recipient.status.slice(1)}</Badge>
                      </div>
                    ))}
                  </div>

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
                          <Button variant="outline" size="sm" className="text-wrap" onClick={async ()=>{await fetchDocumentLink(datum.envelope_id, user.accounts[0].account_id)}}>Download Document</Button>
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
