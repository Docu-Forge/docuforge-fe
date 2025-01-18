import { DocumentRequest } from "@/types/DocumentRequest";
import { User } from "@/types/User";

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000000).toString();
}

export const DATA: DocumentRequest[] = [
  {
    id: generateUUID(),
    documentType: "Cooperation Letter",
    documentStatus: "Completed",
    createdDate: new Date("2023-10-01T12:00:00Z"),
    commentsNotes: "Initial contract",
    expiredDate: new Date("2024-10-01T12:00:00Z"),
    fullname: "John Doe",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/123456",
    linktoDocument: "http://example.com/documents/123456",
  },
  {
    id: generateUUID(),
    documentType: "Employment Agreement",
    documentStatus: "Sent for Signature",
    createdDate: new Date("2023-10-02T14:30:00Z"),
    commentsNotes: "Non-disclosure agreement",
    expiredDate: new Date("2024-10-02T14:30:00Z"),
    fullname: "Jane Smith",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/789012",
    linktoDocument: "http://example.com/documents/789012",
  },
  {
    id: generateUUID(),
    documentType: "Request/Sales Letter",
    documentStatus: "Rejected",
    createdDate: new Date("2023-10-03T09:15:00Z"),
    commentsNotes: "Invoice for services",
    expiredDate: new Date("2024-10-03T09:15:00Z"),
    fullname: "Alice Johnson",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/345678",
    linktoDocument: "http://example.com/documents/345678",
  },
  {
    id: generateUUID(),
    documentType: "Cooperation Letter",
    documentStatus: "Completed",
    createdDate: new Date("2023-10-04T10:00:00Z"),
    commentsNotes: "Quarterly report",
    expiredDate: new Date("2024-10-04T10:00:00Z"),
    fullname: "Bob Brown",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/901234",
    linktoDocument: "http://example.com/documents/901234",
  },
  {
    id: generateUUID(),
    documentType: "Employment Agreement",
    documentStatus: "Sent for Signature",
    createdDate: new Date("2023-10-05T11:30:00Z"),
    commentsNotes: "Internal memo",
    expiredDate: new Date("2024-10-05T11:30:00Z"),
    fullname: "Charlie Davis",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/567890",
    linktoDocument: "http://example.com/documents/567890",
  },
  {
    id: generateUUID(),
    documentType: "Request/Sales Letter",
    documentStatus: "Rejected",
    createdDate: new Date("2023-10-06T12:45:00Z"),
    commentsNotes: "Project proposal",
    expiredDate: new Date("2024-10-06T12:45:00Z"),
    fullname: "Diana Evans",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/234567",
    linktoDocument: "http://example.com/documents/234567",
  },
  {
    id: generateUUID(),
    documentType: "Cooperation Letter",
    documentStatus: "Completed",
    createdDate: new Date("2023-10-07T14:00:00Z"),
    commentsNotes: "Service agreement",
    expiredDate: new Date("2024-10-07T14:00:00Z"),
    fullname: "Evan Foster",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/678901",
    linktoDocument: "http://example.com/documents/678901",
  },
  {
    id: generateUUID(),
    documentType: "Employment Agreement",
    documentStatus: "Sent for Signature",
    createdDate: new Date("2023-10-08T15:15:00Z"),
    commentsNotes: "Purchase order",
    expiredDate: new Date("2024-10-08T15:15:00Z"),
    fullname: "Fiona Green",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/345678",
    linktoDocument: "http://example.com/documents/345678",
  },
  {
    id: generateUUID(),
    documentType: "Request/Sales Letter",
    documentStatus: "Completed",
    createdDate: new Date("2023-10-09T16:30:00Z"),
    commentsNotes: "Payment receipt",
    expiredDate: new Date("2024-10-09T16:30:00Z"),
    fullname: "George Harris",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/789012",
    linktoDocument: "http://example.com/documents/789012",
  },
  {
    id: generateUUID(),
    documentType: "Cooperation Letter",
    documentStatus: "Rejected",
    createdDate: new Date("2023-10-10T17:45:00Z"),
    commentsNotes: "Meeting summary",
    expiredDate: new Date("2024-10-10T17:45:00Z"),
    fullname: "Hannah Irving",
    documentNumber: generateRandomNumber(),
    linktoDetails: "http://example.com/details/901234",
    linktoDocument: "http://example.com/documents/901234",
  }
];

export const USER: User = {
  fullname: "John Doe",
  type: "Admin",
  profile_picture: "https://randomuser.me/api/portraits/men/46.jpg",
};