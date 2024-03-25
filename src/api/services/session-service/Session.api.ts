"use server";
import { SessionUserServices } from "./Session.service";
import { ILoginInputs } from "./types/definitions";

const userSession = new SessionUserServices();
/**
 * @returns object that include information about user in field "user", and token expiration time
 */
const getSession = async () => userSession.getUserSession();
/**
 * Function that allows you to get current session information
 * @param formData email and password
 * @returns
 */
const login = async (formData: ILoginInputs) => userSession.login(formData);
const logout = async () => {
  userSession.logout();
};

export { getSession, login, logout };
