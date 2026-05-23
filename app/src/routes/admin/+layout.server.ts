import { graphClient } from "$lib/server/msgraph";
// import { redirect } from "@sveltejs/kit";

// export const load: PageLoad = async ({ locals }) => {
//   if (!locals?.user?.includes?.role("admin")) {
//     redirect(302, "/");
//   }
// };

// export const load: PageLoad = async ({ params }) => {
//   try {
//     const response = await graphClient.api("/domains").get();
//     const defaultDomain =
//       response.value.find((d: any) => d.isDefault)?.id || "unknown";
//     // console.log(defaultDomain);
//     return {
//       tenantDomain: defaultDomain,
//     };
//   } catch (error) {
//     console.error(error);
//   }
// };
