import { signOut } from "@/api/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/store/session";
import { LogIn, LogOut, User } from "lucide-react";
import { Link } from "react-router";

export default function ProfileButton() {
  const session = useSession();

  if (!session) {
    return (
      <Button variant="ghost" size="sm" asChild className="gap-1.5">
        <Link to="/sign-in">
          <LogIn className="h-4 w-4" />
          로그인
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-muted cursor-pointer rounded-full p-2 focus:outline-none">
          <User className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="text-muted-foreground px-2 py-1.5 text-xs">
          {session.user.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
