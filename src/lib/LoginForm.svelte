<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let login: String = '';
    let password: String = '';

    function submit() {
        dispatch('submit', 
        {
        login,
        password
        })
    }

</script>
<form on:submit|preventDefault={submit} class="form-control {$$props.class}">
    <label class="label">
        <span class="label-text">Podaj swoje dane logowania.</span>
    </label>
    <label class="input-group max-w-md">
        <span class="w-18 justify-center">Login</span>
        <input type="text" name="login" id="login" placeholder="aniakowalska123" class="input input-bordered" bind:value={login} required  />
    </label>
    <label class="input-group max-w-md">
        <span class="w-18 justify-center">Hasło</span>
        <input type="password" name="password" id="password" placeholder="********" bind:value={password} class="input input-bordered" required  />
    </label>
    <button class="btn btn-primary" type="submit">Zaloguj się</button>
</form>