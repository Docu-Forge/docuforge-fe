type Recipient = {
    name: string;
    status: string;
}
export type DocumentRequest = {
    id: string;
    document_title: string;
    document_type: string;
    created_date: Date;
    comments_notes: string;
    expired_date: Date;
    document_number: string;
    envelope_id: string;
    recipients: Recipient[];
}