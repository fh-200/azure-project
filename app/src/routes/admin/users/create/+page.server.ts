import { graphClient } from "$lib/server/msgraph";
import { redirect, fail, isRedirect } from "@sveltejs/kit";

export const actions: Actions = {
  createUser: async ({ request }) => {
    try {
      const data = await request.formData();
      const user = Object.fromEntries(data);
      const {
        accountEnabled,
        displayName,
        mailNickname,
        tenantDomain,
        password,
        forceChangePasswordNextSignIn,
      } = user;

      const newUser = {
        accountEnabled: accountEnabled === "on" ? true : false,
        displayName: displayName,
        mailNickname: mailNickname,
        userPrincipalName: `${mailNickname}@${tenantDomain}`,
        passwordProfile: {
          forceChangePasswordNextSignIn:
            forceChangePasswordNextSignIn === "on" ? true : false,
          password: password,
        },
      };
      console.log("Constructed newUser successfully:", newUser);
      const response = await graphClient.api("/users").post(newUser);
      throw redirect(303, "/admin/users");
      console.log(response);
      return {
        response: response.value,
      };
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }
      const errorBody = JSON.parse(error?.body || {});
      const errorMessage = errorBody.message || "Unexpected error has occured";
      console.error(error);
      return fail(400, {
        message: errorMessage,
      });
    }
  },
};
