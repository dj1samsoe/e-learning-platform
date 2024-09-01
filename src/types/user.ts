import { $Enums, Prisma } from "@prisma/client";
import { z } from "zod";

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type GetUser = () => User | undefined;

export type IUserPayloadCreate = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: $Enums.UserRole;
};

export type IUserPayloadUpdate = { id: string } & IUserPayloadCreate;

export const userDefaultValueForm = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: "PELAJAR",
};

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).max(50),
  email: z.string().min(5).email("Please enter a valid email"),
  password: z.string().min(5),
  role: z.string().min(1),
  articles: z
    .object({
      connect: z.array(z.string()),
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().min(5).email("Please enter a valid email"),
  password: z.string().min(5),
});

export const registerSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(5).email("Please enter a valid email"),
  password: z.string().min(5),
  role: z.string().min(1),
});

export const roleOptions = [
  { label: "Pelajar", value: "PELAJAR" },
  { label: "Pengajar", value: "PENGAJAR" },
];
