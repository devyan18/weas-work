import { useAuth } from "@/providers/AuthProvider";
import { Link, useNavigate } from "@tanstack/react-router";

type Props = {
  className?: string;
};

export const Navbar = ({ className }: Props) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  if (!user) {
    return (
      <nav className="w-full bg-black-200 rounded-3xl p-2 px-4 flex flex-row justify-between items-center">
        <ul className="flex flex-row gap-4 pl-4">
          <li>
            <Link to="/signin" className="[&.active]:font-pbold font-pregular">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav
      className={`w-full bg-black-200 rounded-3xl p-0 px-4 flex flex-row justify-between items-center ${className}`}
    >
      <ul className="flex flex-row gap-4 pl-4">
        <li>
          <Link
            to="/private/home"
            className="text-gray-400 [&.active]:text-white [&.active]:font-pbold font-pregular [&.active]]:hover:underline [&.active]:hover:decoration-white hover:underline hover:decoration-gray-400"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/private/profile"
            className="text-gray-400 [&.active]:text-white [&.active]:font-pbold font-pregular [&.active]]:hover:underline [&.active]:hover:decoration-white hover:underline hover:decoration-gray-400"
          >
            Profile
          </Link>
        </li>
      </ul>

      <div
        className="flex flex-row gap-2 items-center cursor-pointer"
        onClick={() => {
          navigate({
            to: "/private/profile",
          });
        }}
      >
        <span className="text-[14px] hover:underline hover:decoration-white">
          {user?.fullName}
        </span>

        <img
          src={user?.avatar}
          alt={user?.fullName}
          className="h-8 rounded-full"
        />
      </div>
    </nav>
  );
};
