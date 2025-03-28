
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import UserAvatar from '@/components/ui-custom/UserAvatar';
import { 
  Calendar, 
  Clock, 
  LinkIcon, 
  Edit, 
  Plus, 
  ExternalLink, 
  Check, 
  X, 
  Upload 
} from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

// Mock data for a specific batch
const batchData = {
  id: 1,
  name: "Business Bootcamp - Batch 1",
  status: "ongoing",
  startDate: "2023-05-01",
  endDate: "2023-07-30",
  students: [
    { 
      id: 1, 
      name: "Alex Johnson", 
      email: "alex@example.com", 
      phone: "+1 234-567-8901", 
      attendance: 90, 
      tasksCompleted: 8,
      totalTasks: 10,
      earnings: 345
    },
    { 
      id: 2, 
      name: "Samantha Lee", 
      email: "samantha@example.com", 
      phone: "+1 234-567-8902", 
      attendance: 85, 
      tasksCompleted: 7,
      totalTasks: 10,
      earnings: 290
    },
    { 
      id: 3, 
      name: "Miguel Santos", 
      email: "miguel@example.com", 
      phone: "+1 234-567-8903", 
      attendance: 95, 
      tasksCompleted: 9,
      totalTasks: 10,
      earnings: 210
    }
  ],
  sessions: [
    {
      id: 1,
      date: "2023-05-01T14:00:00",
      topic: "Introduction to Business Planning",
      status: "completed",
      link: "https://zoom.us/j/123456789",
      recording: "https://zoom.us/rec/123456789",
      attendance: [
        { studentId: 1, attended: true },
        { studentId: 2, attended: true },
        { studentId: 3, attended: true }
      ]
    },
    {
      id: 2,
      date: "2023-05-08T14:00:00",
      topic: "Market Research Fundamentals",
      status: "completed",
      link: "https://zoom.us/j/123456789",
      recording: "https://zoom.us/rec/123456790",
      attendance: [
        { studentId: 1, attended: true },
        { studentId: 2, attended: true },
        { studentId: 3, attended: false }
      ]
    },
    {
      id: 3,
      date: "2023-06-15T14:00:00",
      topic: "Financial Planning",
      status: "upcoming",
      link: "",
      recording: null,
      attendance: []
    }
  ],
  tasks: [
    {
      id: 1,
      title: "Business Plan Draft",
      description: "Create a first draft of your business plan",
      deadline: "2023-05-15",
      status: "completed",
      submissions: [
        { studentId: 1, status: "completed", submittedAt: "2023-05-14", feedback: "Great work!", rating: 4 },
        { studentId: 2, status: "completed", submittedAt: "2023-05-13", feedback: "Well organized", rating: 5 },
        { studentId: 3, status: "completed", submittedAt: "2023-05-15", feedback: "Good effort", rating: 3 }
      ]
    },
    {
      id: 2,
      title: "Market Analysis",
      description: "Analyze your target market and competitors",
      deadline: "2023-05-30",
      status: "completed",
      submissions: [
        { studentId: 1, status: "completed", submittedAt: "2023-05-28", feedback: "Thorough analysis", rating: 5 },
        { studentId: 2, status: "resubmit", submittedAt: "2023-05-29", feedback: "Needs more depth", rating: 2 },
        { studentId: 3, status: "completed", submittedAt: "2023-05-30", feedback: "Good insights", rating: 4 }
      ]
    },
    {
      id: 3,
      title: "Financial Projections",
      description: "Create financial projections for your business",
      deadline: "2023-06-20",
      status: "pending",
      submissions: []
    }
  ]
};

const MentorBatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [showAddSessionLinkDialog, setShowAddSessionLinkDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showUploadRecordingDialog, setShowUploadRecordingDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);

  const addTaskForm = useForm({
    defaultValues: {
      title: '',
      description: '',
      deadline: ''
    }
  });

  const sessionLinkForm = useForm({
    defaultValues: {
      sessionLink: ''
    }
  });

  const rescheduleForm = useForm({
    defaultValues: {
      newDate: '',
      newTime: '',
      reason: ''
    }
  });

  const recordingForm = useForm({
    defaultValues: {
      recordingLink: ''
    }
  });

  const handleAddTask = (data: any) => {
    console.log('Adding new task:', data);
    setShowAddTaskDialog(false);
    addTaskForm.reset();
  };

  const handleAddSessionLink = (data: any) => {
    console.log('Adding session link for session', selectedSession, ':', data);
    setShowAddSessionLinkDialog(false);
    sessionLinkForm.reset();
  };

  const handleRescheduleSession = (data: any) => {
    console.log('Rescheduling session', selectedSession, ':', data);
    setShowRescheduleDialog(false);
    rescheduleForm.reset();
  };

  const handleUploadRecording = (data: any) => {
    console.log('Uploading recording for session', selectedSession, ':', data);
    setShowUploadRecordingDialog(false);
    recordingForm.reset();
  };

  const formattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formattedTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{batchData.name}</h1>
          <p className="text-muted-foreground">
            {batchData.startDate} to {batchData.endDate} • 
            <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              batchData.status === 'ongoing' 
                ? 'bg-green-100 text-green-800' 
                : batchData.status === 'upcoming' 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
            }`}>
              {batchData.status}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/mentor/batches')}>
            Back to Batches
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                {batchData.students.length} students enrolled in this batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Earnings</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchData.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <UserAvatar name={student.name} size="sm" />
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{student.email}</div>
                          <div className="text-muted-foreground">{student.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                            <div 
                              className={`h-full ${student.attendance >= 90 ? 'bg-success' : student.attendance >= 75 ? 'bg-warning' : 'bg-destructive'}`}
                              style={{ width: `${student.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.attendance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${(student.tasksCompleted / student.totalTasks) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm">{student.tasksCompleted}/{student.totalTasks}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">${student.earnings}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/mentor/students/${student.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Next Session</CardTitle>
              </CardHeader>
              <CardContent>
                {batchData.sessions.find(s => s.status === 'upcoming') ? (
                  <div className="space-y-4">
                    {batchData.sessions
                      .filter(s => s.status === 'upcoming')
                      .slice(0, 1)
                      .map(session => (
                        <div key={session.id} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                            <span>{formattedDate(session.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <span>{formattedTime(session.date)}</span>
                          </div>
                          <div className="font-medium">{session.topic}</div>
                          
                          <div className="flex gap-2 mt-4">
                            {session.link ? (
                              <Button asChild>
                                <a href={session.link} target="_blank" rel="noopener noreferrer">
                                  <LinkIcon className="mr-2 h-4 w-4" />
                                  Join Session
                                </a>
                              </Button>
                            ) : (
                              <Button 
                                onClick={() => {
                                  setSelectedSession(session.id);
                                  setShowAddSessionLinkDialog(true);
                                }}
                              >
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Add Session Link
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setSelectedSession(session.id);
                                setShowRescheduleDialog(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No upcoming sessions scheduled.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batchData.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground">Due: {task.deadline}</div>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        task.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : task.status === 'pending' 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" onClick={() => setActiveTab('tasks')}>
                    View All Tasks
                  </Button>
                  <Button onClick={() => setShowAddTaskDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Sessions</h2>
          </div>

          {batchData.sessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">
                      {session.topic}
                    </CardTitle>
                    <CardDescription>
                      {formattedDate(session.date)} at {formattedTime(session.date)}
                    </CardDescription>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    session.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : session.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800'
                        : session.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                  }`}>
                    {session.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                {session.status === 'upcoming' && (
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    {session.link ? (
                      <Button asChild>
                        <a href={session.link} target="_blank" rel="noopener noreferrer">
                          <LinkIcon className="mr-2 h-4 w-4" />
                          Join Session
                        </a>
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => {
                          setSelectedSession(session.id);
                          setShowAddSessionLinkDialog(true);
                        }}
                      >
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Add Session Link
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedSession(session.id);
                        setShowRescheduleDialog(true);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Reschedule
                    </Button>
                  </div>
                )}
                
                {session.status === 'completed' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {session.recording ? (
                        <Button asChild variant="outline">
                          <a href={session.recording} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Recording
                          </a>
                        </Button>
                      ) : (
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setSelectedSession(session.id);
                            setShowUploadRecordingDialog(true);
                          }}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Recording
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Attendance</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {session.attendance.map((record) => {
                          const student = batchData.students.find(s => s.id === record.studentId);
                          return student ? (
                            <div 
                              key={student.id} 
                              className="flex items-center gap-2 p-2 rounded-md border"
                            >
                              <UserAvatar name={student.name} size="sm" />
                              <span className="text-sm">{student.name}</span>
                              {record.attended ? (
                                <Check className="h-4 w-4 text-success ml-auto" />
                              ) : (
                                <X className="h-4 w-4 text-destructive ml-auto" />
                              )}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <Button onClick={() => setShowAddTaskDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>

          {batchData.tasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">
                      {task.title}
                    </CardTitle>
                    <CardDescription>
                      Due: {task.deadline}
                    </CardDescription>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : task.status === 'pending' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-sm mb-4">
                  {task.description}
                </div>

                {task.submissions.length > 0 ? (
                  <div>
                    <h3 className="font-medium mb-2">Submissions</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {task.submissions.map((submission) => {
                          const student = batchData.students.find(s => s.id === submission.studentId);
                          return student ? (
                            <TableRow key={`${task.id}-${student.id}`}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <UserAvatar name={student.name} size="sm" />
                                  <span className="font-medium">{student.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{submission.submittedAt}</TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  submission.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : submission.status === 'pending' 
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {submission.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                {submission.rating ? (
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span 
                                        key={i} 
                                        className={`text-sm ${i < submission.rating! ? 'text-yellow-500' : 'text-gray-300'}`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                ) : '-'}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => console.log('View submission', submission)}
                                >
                                  Review
                                </Button>
                              </TableCell>
                            </TableRow>
                          ) : null;
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    No submissions yet.
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Add Task Dialog */}
      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for all students in this batch.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...addTaskForm}>
            <form onSubmit={addTaskForm.handleSubmit(handleAddTask)} className="space-y-4">
              <FormField
                control={addTaskForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={addTaskForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter task description" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={addTaskForm.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddTaskDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add Session Link Dialog */}
      <Dialog open={showAddSessionLinkDialog} onOpenChange={setShowAddSessionLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Session Link</DialogTitle>
            <DialogDescription>
              Add a meeting link for the upcoming session.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...sessionLinkForm}>
            <form onSubmit={sessionLinkForm.handleSubmit(handleAddSessionLink)} className="space-y-4">
              <FormField
                control={sessionLinkForm.control}
                name="sessionLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://zoom.us/j/123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a Zoom, Google Meet, or other video conferencing link.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddSessionLinkDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Link</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Reschedule Session Dialog */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Session</DialogTitle>
            <DialogDescription>
              Set a new date and time for this session.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...rescheduleForm}>
            <form onSubmit={rescheduleForm.handleSubmit(handleRescheduleSession)} className="space-y-4">
              <FormField
                control={rescheduleForm.control}
                name="newDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={rescheduleForm.control}
                name="newTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={rescheduleForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Rescheduling</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Why is this session being rescheduled?" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowRescheduleDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Reschedule</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Upload Recording Dialog */}
      <Dialog open={showUploadRecordingDialog} onOpenChange={setShowUploadRecordingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Recording</DialogTitle>
            <DialogDescription>
              Add a recording link for the completed session.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...recordingForm}>
            <form onSubmit={recordingForm.handleSubmit(handleUploadRecording)} className="space-y-4">
              <FormField
                control={recordingForm.control}
                name="recordingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recording Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://zoom.us/rec/123456789" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a link to the recorded session.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowUploadRecordingDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Recording</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorBatchDetails;
