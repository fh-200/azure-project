<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/button/button.svelte';

  let {data} = $props()
  let users = $derived(data.users)
  let updatingId = $state<null | string>(null) 
</script>

<div class="overflow-x-auto p-4">
  <div class="flex flex-row justify-between py-4">
    <h1 class="text-xl ">Users</h1>
    <Button href="users/create">Create User</Button>
  </div>
  <table class="min-w-full divide-y divide-gray-200 border rounded-lg shadow-sm">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each users as user}
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <div class="font-medium text-gray-900">{user.displayName}</div>
            <div class="text-sm text-gray-500">{user.userPrincipalName}</div>
          </td>
          <td class="px-6 py-4">
            {#if user.accountEnabled}
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
            {:else}
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Disabled</span>
            {/if}
          </td>
<td class="px-6 py-4 text-right">
  <form 
  method="POST" 
  action="?/toggleStatus" 
  use:enhance={() => {
    return async ({ result, update, formData }) => {
      updatingId = formData.get('userId')?.toString() ?? null;
      await update();
      updatingId = null;
    };
  }}
>
  <input type="hidden" name="userId" value={user.id} />
  <input type="hidden" name="currentStatus" value={user.accountEnabled} />
  
  <button 
    disabled={updatingId === user.id}
    class="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
  >
    {#if updatingId === user.id}
      <svg class="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Processing...
    {:else}
      {user.accountEnabled ? 'Disable' : 'Enable'}
    {/if}
  </button>
</form>
</td>        </tr>
      {/each}
    </tbody>
  </table>
</div>