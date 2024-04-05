import {
  Flex,
  chakra,
  useBreakpointValue,
  useDisclosure,
  useOutsideClick,
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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: defaultSidebarState,
  });
  useOutsideClick({
    ref: sidebarRef,
    handler: handleOutsideClick,
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

  function handleOutsideClick(e: Event) {
    if (isOpen && !defaultSidebarState) {
      onClose();
      e.preventDefault();
    }
  }

  return (
    <chakra.div height={"100vh"}>
      {/* Header */}
      <chakra.div ref={headerRef}>
        <DashboardHeader
          onMenuClick={isOpen ? onClose : onOpen}
          isOpen={isOpen}
        />
      </chakra.div>
      <chakra.div
        display={"flex"}
        height={`calc(100% - ${headerHeight}px)`}
        overflow={"hidden"}
      >
        {/* Sidebar */}
        <Flex
          ref={sidebarRef}
          width={"fit-content"}
          zIndex={{ base: 1, md: 0 }}
          height={"100%"}
          bg={"white"}
          position={{ base: "fixed", md: "relative" }}
          display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        >
          <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Flex>
        {/* Main Content */}
        <chakra.main
          flexGrow={1}
          height={"100%"}
          overflow={"auto"}
          borderTopWidth={1}
          borderLeftWidth={1}
          borderTopLeftRadius={{ base: 0, md: "2xl" }}
          bg={"gray.100"}
          px={{ base: 4, md: 8 }}
          py={{ base: 4, md: 5 }}
        >
          <Outlet />
        </chakra.main>
      </chakra.div>
      <ScrollRestoration />
    </chakra.div>
  );
}
