import { Outlet, ScrollRestoration } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import { DefaultHeader } from "../components/headers/Default";
import { Footer } from "../components/Footer";
import type { ILink } from "../types/link";

const links: ILink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Privacy",
    href: "/privacy",
  },
];

export function DefaultLayout() {
  return (
    <chakra.div width={"100%"}>
      <chakra.div minHeight={"100vh"} width={"100%"}>
        <DefaultHeader links={links} />
        <chakra.main>
          <Outlet />
        </chakra.main>
      </chakra.div>
      <Footer
        links={[
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Login",
            href: "/login",
          },
          ...links,
        ]}
      />
      <ScrollRestoration />
    </chakra.div>
  );
}
