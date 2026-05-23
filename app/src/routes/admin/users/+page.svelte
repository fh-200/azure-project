<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";

  let { data } = $props();

  let users = $state<typeof data.users>([]);
  let pendingId = $state<string | null>(null);

  $effect(() => {
    users = data.users;
  });
</script>

<div class="mx-auto max-w-6xl p-6">
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-semibold">Users</h1>
      <p class="text-sm text-muted-foreground">{users.length} users loaded</p>
    </div>

    <Button href="/admin/users/create">Create User</Button>
  </div>

  <div class="overflow-hidden rounded-lg border">
    <table class="w-full">
      <thead class="bg-muted/50">
        <tr>
          <th class="px-6 py-3 text-left text-xs uppercase text-muted-foreground">User</th>
          <th class="px-6 py-3 text-left text-xs uppercase text-muted-foreground">Status</th>
          <th class="px-6 py-3 text-right text-xs uppercase text-muted-foreground">Actions</th>
        </tr>
      </thead>

      <tbody class="divide-y">
        {#each users as user (user.id)}
          <tr>
            <td class="px-6 py-4">
              <a class="font-medium" href={`/admin/users/${user.id}`}>
                {user.displayName || "Unnamed user"}
              </a>
              <div class="text-sm text-muted-foreground">
                {user.userPrincipalName}
              </div>
            </td>

            <td class="px-6 py-4">
              <span
                class={`rounded-full px-2 py-1 text-xs ${
                  user.accountEnabled
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.accountEnabled ? "Active" : "Disabled"}
              </span>
            </td>

            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">
                <form
                  method="POST"
                  action="?/toggleStatus"
                  use:enhance={({ formData }) => {
                    const userId = formData.get("userId")?.toString();
                    pendingId = userId ?? null;

                    return async ({ result }) => {
                      if (result.type === "success" && result.data?.success && userId) {
                        const user = users.find((u) => u.id === userId);

                        if (user) {
                          user.accountEnabled = result.data.accountEnabled;
                        }
                      }

                      pendingId = null;
                    };
                  }}
                >
                  <input type="hidden" name="userId" value={user.id} />

                  <Button type="submit" variant="outline" disabled={pendingId === user.id}>
                    {pendingId === user.id
                      ? "Saving..."
                      : user.accountEnabled
                        ? "Disable"
                        : "Enable"}
                  </Button>
                </form>

                <form
                  method="POST"
                  action="?/deleteUser"
                  use:enhance={({ formData, cancel }) => {
                    const userId = formData.get("userId")?.toString();

                    if (!confirm(`Delete ${user.displayName || user.userPrincipalName}?`)) {
                      cancel();
                      return;
                    }

                    pendingId = userId ?? null;

                    return async ({ result }) => {
                      if (result.type === "success" && result.data?.success && userId) {
                        users = users.filter((u) => u.id !== userId);
                      }

                      pendingId = null;
                    };
                  }}
                >
                  <input type="hidden" name="userId" value={user.id} />

                  <Button
                    type="submit"
                    disabled={pendingId === user.id}
                    class="bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </form>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    {#if users.length === 0}
      <div class="p-8 text-center text-sm text-muted-foreground">
        No users found.
      </div>
    {/if}
  </div>
</div>