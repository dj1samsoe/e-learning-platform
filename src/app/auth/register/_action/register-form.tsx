"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema } from "@/types/user";

export default function useRegisterForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message || "Something went wrong!",
        });
        return;
      }

      toast({
        title: "Success",
        description: "You have successfully registered!",
      });
      window.location.href = "/auth/login";
    });
  }

  return { form, isPending, onSubmit };
}
