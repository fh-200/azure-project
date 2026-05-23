import { graphClient } from "$lib/server/msgraph";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const user = await graphClient
      .api(`/users/${params.id}`)
      .select([
        "id",
        "displayName",
        "userPrincipalName",
        "mail",
        "accountEnabled",
        "jobTitle",
        "department",
        "createdDateTime",
        "userType",
      ])
      .get();

    return { user };
  } catch (err) {
    console.error(err);
    throw error(404, "User not found");
  }
};
