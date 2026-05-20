export interface Organization {
  id: number;
  name: string;
  owner: string;
  created_at: string;
  current_user_role: "admin" | "member";
  current_user_is_owner: boolean;
}