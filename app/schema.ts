import * as z from "zod";

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Item description is required"),
  quantity: z.number().gte(1, "Quantity must be at least 1"),
  price: z.number().gte(0, "Price cannot be a negative value"),
});

export const InvoiceSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Customer's name must be at least two characters"),
    email: z.email("Invalid email address"),
    phoneNumber: z
      .string()
      .transform((val) => (val === "" ? undefined : val))
      .optional()
      .refine((val) => !val || /^\+?[1-9]\d{7,14}$/.test(val), {
        message: "Invalid phone number",
      }),
    address: z.string().min(2, "Address must be at least two characters"),
    invoiceNumber: z
      .string()
      .min(1, "Invoice number is required")
      .regex(/^\d+$/, "Invoice number must contain only digits"),
    date: z.string().min(10, "Invalid date"),

    dueDate: z.string().min(10, "Invalid date"),
    currency: z.string(),
    items: z
      .array(invoiceItemSchema)
      .min(1, "Invoice must have at least one item"),
    wht: z.number().gte(0,"WHT cannot be negative"),
    discount: z.number().gte(0,"WHT cannot be negative"),
    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (new Date(data.dueDate) < new Date(data.date)) {
      ctx.addIssue({
        path: ["dueDate"],
        message: "Due date cannot be earlier than invoice date",
        code: "custom",
      });
    }
  });
export type Invoice = z.infer<typeof InvoiceSchema>;
