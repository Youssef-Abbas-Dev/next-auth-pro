import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);

const authRoutes = ["/login", "/register", "/verify", "/forgot-password", "/reset-password"];
const protectedRotues = ["/profile", "/profile/edit"];

export default middleware((req) => {
    const { nextUrl } = req;
    const path = nextUrl.pathname;
    const isUserLoggedIn: boolean = Boolean(req.auth);

    if (authRoutes.includes(path) && isUserLoggedIn)
        return NextResponse.redirect(new URL("/profile", nextUrl));

    if (protectedRotues.includes(path) && !isUserLoggedIn)
        return NextResponse.redirect(new URL("/login", nextUrl));
});

export const config = {
    matcher: ["/login", "/register", "/profile/:path*", "/verify", "/forgot-password", "/reset-password"]
}