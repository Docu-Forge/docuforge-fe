export interface DocumentRequest {
    id:string;
    documentType: string;
    documentStatus: string;
    createdDate: Date;
    commentsNotes: string;
    expiredDate: Date;
    fullname: string;
    documentNumber: string;
    linktoDetails: string;
    linktoDocument: string;
}