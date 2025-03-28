
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
  { id: 6, title: "Customer Interview", description: "Interview 5 potential customers and document feedback", status: "pending", deadline: "2023-07-15" },
  { id: 7, title: "Financial Plan", description: "Create a 3-month financial plan", status: "completed", deadline: "2023-06-10", feedback: "Well thought out projections and good attention to detail", rating: 5 },
  { id: 8, title: "Logo Design", description: "Design a logo for your business", status: "completed", deadline: "2023-05-20", feedback: "Creative design that represents your brand well", rating: 4 },
];

const StudentTasks = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredTasks = () => {
    switch (activeTab) {
      case "pending":
        return mockTasks.filter(task => task.status === "pending");
      case "submitted":
        return mockTasks.filter(task => task.status === "submitted");
      case "completed":
        return mockTasks.filter(task => task.status === "completed");
      case "overdue":
        return mockTasks.filter(task => task.status === "overdue");
      default:
        return mockTasks;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            Track all your assigned tasks and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4">
                {filteredTasks().length > 0 ? (
                  filteredTasks().map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No tasks found in this category</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentTasks;
