
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { useForm } from "react-hook-form";
import { 
  Search, 
  Plus, 
  Filter, 
  DollarSign, 
  Briefcase, 
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  BookOpen,
  School,
  UserCheck
} from 'lucide-react';
import UserAvatar from '@/components/ui-custom/UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock students data
const studentsData = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 234-567-8901',
    batch: 'Business Bootcamp - Batch 1',
    status: 'active',
    attendance: 90,
    taskCompletion: 85,
    earnings: 345,
    school: 'Lincoln High School',
    age: 17
  },
  {
    id: 2,
    name: 'Morgan Smith',
    email: 'morgan@example.com',
    phone: '+1 345-678-9012',
    batch: 'Business Bootcamp - Batch 1',
    status: 'active',
    attendance: 85,
    taskCompletion: 90,
    earnings: 420,
    school: 'Washington High School',
    age: 16
  },
  {
    id: 3,
    name: 'Jamie Lee',
    email: 'jamie@example.com',
    phone: '+1 456-789-0123',
    batch: 'Business Bootcamp - Batch 2',
    status: 'active',
    attendance: 95,
    taskCompletion: 95,
    earnings: 680,
    school: 'Jefferson High School',
    age: 17
  },
  {
    id: 4,
    name: 'Taylor Swift',
    email: 'taylor@example.com',
    phone: '+1 567-890-1234',
    batch: 'Business Bootcamp - Batch 2',
    status: 'inactive',
    attendance: 70,
    taskCompletion: 60,
    earnings: 120,
    school: 'Central High School',
    age: 16
  },
  {
    id: 5,
    name: 'Miguel Santos',
    email: 'miguel@example.com',
    phone: '+1 678-901-2345',
    batch: 'Entrepreneurship 101',
    status: 'pending',
    attendance: 0,
    taskCompletion: 0,
    earnings: 0,
    school: 'Riverside High School',
    age: 15
  },
];

// Mock batch data for filtering
const batchesData = [
  { id: 1, name: "Business Bootcamp - Batch 1" },
  { id: 2, name: "Business Bootcamp - Batch 2" },
  { id: 3, name: "Entrepreneurship 101" },
];

const AdminStudents = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      batch: '',
      age: '',
      school: ''
    }
  });
  
  const handleAddStudent = (data: any) => {
    console.log("New student data:", data);
    setShowAddStudentDialog(false);
    form.reset();
  };

  const filteredStudents = studentsData
    .filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(student => 
      statusFilter === 'all' || student.status === statusFilter
    )
    .filter(student => 
      batchFilter === 'all' || student.batch === batchFilter
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Status</p>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Batch</p>
                <Select value={batchFilter} onValueChange={setBatchFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    {batchesData.map(batch => (
                      <SelectItem key={batch.id} value={batch.name}>
                        {batch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setShowAddStudentDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Task Completion</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={student.name} size="sm" />
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />{student.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />{student.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{student.batch}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          student.status === 'active' 
                            ? 'success' 
                            : student.status === 'pending' 
                              ? 'outline' 
                              : 'secondary'
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-24">
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div 
                              className={`h-full rounded-full ${
                                student.attendance >= 90 ? 'bg-success' : 
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
                                student.taskCompletion >= 90 ? 'bg-success' : 
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
                        <DollarSign className="h-4 w-4 mr-1 text-success" />
                        ${student.earnings}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/students/${student.id}`)}
                        >
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Student
                            </DropdownMenuItem>
                            {student.status === 'pending' && (
                              <DropdownMenuItem className="flex items-center text-success">
                                <UserCheck className="h-4 w-4 mr-2" />
                                Approve Student
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No students found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Add a new student to the platform by filling out their details.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddStudent)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student's full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to Batch</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a batch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {batchesData.map(batch => (
                          <SelectItem key={batch.id} value={batch.id.toString()}>
                            {batch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowAddStudentDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Student</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudents;
