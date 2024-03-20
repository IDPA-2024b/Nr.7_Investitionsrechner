import { Outlet, ScrollRestoration } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import { Header } from "../components/Header";
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
    name: "Privacy",
    href: "/privacy",
  },
];

export function DefaultLayout() {
  return (
    <chakra.div width={"100%"}>
      <chakra.div minHeight={"100vh"} width={"100%"}>
        <Header links={links} />
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
