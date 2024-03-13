import { useEffect, type PropsWithChildren } from "react";

export function UserOnlyRoute({ children }: PropsWithChildren<object>) {
  useEffect(() => {
    console.log("UserOnlyRoute");
  }, []);

  return <>{children}</>;
}
