<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    export const load: Load = ({ session }) => {
      console.log(session);
      if (!session?.user) {
      return {
          status: 302,
          redirect: "/login"
      }
      }
      return {
        status: 200,
        props: {
            user: session.user
        }
      };
    }
  </script>
  
  <script lang="ts">
    export let user: {login: string};
  
  
    // import { session } from '$app/stores';
    // $session.user;
  </script>
  
  <h1 class='text-2xl font-semibold text-center'>Witaj {user.login}!</h1>