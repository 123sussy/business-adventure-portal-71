
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Book, 
  Calendar, 
  Clock, 
  DollarSign, 
  School, 
  Edit
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data for batches (would normally fetch this from API)
const batchesData = [
  { 
    id: 1, 
    name: "Business Bootcamp - Batch 1", 
    status: "ongoing", 
    startDate: "2023-05-01",
    endDate: "2023-07-30", 
    students: 15,
    teacher: "Jamie Smith",
    teacherEmail: "jamie.smith@example.com",
    teacherPhone: "+1 (555) 123-4567",
    earnings: 1200,
    teacherEarnings: 240, // 20% of earnings
    ollShare: 360, // 30% of earnings
    studentShare: 600, // 50% of earnings
    nextSession: "2023-06-16T15:00:00",
    daysPerWeek: ["Monday", "Wednesday", "Friday"],
    time: "3:00 PM - 5:00 PM",
    topics: [
      "Introduction to Business",
      "Marketing Fundamentals",
      "Financial Planning",
      "Business Strategy",
      "Pitch Development",
      "Customer Acquisition",
      "Sales Techniques",
      "Team Building"
    ],
    sessions: [
      {
        id: 1,
        date: "2023-05-01",
        time: "3:00 PM - 5:00 PM",
        topic: "Introduction to Business",
        attendance: 15,
        completed: true
      },
      {
        id: 2,
        date: "2023-05-03",
        time: "3:00 PM - 5:00 PM",
        topic: "Marketing Fundamentals",
        attendance: 14,
        completed: true
      },
      {
        id: 3,
        date: "2023-05-05",
        time: "3:00 PM - 5:00 PM",
        topic: "Financial Planning",
        attendance: 15,
        completed: true
      },
      {
        id: 4,
        date: "2023-05-08",
        time: "3:00 PM - 5:00 PM",
        topic: "Business Strategy",
        attendance: 13,
        completed: true
      },
      {
        id: 5,
        date: "2023-05-10",
        time: "3:00 PM - 5:00 PM",
        topic: "Pitch Development",
        attendance: 15,
        completed: false
      },
      {
        id: 6,
        date: "2023-05-12",
        time: "3:00 PM - 5:00 PM",
        topic: "Customer Acquisition",
        attendance: 0,
        completed: false
      },
      {
        id: 7,
        date: "2023-05-15",
        time: "3:00 PM - 5:00 PM",
        topic: "Sales Techniques",
        attendance: 0,
        completed: false
      },
      {
        id: 8,
        date: "2023-05-17",
        time: "3:00 PM - 5:00 PM",
        topic: "Team Building",
        attendance: 0,
        completed: false
      }
    ],
    students: [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john.doe@example.com",
        phone: "+1 (555) 987-6543",
        attendance: 90,
        progress: 85,
        school: "City High School"
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane.smith@example.com",
        phone: "+1 (555) 876-5432",
        attendance: 95,
        progress: 92,
        school: "Metro University"
      },
      { 
        id: 3, 
        name: "Ahmed Hassan", 
        email: "ahmed.hassan@example.com",
        phone: "+1 (555) 765-4321",
        attendance: 85,
        progress: 78,
        school: "Valley High School"
      },
      { 
        id: 4, 
        name: "Sarah Johnson", 
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 654-3210",
        attendance: 100,
        progress: 95,
        school: "City High School"
      },
      { 
        id: 5, 
        name: "Michael Brown", 
        email: "michael.brown@example.com",
        phone: "+1 (555) 543-2109",
        attendance: 80,
        progress: 72,
        school: "Metro University"
      }
    ]
  }
];

// Mock data for teachers
const teachersData = [
  { id: 1, name: "Jamie Smith" },
  { id: 2, name: "Alex Rodriguez" },
  { id: 3, name: "Sarah Johnson" },
  { id: 4, name: "Michael Brown" }
];

const AdminBatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditBatchDialog, setShowEditBatchDialog] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  // Find batch by ID from mock data
  const batch = batchesData.find(b => b.id === Number(batchId));

  const form = useForm({
    defaultValues: {
      batchName: batch?.name || '',
      startDate: batch?.startDate || '',
      endDate: batch?.endDate || '',
      teacher: batch?.teacher || '',
      time: batch?.time || '',
      topics: batch?.topics?.join('\n') || ''
    }
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleEditBatch = () => {
    if (batch) {
      setSelectedDays(batch.daysPerWeek);
      setShowEditBatchDialog(true);
    }
  };

  const handleUpdateBatch = (data: any) => {
    console.log("Updated batch data:", { ...data, daysPerWeek: selectedDays });
    toast({
      title: "Batch updated",
      description: "Batch has been successfully updated"
    });
    setShowEditBatchDialog(false);
  };

  if (!batch) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Batch not found</h2>
        <Button variant="outline" onClick={() => navigate('/admin/batches')}>
          Back to Batches
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{batch.name}</h1>
          <p className="text-muted-foreground">
            {batch.startDate} to {batch.endDate}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/batches')}>
            Back to Batches
          </Button>
          <Button onClick={handleEditBatch}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Batch
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Details</CardTitle>
              <CardDescription>Key information about this batch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-lg">{batch.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Number of Students</p>
                  <p className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                    {batch.students.length}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Teacher</p>
                  <p className="text-lg flex items-center">
                    <School className="h-5 w-5 mr-2 text-muted-foreground" />
                    {batch.teacher}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Teacher Contact</p>
                  <div>
                    <p className="text-sm">{batch.teacherEmail}</p>
                    <p className="text-sm">{batch.teacherPhone}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Schedule</p>
                  <div>
                    <p className="text-base flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {batch.daysPerWeek.join(', ')}
                    </p>
                    <p className="text-base flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      {batch.time}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Next Session</p>
                  <p className="text-lg">
                    {batch.nextSession ? new Date(batch.nextSession).toLocaleString() : 'No upcoming session'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Topics covered in this batch</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {batch.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Book className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Schedule</CardTitle>
              <CardDescription>All sessions for this batch</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batch.sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.topic}</TableCell>
                      <TableCell>
                        {session.completed 
                          ? `${session.attendance}/${batch.students.length}` 
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {session.completed ? (
                          <span className="text-green-600">Completed</span>
                        ) : (
                          <span className="text-blue-600">Scheduled</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Enrolled Students</CardTitle>
                  <CardDescription>List of students in this batch</CardDescription>
                </div>
                <Button variant="outline" onClick={() => navigate('/admin/students')}>
                  Manage Students
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batch.students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.school}</TableCell>
                      <TableCell>{student.attendance}%</TableCell>
                      <TableCell>{student.progress}%</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/students/${student.id}`)}
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
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue and earnings distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                    <p className="font-medium">Total Revenue</p>
                  </div>
                  <p className="text-2xl font-bold">${batch.earnings}</p>
                  <p className="text-sm text-muted-foreground">From {batch.students.length} students</p>
                </div>
                
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    <p className="font-medium">Teacher's Share (20%)</p>
                  </div>
                  <p className="text-2xl font-bold">${batch.teacherEarnings}</p>
                  <p className="text-sm text-muted-foreground">Paid to {batch.teacher}</p>
                </div>
                
                <div className="border rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
                    <p className="font-medium">OLL Share (30%)</p>
                  </div>
                  <p className="text-2xl font-bold">${batch.ollShare}</p>
                  <p className="text-sm text-muted-foreground">Platform fee</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-center mb-2">
                  <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
                  <p className="font-medium">Students' Share (50%)</p>
                </div>
                <p className="text-2xl font-bold">${batch.studentShare}</p>
                <p className="text-sm text-muted-foreground">Distributed among students based on performance</p>
              </div>
              
              <Card className="border-dashed">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Teacher payout</span>
                      <span className="text-green-600">Paid on May 31, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Student earnings distribution</span>
                      <span className="text-blue-600">Pending batch completion</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Batch Dialog */}
      <Dialog open={showEditBatchDialog} onOpenChange={setShowEditBatchDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
            <DialogDescription>
              Update batch information below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateBatch)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="batchName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter batch name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a teacher" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teachersData.map(teacher => (
                            <SelectItem key={teacher.id} value={teacher.id.toString()}>
                              {teacher.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Schedule Days</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                  {daysOfWeek.map(day => (
                    <Button
                      key={day}
                      type="button"
                      variant={selectedDays.includes(day) ? "default" : "outline"}
                      onClick={() => handleDayToggle(day)}
                      className="flex-1"
                    >
                      {day.substring(0, 3)}
                    </Button>
                  ))}
                </div>
                {selectedDays.length === 0 && (
                  <p className="text-sm text-destructive mt-1">Please select at least one day</p>
                )}
              </div>

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3:00 PM - 5:00 PM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Topics</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter topics to be covered in this batch, one per line"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter one topic per line. These will be used to create session schedules.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowEditBatchDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Batch</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBatchDetails;
