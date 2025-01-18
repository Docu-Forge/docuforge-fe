"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { DocumentFormData, FormErrors } from "./interface";

export const GenerateModule: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [closingDate, setClosingDate] = useState<Date>();
  const [errors, setErrors] = useState<FormErrors>({});
  const [markdown] = useState<string>("");
  const [formData, setFormData] = useState<DocumentFormData>({
    title: "",
    date: "",
    recipients: [{ name: "", role: "" }],
    description: "",
    agreements: [""],
    rights: [],
    resolution: "",
    payment: "",
    closing: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title) newErrors.title = "Document title is required";
    if (!date) newErrors.date = "Date is required";
    if (!formData.recipients.length || !formData.recipients[0].name)
      newErrors.recipients = "At least one recipient is required";
    if (!formData.agreements.length || !formData.agreements[0])
      newErrors.agreements = "At least one agreement is required";
    if (!closingDate) newErrors.closing = "Closing date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate/legal-document/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, date }),
        }
      );

      if (!response.ok) throw new Error("Failed to send data");

      toast({
        title: "Success",
        description: "Document generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  // Add recipient handler
  const addRecipient = () => {
    setFormData({
      ...formData,
      recipients: [...formData.recipients, { name: "", role: "" }],
    });
  };

  // Remove recipient handler
  const removeRecipient = (index: number) => {
    const newRecipients = formData.recipients.filter((_, i) => i !== index);
    setFormData({ ...formData, recipients: newRecipients });
  };

  // Add list item handler
  const addListItem = (field: "agreements" | "rights") => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] || []), ""],
    });
  };

  // Remove list item handler
  const removeListItem = (field: "agreements" | "rights", index: number) => {
    const newList = formData[field]?.filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newList });
  };

  return (
    <div className="flex p-6 gap-6">
      <form onSubmit={handleSubmit} className="">
        {/* Title Field */}
        <div className="">
          <label className="block text-sm font-medium">Document Title</label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={cn(errors.title && "border-red-500")}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  errors.date && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>

        {/* Recipients Fields */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Recipients</label>
          {formData.recipients.map((recipient, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Name"
                value={recipient.name}
                onChange={(e) => {
                  const newRecipients = [...formData.recipients];
                  newRecipients[index].name = e.target.value;
                  setFormData({ ...formData, recipients: newRecipients });
                }}
              />
              <Input
                placeholder="Role"
                value={recipient.role}
                onChange={(e) => {
                  const newRecipients = [...formData.recipients];
                  newRecipients[index].role = e.target.value;
                  setFormData({ ...formData, recipients: newRecipients });
                }}
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeRecipient(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addRecipient} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Recipient
          </Button>
        </div>

        {/* Description Field */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Agreements List */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Agreements</label>
          {formData.agreements.map((agreement, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={agreement}
                onChange={(e) => {
                  const newAgreements = [...formData.agreements];
                  newAgreements[index] = e.target.value;
                  setFormData({ ...formData, agreements: newAgreements });
                }}
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeListItem("agreements", index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addListItem("agreements")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Agreement
          </Button>
        </div>

        {/* Optional Fields */}
        {/* Rights, Resolution, Payment with similar pattern */}

        {/* Closing Date */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Closing Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !closingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {closingDate ? (
                  format(closingDate, "PPP")
                ) : (
                  <span>Select closing date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={closingDate}
                onSelect={setClosingDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Generate Document
        </Button>
      </form>

      {/* Preview Section */}
      <div className="w-full p-6 border rounded-lg hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        <div className="prose max-w-none">
          {markdown ? (
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
          ) : (
            <p className="text-gray-500">Hasil propmt here</p>
          )}
        </div>
      </div>
    </div>
  );
};
