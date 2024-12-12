import { z } from "zod";
export const transectionSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(3, "Title should be at least 3 characters"),
  amount: z.number().positive("Amount must be a positive number"),
  category: z.enum(
    ["Food", "Transport", "Entertainment", "Bills", "Other"],
    "Invalid category"
  ),
  type: z.enum(["expense", "income"], "Type must be 'expense' or 'income'"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
