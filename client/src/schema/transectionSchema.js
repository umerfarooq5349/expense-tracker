import { z } from "zod";
export const transectionSchema = z.object({
  title: z.string().min(3, "Title should be at least 3 characters"),
  amount: z.union([z.string(), z.number()]).refine(
    (value) => {
      const amount = typeof value === "string" ? parseFloat(value) : value;
      return amount > 0;
    },
    { message: "Amount must be a positive number" }
  ),
  category: z.enum(
    [
      "Food",
      "Transport",
      "Entertainment",
      "Bills",
      "Other",
      "Groceries",
      "Shopping",
      "Health",
      "Travel",
      "Utilities",
    ],
    "Invalid category"
  ),
  type: z.enum(["expense", "income"], "Type must be 'expense' or 'income'"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});
