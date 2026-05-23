import { graphClient } from "$lib/server/msgraph";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

type GraphUser = {
  id: string;
  displayName?: string;
  userPrincipalName?: string;
  accountEnabled?: boolean;
  jobTitle?: string;
};

export const load: PageServerLoad = async () => {
  try {
    const response = await graphClient
      .api("/users")
      .select("displayName,id,userPrincipalName,accountEnabled,jobTitle")
      .orderby("displayName")
      .get();

    return {
      users: response.value as GraphUser[],
    };
  } catch (error) {
    console.error("Failed to load users:", error);

    return {
      users: [] as GraphUser[],
      error: "Could not load users",
    };
  }
};

export const actions: Actions = {
  toggleStatus: async ({ request }) => {
    const formData = await request.formData();
    const userId = formData.get("userId")?.toString();

    if (!userId) {
      return fail(400, {
        message: "Missing userId",
      });
    }

    try {
      const user = await graphClient
        .api(`/users/${userId}`)
        .select("id,accountEnabled")
        .get();

      const nextAccountEnabled = !user.accountEnabled;

      await graphClient.api(`/users/${userId}`).update({
        accountEnabled: nextAccountEnabled,
      });

      return {
        success: true,
        userId,
        accountEnabled: nextAccountEnabled,
      };
    } catch (error) {
      console.error(`Failed to toggle user ${userId}:`, error);

      return fail(500, {
        message: "Could not update user status",
      });
    }
  },

  deleteUser: async ({ request }) => {
    const formData = await request.formData();
    const userId = formData.get("userId")?.toString();

    if (!userId) {
      return fail(400, {
        message: "Missing userId",
      });
    }

    try {
      await graphClient.api(`/users/${userId}`).delete();

      return {
        success: true,
        userId,
      };
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);

      return fail(500, {
        message: "Could not delete user",
      });
    }
  },
};
