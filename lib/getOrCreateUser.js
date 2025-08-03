import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function getOrCreateUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("User not found");

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    const user = await db.user.upsert({
        where: {
            clerkUserId: clerkUser.id, // use Clerk ID for uniqueness
        },
        update: {
            name: clerkUser.firstName || "",
        },
        create: {
            clerkUserId: clerkUser.id, // must be a string value, not the type
            email,
            name: clerkUser.firstName || "",
        },
    });

    return user;
}
