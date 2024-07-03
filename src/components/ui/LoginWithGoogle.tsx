import { useAuth } from "@/providers/AuthProvider";
import { GoogleIcon } from "@/components/icons";

export const LoginWithGoogle = () => {
  const { login } = useAuth();

  const handleClick = async () => {
    console.log("hola");
    await login("google");
  };

  return (
    <button
      className="flex flex-row items-center gap-4 p-2 px-3 bg-black rounded-full hover:text-gray-400"
      onClick={handleClick}
    >
      <GoogleIcon width={22} height={22} />
      <span>Login with Google</span>
    </button>
  );
};
