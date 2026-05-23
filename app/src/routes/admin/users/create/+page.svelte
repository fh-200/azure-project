<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  let { data, form } = $props();

  let user = $state({
    displayName: '',
    jobTitle: '',
    accountEnabled: true,
    mailNickname: '',
    passwordProfile: {
    forceChangePasswordNextSignIn: true,
    password: '',
  },
  tenantDomain: data?.tenantDomain
  })
  // let generatedUPN = $derived(user.mailNickname ? `${user.mailNickname}@${data?.tenantDomain}` : '');
  let passwordVisible = $state('password')
  
  function showPassword () {
    return passwordVisible = passwordVisible === 'password' ? 'text' : 'password'
  } 

</script>

<div class="mx-auto max-w-3xl p-6">
<div class="mb-6">  <Button href="/admin/users" variant="secondary" >← Back </Button>
</div>
  <div class="mb-6">
    <h1 class="text-2xl font-semibold tracking-tight">Create User</h1>
    <p class="mt-1 text-sm text-muted-foreground">
      Create a new Entra ID user in the current tenant.
    </p>
  </div>

  {#if form?.message}
    <div class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {form.message}
    </div>
  {/if}

  <form method="POST" action="?/createUser" class="space-y-6">
    <input
      type="text"
      name="tenantDomain"
      hidden
      readonly
      bind:value={user.tenantDomain}
    />

    <div class="rounded-lg border bg-card p-5 shadow-sm">
      <div class="mb-5">
        <h2 class="text-base font-medium">User details</h2>
        <p class="text-sm text-muted-foreground">
          Basic identity information for the new account.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <Label for="displayName">Display Name</Label>
          <Input
            id="displayName"
            name="displayName"
            required
            bind:value={user.displayName}
            placeholder="Jane Smith"
          />
        </div>

        <div class="space-y-2">
          <Label for="mailNickname">Mail Nickname</Label>
          <Input
            id="mailNickname"
            name="mailNickname"
            required
            bind:value={user.mailNickname}
            placeholder="jsmith"
          />
          <p class="text-xs text-muted-foreground">
            User principal name will be generated from this value.
          </p>
        </div>

        <div class="space-y-2 md:col-span-2">
          <Label for="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            name="jobTitle"
            bind:value={user.jobTitle}
            placeholder="Teacher, Technician, Staff, etc."
          />
        </div>
      </div>
    </div>

    <div class="rounded-lg border bg-card p-5 shadow-sm">
      <div class="mb-5">
        <h2 class="text-base font-medium">Password</h2>
        <p class="text-sm text-muted-foreground">
          Set the initial password and sign-in behavior.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div class="space-y-2">
          <Label for="password">Initial Password</Label>
          <Input
            id="password"
            name="password"
            required
            bind:value={user.passwordProfile.password}
            type={passwordVisible}
            placeholder="Temporary password"
          />
        </div>

        <Button type="button" variant="outline" onclick={() => showPassword()}>
          {passwordVisible === "password" ? "Show" : "Hide"}
        </Button>
      </div>

      <div class="mt-5 flex items-start gap-3 rounded-md border bg-muted/30 p-4">
        <Checkbox
          id="forceChangePasswordNextSignIn"
          name="forceChangePasswordNextSignIn"
          bind:checked={user.passwordProfile.forceChangePasswordNextSignIn}
        />
        <div class="grid gap-1.5 leading-none">
          <Label for="forceChangePasswordNextSignIn">
            Force password change at next sign-in
          </Label>
          <p class="text-sm text-muted-foreground">
            Recommended for temporary passwords.
          </p>
        </div>
      </div>
    </div>

    <div class="rounded-lg border bg-card p-5 shadow-sm">
      <div class="mb-5">
        <h2 class="text-base font-medium">Account status</h2>
        <p class="text-sm text-muted-foreground">
          Choose whether the account should be active immediately.
        </p>
      </div>

      <div class="flex items-start gap-3 rounded-md border bg-muted/30 p-4">
        <Checkbox
          id="accountEnabled"
          name="accountEnabled"
          bind:checked={user.accountEnabled}
        />
        <div class="grid gap-1.5 leading-none">
          <Label for="accountEnabled">Account enabled</Label>
          <p class="text-sm text-muted-foreground">
            If unchecked, the account will be created but blocked from signing in.
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end gap-3 border-t pt-6">
      <Button type="button" variant="outline" onclick={() => history.back()}>
        Cancel
      </Button>

      <Button type="submit">
        Create User
      </Button>
    </div>
  </form>
</div>
<!-- {JSON.stringify(user)}
{passwordVisible} -->

