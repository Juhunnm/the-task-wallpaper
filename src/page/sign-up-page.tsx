import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import KakaoButton from "@/components/ui/kakaoButton";
import { Spinner } from "@/components/ui/spinner";
import { useSignUp } from "@/hook/mutations/auth/use-sign-up";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      toast("회원가입이 완료되었습니다!", {
        description: "이메일 인증 후 로그인할 수 있어요",
        position: "top-center",
      });
      setEmail("");
      setPassword("");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
      setEmail("");
      setPassword("");
    },
  });

  const handleSignUpClick = () => {
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
    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h1 className="text-bold mb-1 text-2xl">회원가입 하기</h1>
        <div className="text-muted-foreground">
          이메일을 입력하여 계정을 생성하세요
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
      </div>

      <Button
        disabled={isSignUpPending}
        onClick={handleSignUpClick}
        className="w-full cursor-pointer"
      >
        {isSignUpPending ? <Spinner /> : "회원가입"}
      </Button>
      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <div className="flex-1 border-t" />
        <span className="px-2">or continue with</span>
        <div className="flex-1 border-t" />
      </div>
      {/* <KakaoButton /> */}
      <div>
        <div>
          <Link
            className="text-muted-foreground hover:underline"
            to={"/sign-in"}
          >
            이미 계정이 있다면? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
