import { Button, Container, Heading, VStack, useToast } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/contexts";
import { useNavigate } from "react-router-dom";
import type { User } from "firebase/auth";

type AuthProcessingStates =
  | null
  | "processing-google-auth"
  | "processing-anonymous-auth";

export function LoginPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { loginWithGoogle, loginAnonymously, user } = useAuth();
  const [processing, setProcessing] = useState<AuthProcessingStates>(null);

  async function handleGoogleLogin() {
    setProcessing("processing-google-auth");
    const user = await loginWithGoogle();
    setProcessing(null);
    if (user) handleSuccessfulLogin(user);
  }

  async function handleAnonymousLogin() {
    setProcessing("processing-anonymous-auth");
    const user = await loginAnonymously();
    setProcessing(null);
    if (user) handleSuccessfulLogin(user);
  }

  function handleSuccessfulLogin(user: User) {
    const name = user.isAnonymous ? "Anonymous" : user.displayName ?? "User";
    toast({
      title: "Logged in",
      description: `Welcome, ${name}!`,
      status: "success",
    });
    navigate("/dashboard");
  }

  useEffect(() => {
    if (user) {
      handleSuccessfulLogin(user);
    }
  }, [user]);

  return (
    <Container>
      <VStack>
        <Heading>Login</Heading>
        <VStack width={"100%"} gap={5}>
          <Button
            width={"100%"}
            colorScheme="teal"
            leftIcon={<FcGoogle />}
            isDisabled={!!processing}
            isLoading={processing === "processing-google-auth"}
            onClick={handleGoogleLogin}
          >
            Google
          </Button>
          <Button
            width={"100%"}
            variant="outline"
            colorScheme="teal"
            isDisabled={!!processing}
            isLoading={processing === "processing-anonymous-auth"}
            onClick={handleAnonymousLogin}
          >
            Anonyms
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
