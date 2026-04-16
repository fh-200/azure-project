import { graphClient } from "$lib/server/msgraph.ts";

export const load: PageLoad = async () => {
  try {
    const response = await graphClient
      .api("/users")
      .select("displayName,id,userPrincipalName,accountEnabled,jobTitle")
      .get();
    return {
      users: response.value,
    };
  } catch (error) {
    console.error("Error fetching", error);
    return {
      users: [],
      error: "Could not load users",
    };
  }
};

export const actions: Actions = {
  toggleStatus: async ({ request }) => {
    try {
      const data = await request.formData();
      const id = data.get("userId")?.toString();
      const currentStatus = data.get("currentStatus") === "true";

      await graphClient.api(`/users/${id}`).update({
        accountEnabled: !currentStatus,
      });
      return { success: true };
    } catch (error) {
      console.error(error);
    }
  },
};
