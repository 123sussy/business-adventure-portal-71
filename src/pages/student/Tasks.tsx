
import React, { useState } from 'react';
import TaskCardUpdated from '@/components/student/TaskCardUpdated';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

// Mock data for student tasks
const studentTasks = [
  {
    id: 1, 
    title: 'Create a Business Plan', 
    description: 'Draft a comprehensive business plan for your product idea.', 
    status: 'completed' as const, 
    deadline: '2023-09-30',
    submittedAt: '2023-09-28',
    feedback: 'Excellent work! Your business plan is well-structured and shows great potential.', 
    rating: 5
  },
  {
    id: 2, 
    title: 'Design Product Packaging', 
    description: 'Create eco-friendly packaging designs for your product.', 
    status: 'resubmit' as const, 
    deadline: '2023-10-10',
    submittedAt: '2023-10-08',
    feedback: 'Good start, but please consider making the design more sustainable. Review materials section.' 
  },
  {
    id: 3, 
    title: 'Marketing Strategy', 
    description: 'Develop a marketing strategy to promote your product.', 
    status: 'submitted' as const, 
    deadline: '2023-10-15',
    submittedAt: '2023-10-14'
  },
  {
    id: 4, 
    title: 'Financial Projection', 
    description: 'Create a financial projection for your business for the next 6 months.', 
    status: 'pending' as const, 
    deadline: '2023-10-25'
  },
  {
    id: 5, 
    title: 'Sales Pitch', 
    description: 'Prepare a 5-minute sales pitch for your product.', 
    status: 'pending' as const, 
    deadline: '2023-11-05'
  },
  {
    id: 6, 
    title: 'Customer Feedback Analysis', 
    description: 'Collect and analyze feedback from at least 10 potential customers.', 
    status: 'overdue' as const, 
    deadline: '2023-10-05'
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(studentTasks);
  
  const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'overdue');
  const submittedTasks = tasks.filter(task => task.status === 'submitted');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const resubmitTasks = tasks.filter(task => task.status === 'resubmit');
  
  const allTasks = [...pendingTasks, ...resubmitTasks, ...submittedTasks, ...completedTasks];
  
  const getStatusCounts = () => {
    return {
      pending: pendingTasks.length,
      submitted: submittedTasks.length,
      completed: completedTasks.length,
      resubmit: resubmitTasks.length,
      overdue: tasks.filter(task => task.status === 'overdue').length
    };
  };
  
  const statusCounts = getStatusCounts();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex gap-2">
          {statusCounts.pending > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock size={12} /> {statusCounts.pending} pending
            </Badge>
          )}
          {statusCounts.overdue > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle size={12} /> {statusCounts.overdue} overdue
            </Badge>
          )}
          {statusCounts.resubmit > 0 && (
            <Badge variant="warning" className="flex items-center gap-1">
              <ArrowRight size={12} /> {statusCounts.resubmit} to resubmit
            </Badge>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Task Management</CardTitle>
          <CardDescription>View and manage your assigned tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="all">All ({allTasks.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
              <TabsTrigger value="submitted">Submitted ({statusCounts.submitted})</TabsTrigger>
              <TabsTrigger value="resubmit">To Resubmit ({statusCounts.resubmit})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({statusCounts.completed})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {allTasks.length > 0 ? (
                allTasks.map(task => (
                  <TaskCardUpdated key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No tasks found.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map(task => (
                  <TaskCardUpdated key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No pending tasks.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="submitted" className="space-y-4">
              {submittedTasks.length > 0 ? (
                submittedTasks.map(task => (
                  <TaskCardUpdated key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No submitted tasks.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resubmit" className="space-y-4">
              {resubmitTasks.length > 0 ? (
                resubmitTasks.map(task => (
                  <TaskCardUpdated key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No tasks to resubmit.
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {completedTasks.length > 0 ? (
                completedTasks.map(task => (
                  <TaskCardUpdated key={task.id} task={task} />
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No completed tasks.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
