export interface Recipient {
  name: string;
  role: string;
}

export interface DocumentFormData {
  title: string;
  date: string;
  recipients: Recipient[];
  description: string;
  agreements: string[];
  rights?: string[];
  resolution?: string;
  payment?: string;
  closing: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface GenerateResponse {
  markdown: string;
  success: boolean;
  error?: string;
}
