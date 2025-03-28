
import React from 'react';
import { Calendar, CheckCircle, Clock, DollarSign, Link, Plus, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ProgressCard from '@/components/ui-custom/ProgressCard';
import TaskCard from '@/components/student/TaskCard';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

// Mock data for dashboard
const mockEarnings = 425.50;
const mockTasks = [
  { id: 1, title: "Business Idea Submission", description: "Submit your initial business concept", status: "pending", deadline: "2023-07-10" },
  { id: 2, title: "Sales Projection", description: "Create your sales forecast for the month", status: "submitted", deadline: "2023-07-05", submittedAt: "2023-07-04" },
  { id: 3, title: "Marketing Strategy", description: "Document your marketing approach", status: "completed", deadline: "2023-06-25", feedback: "Great job thinking through customer acquisition!", rating: 4.5 },
  { id: 4, title: "Expense Report", description: "Submit your business expenses", status: "overdue", deadline: "2023-06-15" },
  { id: 5, title: "Prototype Design", description: "Submit images of your product prototype", status: "resubmit", deadline: "2023-06-20", feedback: "Please provide clearer images and include dimensions" }
];

const mockNextSession = {
  id: 1,
  title: "Product Innovation Workshop",
  date: new Date(2023, 6, 15, 15, 0), // July 15, 2023, 3:00 PM
  link: "https://zoom.us/j/1234567890"
};

const mockStats = {
  attendance: 90,
  taskCompletion: 85,
  customerCount: 12,
  salesTarget: 500,
  currentSales: 425.50
};

const StudentDashboard = () => {
  const { toast } = useToast();

  const handleJoinSession = () => {
    window.open(mockNextSession.link, "_blank");
    toast({
      title: "Session Link Opened",
      description: "You're joining the session in a new tab."
    });
  };
  
  const handleAddSale = () => {
    toast({
      title: "Add New Sale",
      description: "Opening the sales form."
    });
    // In a real app, this would navigate to the sales form or open a modal
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <Badge variant="outline" className="font-normal">Summer 2023</Badge>
      </div>

      {/* Main Stats Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-white">
        <CardHeader className="pb-3">
          <CardTitle>My Earnings</CardTitle>
          <CardDescription>Total sales revenue generated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-primary">${mockEarnings.toFixed(2)}</h2>
              <p className="text-sm text-muted-foreground">Target: ${mockStats.salesTarget.toFixed(2)}</p>
              <div className="w-full max-w-[200px] mt-2">
                <Progress value={(mockEarnings / mockStats.salesTarget) * 100} className="h-2" />
              </div>
            </div>
            <div>
              <Button size="sm" onClick={handleAddSale} className="gap-1">
                <DollarSign size={16} />
                Record Sale
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Session */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Next Session</CardTitle>
            <Badge>
              {format(mockNextSession.date, "MMM d")}
            </Badge>
          </div>
          <CardDescription>{mockNextSession.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-muted-foreground" />
              <span>{format(mockNextSession.date, "h:mm a")}</span>
            </div>
            <Button onClick={handleJoinSession} className="gap-1">
              <Link size={16} />
              Join Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProgressCard
          title="Attendance"
          value={mockStats.attendance}
          maxValue={100}
          icon={<Calendar size={18} />}
          color="primary"
        />
        <ProgressCard
          title="Task Completion"
          value={mockStats.taskCompletion}
          maxValue={100}
          icon={<CheckCircle size={18} />}
          color="success"
        />
        <ProgressCard
          title="Customer Count"
          value={mockStats.customerCount}
          maxValue={20}
          icon={<Star size={18} />}
          color="accent"
        />
      </div>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>Tasks that need your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks
              .filter(task => ["pending", "overdue", "resubmit"].includes(task.status))
              .map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            
            {mockTasks.filter(task => ["pending", "overdue", "resubmit"].includes(task.status)).length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <p>No pending tasks! Great job!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Sale Button - Fixed at bottom right */}
      <Button 
        onClick={handleAddSale}
        size="icon" 
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default StudentDashboard;
