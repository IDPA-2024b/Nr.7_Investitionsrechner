import {
  Flex,
  chakra,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { DashboardHeader } from "../components/headers/Dashboard";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";

export function DashboardLayout() {
  const defaultSidebarState = useBreakpointValue(
    { base: false, md: true },
    {
      ssr: false,
    }
  );
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const { onToggle, isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: defaultSidebarState,
  });

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <chakra.div height={"100vh"}>
      {/* Header */}
      <chakra.div ref={headerRef}>
        <DashboardHeader onMenuClick={onToggle} isOpen={isOpen} />
      </chakra.div>
      <chakra.div
        display={"flex"}
        height={`calc(100% - ${headerHeight}px)`}
        overflow={"hidden"}
      >
        {/* Sidebar */}
        <Flex
          justify={"center"}
          width={{ base: "100%", md: "auto" }}
          display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        >
          <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Flex>
        {/* Main Content */}
        <chakra.main
          display={{ base: isOpen ? "none" : "block", md: "block" }}
          flexGrow={1}
          height={"100%"}
          overflow={"auto"}
          borderTopWidth={1}
          borderLeftWidth={1}
          borderTopLeftRadius={{ base: 0, md: "2xl" }}
          bg={"gray.100"}
        >
          <Outlet />
        </chakra.main>
      </chakra.div>
      <ScrollRestoration />
    </chakra.div>
  );
}
