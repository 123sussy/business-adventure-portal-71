
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calendar, Clock, Users, Link as LinkIcon, Video, Edit, Trash2, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Define session type to avoid type errors
interface Session {
  id: number;
  batchName: string;
  title: string;
  status: 'upcoming' | 'completed' | 'rescheduled';
  date: string;
  time: string;
  students: number;
  attendance: number;
  recordingUrl?: string;
  sessionUrl?: string;
  originalDate?: string;
  reason?: string;
}

// Mock data for sessions
const batchStudents = [
  { id: 1, name: "Alex Johnson", present: true },
  { id: 2, name: "Taylor Swift", present: true },
  { id: 3, name: "John Smith", present: false },
  { id: 4, name: "Emma Martinez", present: true },
  { id: 5, name: "David Wong", present: false },
];

const sessionData: Session[] = [
  { 
    id: 1, 
    batchName: "Business Bootcamp - Batch 1", 
    title: "Introduction to Business Models",
    status: "completed", 
    date: "2023-06-10",
    time: "15:00 - 17:00",
    students: 15,
    attendance: 12,
    recordingUrl: "https://example.com/recording1",
  },
  { 
    id: 2, 
    batchName: "Business Bootcamp - Batch 1", 
    title: "Market Research Strategies",
    status: "completed", 
    date: "2023-06-13",
    time: "15:00 - 17:00",
    students: 15,
    attendance: 14,
    recordingUrl: "https://example.com/recording2",
  },
  { 
    id: 3, 
    batchName: "Business Bootcamp - Batch 2", 
    title: "Introduction to Business Models",
    status: "completed", 
    date: "2023-06-12",
    time: "14:00 - 16:00",
    students: 18,
    attendance: 15,
    recordingUrl: "https://example.com/recording3",
  },
  { 
    id: 4, 
    batchName: "Business Bootcamp - Batch 1", 
    title: "Financial Planning",
    status: "upcoming", 
    date: "2023-06-17",
    time: "15:00 - 17:00",
    students: 15,
    attendance: 0,
    sessionUrl: "https://meet.google.com/abc-defg-hij",
  },
  { 
    id: 5, 
    batchName: "Business Bootcamp - Batch 2", 
    title: "Market Research Strategies",
    status: "upcoming", 
    date: "2023-06-16",
    time: "14:00 - 16:00",
    students: 18,
    attendance: 0,
    sessionUrl: "https://meet.google.com/klm-nopq-rst",
  },
  { 
    id: 6, 
    batchName: "Entrepreneurship 101", 
    title: "Introduction to Entrepreneurship",
    status: "rescheduled", 
    date: "2023-07-01",
    time: "13:00 - 15:00",
    originalDate: "2023-06-15",
    students: 12,
    attendance: 0,
    reason: "Teacher unavailable due to emergency",
  },
];

interface SessionFormData {
  batchId: string;
  title: string;
  date: string;
  time: string;
  sessionUrl?: string;
  recordingUrl?: string;
}

