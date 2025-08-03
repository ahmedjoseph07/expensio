import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function getOrCreateUser() {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("User not found");

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    // Try to find existing user by clerkUserId or email
    let user = await db.user.findFirst({
        where: {
            OR: [{ clerkUserId: clerkUser.id }, { email }],
        },
    });

    if (user) {
        // Update user if needed (e.g., update clerkUserId or name)
        if (!user.clerkUserId) {
            user = await db.user.update({
                where: { id: user.id },
                data: {
                    clerkUserId: clerkUser.id,
                    name: clerkUser.firstName || "",
                },
            });
        } else if (user.name !== clerkUser.firstName) {
            user = await db.user.update({
                where: { id: user.id },
                data: { name: clerkUser.firstName || "" },
            });
        }
        return user;
    } else {
        // Create new user
        user = await db.user.create({
            data: {
                clerkUserId: clerkUser.id,
                email,
                name: clerkUser.firstName || "",
            },
        });
        return user;
    }
}
