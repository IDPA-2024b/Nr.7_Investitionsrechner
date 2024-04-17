import { RouterProvider, createHashRouter } from "react-router-dom";
import { DashboardLayout } from "./layouts/Dashboard";
import { DefaultLayout } from "./layouts/Default";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { AboutPage } from "./pages/About";
import { PrivacyPage } from "./pages/Privacy";
import { DashboardPage } from "./pages/Dashboard";
import { InvestmentPage } from "./pages/Investment";
import { NewInvestmentPage } from "./pages/NewInvestment";
import { UserOnlyRoute } from "./routes/UserOnly";
import { Contact } from "./pages/Contact";
import { InvestmentsProvider } from "./contexts/investments";

const router = createHashRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true, // same path as parent: "/"
        element: <HomePage />,
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
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <UserOnlyRoute>
        <InvestmentsProvider>
          <DashboardLayout />
        </InvestmentsProvider>
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
