import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import KakaoButton from "@/components/ui/kakaoButton";
import { Spinner } from "@/components/ui/spinner";
import { useSignInWithEmail } from "@/hook/mutations/auth/use-sign-in-with-email";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn, isPending: isSignInPending } = useSignInWithEmail({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
      setPassword("");
    },
  });

  const handleSignInClick = () => {
    if (email.trim() === "") {
      toast.error("이메일을 입력해주세요", { position: "top-center" });
      return;
    }
    if (password.trim() === "") {
      toast.error("비밀번호를 입력해주세요", {
        position: "top-center",
      });
      return;
    }

    signIn({ email, password });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h1 className="text-bold mb-1 text-2xl">로그인 하기</h1>
        <div className="text-muted-foreground">
          이메일을 입력하여 로그인하세요
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>

      <Button
        onClick={handleSignInClick}
        className="w-full"
        disabled={isSignInPending}
      >
        {isSignInPending ? <Spinner /> : "로그인"}
      </Button>

      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <div className="flex-1 border-t" />
        <span className="px-2">or continue with</span>
        <div className="flex-1 border-t" />
      </div>
      {/* <KakaoButton /> */}
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊어버리셨다면? 비밀번호 재설정
        </Link>
      </div>
    </div>
  );
}
