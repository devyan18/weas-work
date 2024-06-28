import { LoginWithGithub, LoginWithGoogle } from "@/components/ui";

export const SignInpage = () => {
  return (
    <div className="h-screen w-screen bg-primary text-white">
      <div className="h-full w-full flex flex-col items-center justify-center min-h-[70dvh]">
        <div className="bg-black-200 p-5 rounded-3xl flex flex-col gap-6">
          <h2 className="text-2xl font-pregular">Login with</h2>
          <hr />
          <div className="flex flex-col gap-2">
            <LoginWithGithub />
            <LoginWithGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};
