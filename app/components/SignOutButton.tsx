"use client";

import { Button } from "@/components/ui/button";
import { FunctionComponent } from "react";
import { useAction } from "next-safe-action/hooks";
import { signOut } from "../actions";

interface SignOutButtonProps {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  const { execute, isExecuting } = useAction(signOut);

  return (
    <Button
      className="grow"
      variant="outline"
      disabled={isExecuting}
      onClick={() => execute()}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
