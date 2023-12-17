import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (token?.role === "ADMIN") {
        return true;
      }
      return false;
    },
  },
});

export const config = { matcher: ["/admin"] };
