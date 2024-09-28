import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-dvh w-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
