"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema } from "@/types/user";

export default function useLoginForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (response?.error) {
        let error = "";
        switch (response.error) {
          case "CredentialsSignin":
            error = "Invalid credentials!";
            break;
          default:
            error = "Something went wrong!";
        }
        toast({ title: "Error", description: error });
        return;
      }

      toast({ title: "Success", description: "You are now logged in!" });
      window.location.href = "/profil";
    });
  }

  return { form, isPending, onSubmit };
}
