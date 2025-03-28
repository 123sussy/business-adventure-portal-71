
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DollarSign, Users, Star, Trophy, CheckCircle, Clock } from 'lucide-react';

// Interfaces
interface Student {
  id: number;
  name: string;
  avatarUrl?: string;
  sales: number;
  customers: number;
  taskCompletion: number;
  attendance: number;
  batchName: string;
}

// Mock data
const mockStudents: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    sales: 520,
    customers: 7,
    taskCompletion: 95,
    attendance: 100,
    batchName: "Summer 2023"
  },
  {
    id: 2,
    name: "Taylor Swift",
    sales: 980,
    customers: 15,
    taskCompletion: 90,
    attendance: 95,
    batchName: "Summer 2023"
  },
  {
    id: 3,
    name: "John Smith",
    sales: 350,
    customers: 5,
    taskCompletion: 85,
    attendance: 90,
    batchName: "Summer 2023"
  },
  {
    id: 4,
    name: "Samantha Lee",
    sales: 600,
    customers: 9,
    taskCompletion: 100,
    attendance: 90,
    batchName: "Spring 2023"
  },
  {
    id: 5,
    name: "David Wong",
    sales: 840,
    customers: 12,
    taskCompletion: 92,
    attendance: 85,
    batchName: "Summer 2023"
  },
  {
    id: 6,
    name: "Emma Martinez",
    sales: 420,
    customers: 6,
    taskCompletion: 80,
    attendance: 100,
    batchName: "Summer 2023"
  },
  {
    id: 7,
    name: "Michael Brown",
    sales: 720,
    customers: 10,
    taskCompletion: 88,
    attendance: 95,
    batchName: "Spring 2023"
  },
  {
    id: 8,
    name: "Sophia Chen",
    sales: 1200,
    customers: 18,
    taskCompletion: 98,
    attendance: 100,
    batchName: "Spring 2023"
  },
  {
    id: 9,
    name: "James Wilson",
    sales: 150,
    customers: 3,
    taskCompletion: 75,
    attendance: 80,
    batchName: "Summer 2023"
  },
  {
    id: 10,
    name: "Olivia Garcia",
    sales: 950,
    customers: 14,
    taskCompletion: 95,
    attendance: 90,
    batchName: "Spring 2023"
  }
];

// Function to calculate rank (based on sales, task completion, and attendance)
const calculateRank = (students: Student[]) => {
  return [...students].sort((a, b) => {
    // Calculate a score based on all metrics
    const scoreA = a.sales * 0.5 + a.customers * 15 + a.taskCompletion + a.attendance;
    const scoreB = b.sales * 0.5 + b.customers * 15 + b.taskCompletion + b.attendance;
    return scoreB - scoreA;
  });
};

const StudentLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<string>("batch");
  
  // Get current student (normally would come from auth context)
  const currentStudentId = 1; // Alex Johnson for this example
  
  // Calculate ranks
  const batchStudents = calculateRank(mockStudents.filter(s => s.batchName === "Summer 2023"));
  const allStudents = calculateRank(mockStudents);
  
  // Find current student ranks
  const batchRank = batchStudents.findIndex(s => s.id === currentStudentId) + 1;
  const nationalRank = allStudents.findIndex(s => s.id === currentStudentId) + 1;
  
  // Get displayed students based on the active tab
  const displayedStudents = activeTab === "batch" ? batchStudents : allStudents;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Batch Rank: #{batchRank}
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-accent">
            National Rank: #{nationalRank}
          </Badge>
        </div>
      </div>
      
      {/* Your Stats */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy size={18} className="text-yellow-500" />
            Your Performance
          </CardTitle>
          <CardDescription>How you're doing compared to others</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <DollarSign size={20} className="text-success mb-1" />
              <span className="text-sm text-muted-foreground">Sales</span>
              <span className="text-xl font-bold">${allStudents.find(s => s.id === currentStudentId)?.sales}</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Users size={20} className="text-primary mb-1" />
              <span className="text-sm text-muted-foreground">Customers</span>
              <span className="text-xl font-bold">{allStudents.find(s => s.id === currentStudentId)?.customers}</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <CheckCircle size={20} className="text-accent mb-1" />
              <span className="text-sm text-muted-foreground">Task Completion</span>
              <span className="text-xl font-bold">{allStudents.find(s => s.id === currentStudentId)?.taskCompletion}%</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-muted/30 rounded-lg">
              <Clock size={20} className="text-warning mb-1" />
              <span className="text-sm text-muted-foreground">Attendance</span>
              <span className="text-xl font-bold">{allStudents.find(s => s.id === currentStudentId)?.attendance}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Leaderboard Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Student Rankings</CardTitle>
          <CardDescription>See how you rank compared to other students</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="batch" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="batch">Batch Leaderboard</TabsTrigger>
              <TabsTrigger value="national">National Leaderboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedStudents.map((student, index) => (
                    <TableRow key={student.id} className={student.id === currentStudentId ? "bg-muted/50" : ""}>
                      <TableCell>
                        <div className="flex items-center justify-center font-medium">
                          {index === 0 ? (
                            <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center">
                              <Trophy size={16} className="text-yellow-500" />
                            </div>
                          ) : index === 1 ? (
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center">
                              <Trophy size={16} className="text-gray-400" />
                            </div>
                          ) : index === 2 ? (
                            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
                              <Trophy size={16} className="text-amber-600" />
                            </div>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatarUrl} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}{student.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.batchName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${student.sales}</TableCell>
                      <TableCell>{student.customers}</TableCell>
                      <TableCell>{student.taskCompletion}%</TableCell>
                      <TableCell>{student.attendance}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLeaderboard;
