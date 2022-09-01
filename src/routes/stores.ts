export let loggedIn: boolean = false;

export const logIn = () => {
    loggedIn = true;
    console.log(loggedIn);
    
}

export const logOut = () => {
    loggedIn = false;
    console.log(loggedIn);
}