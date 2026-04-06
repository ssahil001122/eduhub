import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

// Mock users for Cloudflare Demo
const MOCK_USERS = [
  { id: "1", name: "Admin", email: "admin@eduhub.com", role: "admin", password: "password123" },
  { id: "2", name: "Teacher", email: "teacher@eduhub.com", role: "teacher", password: "password123" },
  { id: "3", name: "Accountant", email: "accountant@eduhub.com", role: "accountant", password: "password123" },
  { id: "4", name: "Student", email: "student@eduhub.com", role: "student", password: "password123" },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = MOCK_USERS.find(u => u.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
