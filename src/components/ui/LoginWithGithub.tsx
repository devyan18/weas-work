import { useAuth } from "@/providers/AuthProvider";
import { GithubIcon } from "@/components/icons";

export const LoginWithGithub = () => {
  const { login } = useAuth();

  const handleClick = async () => {
    console.log("hola");
    await login("github");
  };

  return (
    <button
      className="bg-black p-2 px-3 rounded-full flex flex-row items-start gap-4 hover:text-gray-400"
      onClick={handleClick}
    >
      <GithubIcon
        className="rounded-full bg-white p-[3px] text-black flex items-center justify-center"
        width={20}
        height={20}
      />
      <span>Login with Github</span>
    </button>
  );
};
