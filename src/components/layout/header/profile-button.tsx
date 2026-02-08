import { signOut } from "@/api/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/store/session";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router";

export default function ProfileButton() {
  const session = useSession();
  console.log(session);

  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-muted cursor-pointer rounded-full p-2 focus:outline-none">
          <User className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem asChild>
          <Link to={`/profile/${session.user.id}`}>
            <User className="mr-2 h-4 w-4" />
            프로필
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem
          onClick={signOut}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
