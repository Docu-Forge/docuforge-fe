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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentFormSchema, DocumentFormValues } from "./schema";

export const GenerateModule: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [markdown, setMarkdown] = useState<string>("");

  const onSubmit = async (data: DocumentFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/generate/legal-document/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error("Failed to generate document");

      setMarkdown(result.generated_content);

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
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "Sample Agreement",
      date: new Date(),
      recipients: [{ name: "John Doe", role: "Director" }],
      description: "This is a sample agreement description",
      agreements: ["First agreement point"],
      closing: new Date(),
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const {
    fields: recipientFields,
    append: addRecipient,
    remove: removeRecipient,
  } = useFieldArray<DocumentFormValues, "recipients">({
    control: form.control,
    name: "recipients",
  });

  const {
    fields: agreementFields,
    append: addAgreement,
    remove: removeAgreement,
  } = useFieldArray<DocumentFormValues, "agreements">({
    control: form.control,
    name: "agreements",
  });

  return (
    <div className="flex p-6 gap-6 pt-[10%]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-1/2"
        >
          {/* Title Field */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium">
                  Document Title
                </label>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Field */}
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium">Date</label>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recipients Fields */}
          <label className="block text-sm font-medium">Recipients</label>
          {recipientFields.map((recipient, index) => (
            <div key={recipient.id} className="flex gap-2">
              <FormField
                control={control}
                name={`recipients.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`recipients.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
          <Button
            type="button"
            onClick={() => addRecipient({ name: "", role: "" })}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Recipient
          </Button>

          {/* Description Field */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium">Description</label>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Agreements List */}
          <label className="block text-sm font-medium">Agreements</label>
          {agreementFields.map((agreement, index) => (
            <div key={agreement.id} className="flex gap-2">
              <FormField
                control={control}
                name={`agreements.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeAgreement(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addAgreement("")}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Agreement
          </Button>

          {/* Closing Date */}
          <FormField
            control={control}
            name="closing"
            render={({ field }) => (
              <FormItem>
                <label className="block text-sm font-medium">
                  Closing Date
                </label>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select closing date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate Document"
            )}
          </Button>
        </form>
      </Form>

      {/* Preview Section */}
      <div className="w-full p-6 border rounded-lg hidden lg:block">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        <div className="prose max-w-none">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <p className="text-gray-500">Generating document...</p>
            </div>
          ) : markdown ? (
            <div dangerouslySetInnerHTML={{ __html: markdown }} />
          ) : (
            <p className="text-gray-500">Generated document will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};
