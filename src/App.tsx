
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/Layout/MainLayout";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentTasks from "./pages/student/Tasks";
import StudentSessions from "./pages/student/Sessions";
import StudentSales from "./pages/student/Sales";
import StudentLeaderboard from "./pages/student/Leaderboard";

// Mentor Pages
import MentorDashboard from "./pages/mentor/Dashboard";
import MentorBatches from "./pages/mentor/Batches";
import MentorBatchDetails from "./pages/mentor/BatchDetails";
import MentorEarnings from "./pages/mentor/Earnings";
import MentorLeaderboard from "./pages/mentor/Leaderboard";
import MentorStudentDetails from "./pages/mentor/StudentDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Protected routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rewards" element={<Rewards />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/tasks" element={<StudentTasks />} />
            <Route path="/student/sessions" element={<StudentSessions />} />
            <Route path="/student/sales" element={<StudentSales />} />
            <Route path="/student/leaderboard" element={<StudentLeaderboard />} />
            
            {/* Mentor Routes */}
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/batches" element={<MentorBatches />} />
            <Route path="/mentor/batches/:batchId" element={<MentorBatchDetails />} />
            <Route path="/mentor/students/:studentId" element={<MentorStudentDetails />} />
            <Route path="/mentor/earnings" element={<MentorEarnings />} />
            <Route path="/mentor/leaderboard" element={<MentorLeaderboard />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
