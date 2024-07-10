"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { FunctionComponent, useEffect } from "react";
import { login } from "./actions";
import { toast } from "sonner";
import { ActionMessages } from "@/lib/constants/actionMessages";
import { redirect } from "next/navigation";

const Login: FunctionComponent = () => {
  const { execute, isExecuting, result } = useAction(login);

  useEffect(() => {
    // Log errors to an error logging service
    const { data, fetchError, serverError } = result;
    if (fetchError || serverError) {
      // Next safe action does not use the error message from the server. It uses a generic message instead.
      toast.error(fetchError || serverError);
    } else if (data === ActionMessages.LOGIN_SUCCESS) {
      toast.success(data);
      redirect("/");
    }
  }, [result]);

  return (
    <form
      className="w-full flex flex-col gap-6 min-h-screen justify-center items-center max-w-md py-6"
      action={execute}
    >
      <Avatar className="w-40 h-40 mb-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="Logo" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address here"
        />
        {result.validationErrors?.email?._errors?.map((error, idx) => (
          <Label key={idx} htmlFor="email" className="text-destructive text-sm">
            {error}
          </Label>
        ))}
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password here"
        />
        {result.validationErrors?.password?._errors?.map((error, idx) => (
          <Label
            key={idx}
            htmlFor="password"
            className="text-destructive text-sm"
          >
            {error}
          </Label>
        ))}
      </div>

      <Button className="self-stretch" disabled={isExecuting}>
        Login
      </Button>
    </form>
  );
};

export default Login;
