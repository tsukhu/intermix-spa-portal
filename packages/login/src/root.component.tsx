import React from "react";
import { navigateToUrl } from "single-spa";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { getGlobalStore, Role } from "@intermix/store";
import { LoginForm } from "./components/login-form";

export const NAMESPACE = "intermix-spa-portal";

export default function Root(props) {
  const store = getGlobalStore();

  const handleLogin = ({ username, _ }) => {
    // Dummy for admin user test
    // ideally call an auth service to handle this
    let user = {
      role: "",
      name: username,
      authToken: "token_1",
      authenticated: true,
    };
    if (username.toLowerCase().includes("admin")) {
      user = { ...user, role: Role.Admin };
      store.setUser(user);
    } else {
      user = { ...user, role: Role.User };
      store.setUser(user);
    }
    navigateToUrl("/");
  };
  return <LoginForm onSuccess={(data: any) => handleLogin(data)} />;
}
