"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { roleOptions } from "@/types/user";
import useRegisterForm from "../_action/register-form";
import SelectOptions from "@/components/elements/select-options";
import { Assets } from "../../../../../public";

export default function RegisterForm() {
  const { form, isPending, onSubmit } = useRegisterForm();
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center px-4">
      <div className="flex w-full flex-col justify-center space-y-8 rounded-xl bg-white p-8 shadow-md dark:bg-neutral-950 md:w-max md:min-w-[30rem]">
        <Image
          src={Assets.Logo}
          alt="Logo"
          width={100}
          height={100}
          className="self-center object-cover"
          priority
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.id"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <SelectOptions field={field} options={roleOptions} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>
        <div className="flex items-center gap-2 text-sm">
          <p>Already have an account?</p>
          <Link href={"/auth/login"} className="font-semibold underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