const MentorSessions = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState<Session[]>(sessionData);
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit' | 'attendance'>('add');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [attendance, setAttendance] = useState<{ id: number; name: string; present: boolean }[]>(batchStudents);

  // Handle attendance change
  const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
    setAttendance(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, present: isPresent } 
          : student
      )
    );
  };

  // Handle attendance save
  const handleAttendanceSave = () => {
    const presentCount = attendance.filter(s => s.present).length;
    
    setSessions(prev => 
      prev.map(session => 
        session.id === selectedSessionId
          ? { ...session, attendance: presentCount }
          : session
      )
    );
    
    toast({
      title: "Attendance recorded",
      description: `Recorded attendance for ${presentCount} students.`,
    });
    
    setShowSessionDialog(false);
  };

  // Form for adding/editing sessions
  const form = useForm<SessionFormData>({
    defaultValues: {
      batchId: "",
      title: "",
      date: "",
      time: "",
      sessionUrl: "",
      recordingUrl: "",
    }
  });

  const handleAddSession = (data: SessionFormData) => {
    if (dialogMode === 'add') {
      // Add new session
      const newSession: Session = {
        id: Math.max(...sessions.map(s => s.id)) + 1,
        batchName: data.batchId === "1" ? "Business Bootcamp - Batch 1" : 
                  data.batchId === "2" ? "Business Bootcamp - Batch 2" : "Entrepreneurship 101",
        title: data.title,
        status: "upcoming",
        date: data.date,
        time: data.time,
        students: data.batchId === "1" ? 15 : data.batchId === "2" ? 18 : 12,
        attendance: 0,
        sessionUrl: data.sessionUrl
      };
      
      setSessions([...sessions, newSession]);
      toast({
        title: "Session added",
        description: `New session "${data.title}" has been added.`,
      });
    } else if (dialogMode === 'edit') {
      // Edit existing session
      setSessions(prev => 
        prev.map(session => 
          session.id === selectedSessionId
            ? { 
                ...session, 
                title: data.title,
                date: data.date,
                time: data.time,
                sessionUrl: data.sessionUrl,
                recordingUrl: data.recordingUrl
              }
            : session
        )
      );
      
      toast({
        title: "Session updated",
        description: `Session "${data.title}" has been updated.`,
      });
    }
    
    setShowSessionDialog(false);
    form.reset();
  };

  const handleEditSession = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;
    
    form.reset({
      batchId: session.batchName === "Business Bootcamp - Batch 1" ? "1" : 
               session.batchName === "Business Bootcamp - Batch 2" ? "2" : "3",
      title: session.title,
      date: session.date,
      time: session.time,
      sessionUrl: session.sessionUrl,
      recordingUrl: session.recordingUrl
    });
    
    setSelectedSessionId(sessionId);
    setDialogMode('edit');
    setShowSessionDialog(true);
  };

  const handleDeleteSession = (sessionId: number) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    
    toast({
      title: "Session deleted",
      description: "The session has been successfully deleted.",
      variant: "destructive"
    });
  };

  const handleOpenAttendance = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    setDialogMode('attendance');
    setShowSessionDialog(true);
  };

  const filteredSessions = sessions
    .filter(session => 
      session.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(session => 
      activeTab === 'all' || session.status === activeTab
    )
    .sort((a, b) => {
      // Sort by date (newest first for completed, oldest first for upcoming)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (a.status === 'completed' && b.status === 'completed') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Sessions</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sessions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={() => {
            form.reset();
            setDialogMode('add');
            setShowSessionDialog(true);
          }}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Session
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="rescheduled">Rescheduled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Details</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.length > 0 ? (
                    filteredSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{session.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant={
                                  session.status === 'upcoming' 
                                    ? 'default' 
                                    : session.status === 'completed' 
                                      ? 'outline' 
                                      : 'secondary'
                                }
                              >
                                {session.status}
                              </Badge>
                              
                              {session.status === 'rescheduled' && (
                                <span className="text-xs text-muted-foreground">
                                  from {session.originalDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="text-sm flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {new Date(session.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm flex items-center mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {session.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {session.batchName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            {session.attendance}/{session.students}
                            {session.status === 'completed' && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="ml-2 h-6"
                                onClick={() => handleOpenAttendance(session.id)}
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-2">
                            {session.status === 'upcoming' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  if (session.sessionUrl) {
                                    window.open(session.sessionUrl, '_blank');
                                  }
                                }}
                                disabled={!session.sessionUrl}
                              >
                                <LinkIcon className="h-4 w-4 mr-1" />
                                Join
                              </Button>
                            )}
                            
                            {session.status === 'completed' && session.recordingUrl && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  window.open(session.recordingUrl, '_blank');
                                }}
                              >
                                <Video className="h-4 w-4 mr-1" />
                                Recording
                              </Button>
                            )}
                            
                            {session.status === 'upcoming' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleOpenAttendance(session.id)}
                              >
                                Take Attendance
                              </Button>
                            )}
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditSession(session.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteSession(session.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No sessions found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Session Dialog - Add, Edit, or Attendance */}
      <Dialog open={showSessionDialog} onOpenChange={setShowSessionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'add' ? 'Add New Session' : 
               dialogMode === 'edit' ? 'Edit Session' : 
               'Record Attendance'}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === 'add' ? 'Create a new session by filling out the details below.' : 
               dialogMode === 'edit' ? 'Update the session details.' : 
               'Mark which students were present in this session.'}
            </DialogDescription>
          </DialogHeader>
          
          {(dialogMode === 'add' || dialogMode === 'edit') && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddSession)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="batchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a batch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Business Bootcamp - Batch 1</SelectItem>
                          <SelectItem value="2">Business Bootcamp - Batch 2</SelectItem>
                          <SelectItem value="3">Entrepreneurship 101</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter session title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 3:00 PM - 5:00 PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {dialogMode === 'add' ? (
                  <FormField
                    control={form.control}
                    name="sessionUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter meeting URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Add the URL that students will use to join the session.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="recordingUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recording Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter recording URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Add the URL where students can view the session recording.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <DialogFooter>
                  <Button type="submit">
                    {dialogMode === 'add' ? 'Create Session' : 'Update Session'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
          
          {dialogMode === 'attendance' && (
            <div className="space-y-4">
              <div className="border rounded-md divide-y">
                {attendance.map((student) => (
                  <div key={student.id} className="flex items-center py-2 px-3">
                    <Checkbox 
                      id={`student-${student.id}`}
                      checked={student.present}
                      onCheckedChange={(checked) => 
                        handleAttendanceChange(student.id, checked as boolean)
                      }
                      className="mr-3"
                    />
                    <Label 
                      htmlFor={`student-${student.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      {student.name}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSessionDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAttendanceSave}>
                  Save Attendance
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorSessions;
