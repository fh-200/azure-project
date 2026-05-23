<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  let { data } = $props();
  let user = $derived(data.user);
</script>

<div class="mx-auto max-w-4xl p-6">
  <div class="mb-6 flex items-start justify-between gap-4">
    <div>
      <a href="/admin/users" class="text-sm text-muted-foreground hover:underline">
        ← Back to users
      </a>

      <h1 class="mt-3 text-2xl font-semibold tracking-tight">
        {user.displayName || "Unnamed user"}
      </h1>

      <p class="mt-1 text-sm text-muted-foreground">
        {user.userPrincipalName}
      </p>
    </div>

    {#if user.accountEnabled}
      <span class="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
        Active
      </span>
    {:else}
      <span class="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
        Disabled
      </span>
    {/if}
  </div>

  <div class="grid gap-6 md:grid-cols-[1fr_280px]">
    <div class="rounded-lg border bg-card p-5 shadow-sm">
      <h2 class="text-base font-medium">Profile</h2>

      <dl class="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt class="text-sm text-muted-foreground">Display name</dt>
          <dd class="mt-1 text-sm font-medium">{user.displayName || "—"}</dd>
        </div>

        <div>
          <dt class="text-sm text-muted-foreground">User principal name</dt>
          <dd class="mt-1 text-sm font-medium">{user.userPrincipalName || "—"}</dd>
        </div>

        <div>
          <dt class="text-sm text-muted-foreground">Mail</dt>
          <dd class="mt-1 text-sm font-medium">{user.mail || "—"}</dd>
        </div>

        <div>
          <dt class="text-sm text-muted-foreground">Job title</dt>
          <dd class="mt-1 text-sm font-medium">{user.jobTitle || "—"}</dd>
        </div>

        <div>
          <dt class="text-sm text-muted-foreground">Department</dt>
          <dd class="mt-1 text-sm font-medium">{user.department || "—"}</dd>
        </div>

        <div>
          <dt class="text-sm text-muted-foreground">User type</dt>
          <dd class="mt-1 text-sm font-medium">{user.userType || "—"}</dd>
        </div>
      </dl>
    </div>

    <div class="rounded-lg border bg-card p-5 shadow-sm">
      <h2 class="text-base font-medium">Actions</h2>

      <div class="mt-5 grid gap-2">
        <Button variant="outline">
          Reset password
        </Button>

        <Button variant="outline">
          {user.accountEnabled ? "Disable account" : "Enable account"}
        </Button>

        <Button class="bg-red-500 text-white hover:bg-red-600">
          Delete user
        </Button>
      </div>
    </div>
  </div>
</div>