import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./config/theme";
import { Router } from "./Router";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

export default App;
