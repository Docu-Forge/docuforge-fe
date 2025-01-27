import * as z from "zod";

export const documentFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  date: z.date({
    required_error: "Date is required",
  }),
  recipients: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        role: z.string().min(1, { message: "Role is required" }),
      })
    )
    .min(1, { message: "At least one recipient is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  agreements: z
    .array(z.string().min(1, { message: "Agreement cannot be empty" }))
    .min(1, { message: "At least one agreement is required" }),
  closing: z.date({
    required_error: "Closing date is required",
  }),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;
