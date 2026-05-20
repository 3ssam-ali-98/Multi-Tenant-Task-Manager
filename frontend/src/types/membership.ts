export interface Membership {
  id: number;

  user: number

  member_email: string;

  member_name: string;

  role: "admin" | "member";

  is_owner: boolean;
}