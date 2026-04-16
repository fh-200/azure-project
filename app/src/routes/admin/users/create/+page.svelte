<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";

  let newUser = $state({
    displayName: '',
    jobTitle: '',
    accountEnabled: true
  })

</script>

<div class="overflow-x-auto p-4">

<h1>Create User</h1>

<form>
<div>
  <Label>Display Name</Label>
  <Input required bind:value={newUser.displayName}/>
</div>
<div>
  <Label>Job Title</Label>
  <Input  bind:value={newUser.jobTitle}/>
</div>
<div>
  <Label>Account Enabled</Label>
  <Checkbox required bind:checked={newUser.accountEnabled}/>
</div>

<Button type="submit">Create User</Button>
</form>
</div>

{JSON.stringify(newUser)}