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
import { Separator } from "@/components/ui/separator";
import GoogleAuthButton from "./components/GoogleAuthButton";

interface LoginProps {
  searchParams: {
    error: string;
  };
}

const Login: FunctionComponent<LoginProps> = ({ searchParams: { error } }) => {
  const { execute, isExecuting, result } = useAction(login);

  useEffect(() => {
    const { data, fetchError, serverError } = result;
    if (fetchError || serverError) {
      toast.error(fetchError || serverError);
    } else if (data === ActionMessages.LOGIN_SUCCESS) {
      toast.success(data);
      redirect("/");
    }
  }, [result]);

  return (
    <form
      className="w-full flex flex-col gap-8 md:gap-10 min-h-screen justify-center items-center max-w-md py-6"
      action={execute}
    >
      <Avatar className="w-40 h-40 mb-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="Logo" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <GoogleAuthButton />

      <div className="flex gap-3 md:gap-4 lg:gap-6 w-full items-center">
        <Separator className="grow w-fit h-0.5" />
        <span className="md:text-xl text-lg text-muted-foreground">OR</span>
        <Separator className="grow w-fit h-0.5" />
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email address here"
          />
          {result.validationErrors?.email?._errors?.map((error, idx) => (
            <Label
              key={idx}
              htmlFor="email"
              className="text-destructive text-sm"
            >
              {error}
            </Label>
          ))}
        </div>

        <Button className="self-stretch" disabled={isExecuting}>
          Send Magic Link
        </Button>
      </div>

      {error && (
        <div className="bg-destructive text-destructive-foreground px-4 py-2 w-full rounded-lg text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;
