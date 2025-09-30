import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <Button className="rounded-2xl border border-pink-600 bg-pink-100 text-base font-medium text-pink-600 hover:bg-pink-200 corner-squircle">
        <Skeleton className="h-full w-12 rounded-full" />
      </Button>
    );

  if (!session)
    return (
      <Button
        onClick={() => signIn("google")}
        className="rounded-2xl border border-pink-600 bg-pink-100 text-base font-medium text-pink-600 hover:bg-pink-200 corner-squircle"
      >
        Sign In
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative w-10 h-10 ">
          <Avatar className="h-10 w-10 rounded-2xl corner-squircle">
            <AvatarImage
              src={session.user?.image || ""}
              alt={session.user?.name || ""}
            />
            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 corner-squircle"
        align="end"
        forceMount
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;

{
  /* <Button
  onClick={() => signOut()}
  className="rounded-2xl border border-pink-600 bg-pink-100 text-base font-medium text-pink-600 hover:bg-pink-200 corner-squircle"
>
  Sign out
</Button>; */
}
