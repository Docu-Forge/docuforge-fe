import { DummyData } from "@/types/DummyData";
import { User } from "@/types/User";

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const DATA:DummyData[] = [
  {
    id: generateUUID(),
    fullname: "John Doe",
    registration_number: "123456",
    link_to_details: "http://example.com/details/123456",
    status: "Active",
    link_to_document: "http://example.com/documents/123456",
    application_status: "Approved",
    time: "2023-10-01T12:00:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Jane Smith",
    registration_number: "789012",
    link_to_details: "http://example.com/details/789012",
    status: "Pending",
    link_to_document: "http://example.com/documents/789012",
    application_status: "Pending",
    time: "2023-10-02T14:30:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Alice Johnson",
    registration_number: "345678",
    link_to_details: "http://example.com/details/345678",
    status: "Inactive",
    link_to_document: "http://example.com/documents/345678",
    application_status: "Declined",
    time: "2023-10-03T09:15:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Bob Brown",
    registration_number: "901234",
    link_to_details: "http://example.com/details/901234",
    status: "Active",
    link_to_document: "http://example.com/documents/901234",
    application_status: "Approved",
    time: "2023-10-04T11:45:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Charlie Davis",
    registration_number: "567890",
    link_to_details: "http://example.com/details/567890",
    status: "Pending",
    link_to_document: "http://example.com/documents/567890",
    application_status: "Pending",
    time: "2023-10-05T13:20:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Diana Evans",
    registration_number: "234567",
    link_to_details: "http://example.com/details/234567",
    status: "Inactive",
    link_to_document: "http://example.com/documents/234567",
    application_status: "Declined",
    time: "2023-10-06T15:10:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Evan Foster",
    registration_number: "678901",
    link_to_details: "http://example.com/details/678901",
    status: "Active",
    link_to_document: "http://example.com/documents/678901",
    application_status: "Approved",
    time: "2023-10-07T16:30:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Fiona Green",
    registration_number: "345678",
    link_to_details: "http://example.com/details/345678",
    status: "Pending",
    link_to_document: "http://example.com/documents/345678",
    application_status: "Pending",
    time: "2023-10-08T17:45:00Z"
  },
  {
    id: generateUUID(),
    fullname: "George Harris",
    registration_number: "789012",
    link_to_details: "http://example.com/details/789012",
    status: "Inactive",
    link_to_document: "http://example.com/documents/789012",
    application_status: "Declined",
    time: "2023-10-09T18:50:00Z"
  },
  {
    id: generateUUID(),
    fullname: "Hannah Irving",
    registration_number: "901234",
    link_to_details: "http://example.com/details/901234",
    status: "Active",
    link_to_document: "http://example.com/documents/901234",
    application_status: "Approved",
    time: "2023-10-10T19:30:00Z"
  }
]

export const USER:User = {
    "fullname": "John Doe",
    "type": "Admin",
    "profile_picture": "https://randomuser.me/api/portraits/men/46.jpg",
}