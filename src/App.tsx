import { ChakraProvider } from "@chakra-ui/react";
import { theme, toastOptions } from "./configs/chakra";
import { Router } from "./Router";
import { AuthProvider } from "./contexts/auth";

function App() {
	return (
		<ChakraProvider theme={theme} toastOptions={toastOptions}>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ChakraProvider>
	);
}

export default App;
