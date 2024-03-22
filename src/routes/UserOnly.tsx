import { useEffect, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/contexts";

export function UserOnlyRoute({ children }: PropsWithChildren<object>) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!user) navigate("/login", { state: { from: location.pathname } });
	}, [user, navigate, location]);

	return <>{children}</>;
}
