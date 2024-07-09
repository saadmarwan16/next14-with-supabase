import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full flex flex-col gap-6 min-h-screen justify-center items-center max-w-md py-6">
      <Avatar className="w-40 h-40 mb-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="Profile Avatar" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="name">Display Name</Label>
        <Input
          type="text"
          id="name"
          defaultValue={""}
          name="name"
          placeholder="Enter your full name here"
        />
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          defaultValue={user.email}
          name="email"
          placeholder="Enter your email address here"
        />
      </div>

      <div className="grid w-full max-w-md items-center gap-1.5">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          type="text"
          id="phone"
          defaultValue={user.phone}
          name="phone"
          placeholder="Enter your phone number here"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-8 self-stretch">
        <Button className="grow" variant="outline">
          Sign out
        </Button>
        <Button className="grow">Update</Button>
      </div>
    </div>
  );
}
