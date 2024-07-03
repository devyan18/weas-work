import { server } from "@/supabase/client";

export type NewProfile = {
  user: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  public: boolean;
};

export type Profile = NewProfile & {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar: string;
};

export class UserService {
  static async getUser({ userId }: { userId: string }) {
    const { data, error } = await server
      .from("users")
      .select("*")
      .eq("id", userId);

    if (error) {
      return null;
    }

    console.log(data);

    return data ? (data[0] as Profile) : null;
  }
}
