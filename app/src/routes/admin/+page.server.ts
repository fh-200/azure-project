export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const data = await request.formData();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export const load: PageLoad = async ({ params }) => {
  return { status: "success" };
};
