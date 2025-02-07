import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRotues = ["/profile"]

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
    matcher: ["/login", "/register", "/profile"]
}