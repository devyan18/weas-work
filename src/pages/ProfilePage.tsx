import { Button, Text } from "@/components/ui";
import { server } from "@/supabase/client";

export const ProfilePage = () => {
  const handleClick = async () => {
    await server.auth.signOut();
    location.href = "/signin";
  };

  return (
    <div className="p-5">
      <Text type="body" color="danger" weight="bold">
        Profile
      </Text>
      <Button variant="secondary" onClick={handleClick} value="Logout" />
    </div>
  );
};
