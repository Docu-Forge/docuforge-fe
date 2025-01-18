export interface DocumentRequest {
    id:string;
    document_type: string;
    document_status: string;
    created_date: Date;
    comments_notes: string;
    expired_date: Date;
    fullname: string;
    document_number: string;
    link_to_details: string;
    link_to_document: string;
}