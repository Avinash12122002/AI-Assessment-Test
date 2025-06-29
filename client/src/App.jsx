import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Login from "@/pages/auth/Login";
import HrDashboard from "@/pages/hr/Dashboard";
import CandidateDashboard from "@/pages/candidate/Dashboard";
import NotFound from "@/pages/NotFound";
import CreateTest from "@/pages/hr/CreateTest";
import MonitorTests from "@/pages/hr/MonitorTests";
import Reports from "@/pages/hr/Reports";
import TestResults from "@/pages/hr/TestResults";
import StartTest from "@/pages/candidate/StartTest";
import TakeTest from "@/pages/candidate/TakeTest";
import PreviousResults from "@/pages/candidate/PreviousResults";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          {/* HR Routes */}
          <Route path="/hr/dashboard" element={<HrDashboard />} />
          <Route path="/hr/create-test" element={<CreateTest />} />
          <Route path="/hr/monitor-tests" element={<MonitorTests />} />
          <Route path="/hr/reports" element={<Reports />} />
          <Route
            path="/hr/test-results/:testId"
            element={<TestResults />}
          />{" "}
          {/* New route */}
          {/* Candidate Routes */}
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate/start-test" element={<StartTest />} />
          <Route path="/candidate/take-test" element={<TakeTest />} />
          <Route path="/candidate/results" element={<PreviousResults />} />
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
