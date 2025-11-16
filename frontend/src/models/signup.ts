import type Login from "./login";

export default interface Signup extends Login {
    firstName: string,
    lastName: string
}