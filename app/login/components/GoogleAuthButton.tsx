"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { FunctionComponent, useEffect } from "react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "../actions";

interface GoogleAuthButtonProps {}

const GoogleAuthButton: FunctionComponent<GoogleAuthButtonProps> = () => {
  const { execute, isExecuting, result } = useAction(loginWithGoogle);

  useEffect(() => {
    const { fetchError, serverError } = result;
    if (fetchError || serverError) {
      toast.error(fetchError || serverError);
    }
  }, [result]);

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full shadow-md drop-shadow-md"
      onClick={() => execute()}
      disabled={isExecuting}
    >
      <FcGoogle className="mr-4 h-7 w-7" />
      Sign in with Google
    </Button>
  );
};

export default GoogleAuthButton;
