
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Clock, 
  School,
  Edit,
  Plus,
  DollarSign,
  Trash2,
  BarChart4,
  BookOpen,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import UserAvatar from '@/components/ui-custom/UserAvatar';

// Mock batch data
const batchData = {
  id: 1,
  name: "Business Bootcamp - Batch 1",
  status: "ongoing",
  startDate: "2023-05-01",
  endDate: "2023-07-30",
  teacher: "Jamie Smith",
  students: 15,
  daysPerWeek: ["Monday", "Wednesday", "Friday"],
  time: "3:00 PM - 5:00 PM",
  earnings: 1200,
  teacherEarnings: 240, // 20% of earnings
  ollShare: 360, // 30% of earnings
  completionRate: 68,
  nextSession: "2023-06-16T15:00:00",
  sessionsCompleted: 12,
  totalSessions: 24,
  tasks: [
    {
      id: 1,
      title: "Market Research Assignment",
      dueDate: "2023-06-20",
      status: "active",
      completions: 10
    },
    {
      id: 2,
      title: "Business Model Canvas",
      dueDate: "2023-06-15",
      status: "completed",
      completions: 15
    },
    {
      id: 3,
      title: "Pitch Deck Creation",
      dueDate: "2023-06-30",
      status: "upcoming",
      completions: 0
    }
  ],
  studentsList: [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      attendance: 90,
      taskCompletion: 85,
      earnings: 150
    },
    {
      id: 2,
      name: "Morgan Smith",
      email: "morgan@example.com",
      attendance: 85,
      taskCompletion: 90,
      earnings: 200
    },
    {
      id: 3,
      name: "Jamie Lee",
      email: "jamie@example.com",
      attendance: 95,
      taskCompletion: 95,
      earnings: 250
    }
  ],
  sessions: [
    {
      id: 1,
      title: "Introduction to Business Fundamentals",
      date: "2023-05-01",
      time: "3:00 PM - 5:00 PM",
      status: "completed"
    },
    {
      id: 2,
      title: "Market Research Strategies",
      date: "2023-05-03",
      time: "3:00 PM - 5:00 PM",
      status: "completed"
    },
    {
      id: 3,
      title: "Business Model Canvas",
      date: "2023-05-05",
      time: "3:00 PM - 5:00 PM",
      status: "upcoming"
    }
  ]
};

const AdminBatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showAddSessionDialog, setShowAddSessionDialog] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    description: ''
  });
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });
  const [newStudent, setNewStudent] = useState({
    email: ''
  });

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewSessionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSession(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewStudentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent({ email: e.target.value });
  };

  const handleAddTask = () => {
    console.log("Adding new task:", newTask);
    // In a real app, you'd make an API call here
    toast({
      title: "Task added",
      description: "New task has been added to the batch"
    });
    setShowAddTaskDialog(false);
    setNewTask({ title: '', dueDate: '', description: '' });
  };

  const handleAddSession = () => {
    console.log("Adding new session:", newSession);
    toast({
      title: "Session added",
      description: "New session has been added to the batch"
    });
    setShowAddSessionDialog(false);
    setNewSession({ title: '', date: '', time: '', description: '' });
  };

  const handleAddStudent = () => {
    console.log("Adding new student:", newStudent);
    toast({
      title: "Student invited",
      description: "Invitation has been sent to the student"
    });
    setShowAddStudentDialog(false);
    setNewStudent({ email: '' });
  };

  const handleDeleteTask = (taskId: number) => {
    console.log("Deleting task:", taskId);
    toast({
      title: "Task deleted",
      description: "The task has been deleted from the batch"
    });
  };

  const handleDeleteSession = (sessionId: number) => {
    console.log("Deleting session:", sessionId);
    toast({
      title: "Session deleted",
      description: "The session has been deleted from the batch"
    });
  };

  const handleRemoveStudent = (studentId: number) => {
    console.log("Removing student:", studentId);
    toast({
      title: "Student removed",
      description: "The student has been removed from the batch"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/admin/batches')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-2xl font-bold">{batchData.name}</h1>
          <Badge
            variant={
              batchData.status === 'ongoing' 
                ? 'default' 
                : batchData.status === 'upcoming' 
                  ? 'outline' 
                  : 'secondary'
            }
          >
            {batchData.status}
          </Badge>
        </div>
        <Button onClick={() => navigate(`/admin/batches/${batchId}/edit`)}>
          <Edit className="h-4 w-4 mr-2" /> Edit Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Teacher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <School className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{batchData.teacher}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{batchData.daysPerWeek.join(', ')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{batchData.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{batchData.students}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="text-xl font-bold">{batchData.sessionsCompleted}/{batchData.totalSessions}</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ width: `${(batchData.sessionsCompleted / batchData.totalSessions) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">Sessions completed</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>Total Revenue</span>
              </div>
              <span className="font-bold">${batchData.earnings}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-500" />
                <span>Teacher (20%)</span>
              </div>
              <span className="font-bold">${batchData.teacherEarnings}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span>OLL Share (30%)</span>
              </div>
              <span className="font-bold">${batchData.ollShare}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-amber-500" />
                <span>Student (50%)</span>
              </div>
              <span className="font-bold">${batchData.earnings - batchData.teacherEarnings - batchData.ollShare}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Batch Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{batchData.startDate}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{batchData.endDate}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Task Completion</p>
                <p className="font-medium">{batchData.completionRate}%</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Next Session</p>
                <p className="font-medium">
                  {batchData.nextSession 
                    ? new Date(batchData.nextSession).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> Tasks
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Sessions
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-1">
            <Users className="h-4 w-4" /> Students
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Tasks & Assignments</CardTitle>
              <Button size="sm" onClick={() => setShowAddTaskDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchData.tasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            task.status === 'active' 
                              ? 'default' 
                              : task.status === 'upcoming' 
                                ? 'outline' 
                                : 'secondary'
                          }
                          className={task.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {task.completions}/{batchData.students}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Sessions Schedule</CardTitle>
              <Button size="sm" onClick={() => setShowAddSessionDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Session
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchData.sessions.map(session => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.title}</TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={session.status === 'completed' ? 'secondary' : 'outline'}
                          className={session.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Enrolled Students</CardTitle>
              <Button size="sm" onClick={() => setShowAddStudentDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Task Completion</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchData.studentsList.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <UserAvatar name={student.name} size="sm" />
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-24">
                            <div className="h-2 w-full bg-muted rounded-full">
                              <div 
                                className={`h-full rounded-full ${
                                  student.attendance >= 90 ? 'bg-green-500' : 
                                  student.attendance >= 75 ? 'bg-amber-500' : 
                                  'bg-destructive'
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs">{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full max-w-24">
                            <div className="h-2 w-full bg-muted rounded-full">
                              <div 
                                className={`h-full rounded-full ${
                                  student.taskCompletion >= 90 ? 'bg-green-500' : 
                                  student.taskCompletion >= 75 ? 'bg-amber-500' : 
                                  'bg-destructive'
                                }`}
                                style={{ width: `${student.taskCompletion}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs">{student.taskCompletion}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                          ${student.earnings}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/admin/students/${student.id}`)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => handleRemoveStudent(student.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Task Dialog */}
      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task or assignment for this batch.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Task Title
              </label>
              <Input
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleNewTaskChange}
                placeholder="Enter task title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={newTask.dueDate}
                onChange={handleNewTaskChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleNewTaskChange}
                placeholder="Enter task description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Session Dialog */}
      <Dialog open={showAddSessionDialog} onOpenChange={setShowAddSessionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
            <DialogDescription>
              Schedule a new session for this batch.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="sessionTitle" className="text-sm font-medium">
                Session Title
              </label>
              <Input
                id="sessionTitle"
                name="title"
                value={newSession.title}
                onChange={handleNewSessionChange}
                placeholder="Enter session title"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="sessionDate" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="sessionDate"
                  name="date"
                  type="date"
                  value={newSession.date}
                  onChange={handleNewSessionChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="sessionTime" className="text-sm font-medium">
                  Time
                </label>
                <Input
                  id="sessionTime"
                  name="time"
                  type="time"
                  value={newSession.time}
                  onChange={handleNewSessionChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="sessionDescription" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="sessionDescription"
                name="description"
                value={newSession.description}
                onChange={handleNewSessionChange}
                placeholder="Enter session description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSessionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSession}>
              Add Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Student to Batch</DialogTitle>
            <DialogDescription>
              Add an existing student to this batch or invite a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="studentEmail" className="text-sm font-medium">
                Student Email
              </label>
              <Input
                id="studentEmail"
                name="email"
                type="email"
                value={newStudent.email}
                onChange={handleNewStudentChange}
                placeholder="Enter student email"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStudent}>
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBatchDetails;
