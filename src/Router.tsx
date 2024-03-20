import { RouterProvider, createHashRouter } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DefaultLayout } from "./layouts/Default";
import { StartPage } from "./pages/Start";
import { LoginPage } from "./pages/Login";
import { AboutPage } from "./pages/About";
import { PrivacyPage } from "./pages/Privacy";
import { DashboardPage } from "./pages/Dashboard";
import { InvestmentPage } from "./pages/Investment";
import { NewInvestmentPage } from "./pages/NewInvestment";
import { UserOnlyRoute } from "./routes/UserOnly";

const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <StartPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <UserOnlyRoute>
        <DashboardLayout />
      </UserOnlyRoute>
    ),
    children: [
      {
        index: true, // same path as parent: "/dashboard"
        element: <DashboardPage />,
      },
      {
        path: "investment/:id",
        element: <InvestmentPage />,
        // TODO: Add a loader function
      },
      {
        path: "new",
        element: <NewInvestmentPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
