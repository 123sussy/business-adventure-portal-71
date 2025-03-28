
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskCard from '@/components/student/TaskCard';

// Define the task type to match TaskCard props
type TaskStatus = 'pending' | 'submitted' | 'completed' | 'overdue' | 'resubmit';

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  submittedAt?: string;
  feedback?: string;
  rating?: number;
}

// Mock data
const mockTasks: Task[] = [
  { id: 1, title: "Business Idea Submission", description: "Submit your initial business concept", status: "pending", deadline: "2023-07-10" },
  { id: 2, title: "Sales Projection", description: "Create your sales forecast for the month", status: "submitted", deadline: "2023-07-05", submittedAt: "2023-07-04" },
  { id: 3, title: "Marketing Strategy", description: "Document your marketing approach", status: "completed", deadline: "2023-06-25", feedback: "Great job thinking through customer acquisition!", rating: 4.5 },
  { id: 4, title: "Expense Report", description: "Submit your business expenses", status: "overdue", deadline: "2023-06-15" },
  { id: 5, title: "Prototype Design", description: "Submit images of your product prototype", status: "resubmit", deadline: "2023-06-20", feedback: "Please provide clearer images and include dimensions" },
  { id: 6, title: "Customer Testimonials", description: "Collect and submit at least 3 customer testimonials", status: "pending", deadline: "2023-07-15" },
  { id: 7, title: "Social Media Plan", description: "Create a 30-day social media content plan", status: "pending", deadline: "2023-07-20" },
  { id: 8, title: "Financial Analysis", description: "Complete the profit and loss analysis worksheet", status: "completed", deadline: "2023-06-10", feedback: "Excellent analysis of your cost structure!", rating: 5 }
];

const StudentTasks = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredTasks = () => {
    switch (activeTab) {
      case "pending":
        return mockTasks.filter(task => ["pending", "overdue"].includes(task.status));
      case "submitted":
        return mockTasks.filter(task => task.status === "submitted");
      case "completed":
        return mockTasks.filter(task => task.status === "completed");
      case "resubmit":
        return mockTasks.filter(task => task.status === "resubmit");
      default:
        return mockTasks;
    }
  };
  
  // Calculate statistics
  const completedCount = mockTasks.filter(task => task.status === "completed").length;
  const pendingCount = mockTasks.filter(task => task.status === "pending").length;
  const overdueCount = mockTasks.filter(task => task.status === "overdue").length;
  const submittedCount = mockTasks.filter(task => task.status === "submitted").length;
  const resubmitCount = mockTasks.filter(task => task.status === "resubmit").length;
  const totalCount = mockTasks.length;
  const completionRate = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <div className="text-sm text-muted-foreground">
          Task Completion: <span className="font-medium text-primary">{completionRate}%</span>
        </div>
      </div>
      
      {/* Task Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{totalCount}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Submitted</p>
            <p className="text-2xl font-bold">{submittedCount}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold">{completedCount}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-destructive">{overdueCount}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            View and manage your assigned tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="resubmit">Resubmit</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4">
              {filteredTasks().map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              {filteredTasks().length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks found in this category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTasks;
