import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/favicon.ico"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/(api|trpc)(.*)"],
};
