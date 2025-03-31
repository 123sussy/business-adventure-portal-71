
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
import { 
  Search, 
  Users, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  School, 
  Clock, 
  Filter, 
  MoreVertical, 
  DollarSign
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

// Mock data for batches
const batchesData = [
  { 
    id: 1, 
    name: "Business Bootcamp - Batch 1", 
    status: "ongoing", 
    startDate: "2023-05-01",
    endDate: "2023-07-30", 
    students: 15,
    teacher: "Jamie Smith",
    earnings: 1200,
    teacherEarnings: 240, // 20% of earnings
    ollShare: 360, // 30% of earnings
    nextSession: "2023-06-16T15:00:00",
    daysPerWeek: ["Monday", "Wednesday", "Friday"],
    time: "3:00 PM - 5:00 PM"
  },
  { 
    id: 2, 
    name: "Business Bootcamp - Batch 2", 
    status: "ongoing", 
    startDate: "2023-06-01",
    endDate: "2023-08-30", 
    students: 18,
    teacher: "Alex Rodriguez",
    earnings: 950,
    teacherEarnings: 190, // 20% of earnings
    ollShare: 285, // 30% of earnings
    nextSession: "2023-06-15T14:00:00",
    daysPerWeek: ["Tuesday", "Thursday"],
    time: "2:00 PM - 4:00 PM"
  },
  { 
    id: 3, 
    name: "Entrepreneurship 101", 
    status: "upcoming", 
    startDate: "2023-07-01",
    endDate: "2023-09-30", 
    students: 12,
    teacher: "Sarah Johnson",
    earnings: 0,
    teacherEarnings: 0,
    ollShare: 0,
    nextSession: "2023-07-01T13:00:00",
    daysPerWeek: ["Monday", "Wednesday"],
    time: "1:00 PM - 3:00 PM"
  },
  { 
    id: 4, 
    name: "Business Bootcamp - Batch 0", 
    status: "completed", 
    startDate: "2023-02-01",
    endDate: "2023-04-30", 
    students: 16,
    teacher: "Jamie Smith",
    earnings: 1450,
    teacherEarnings: 290, // 20% of earnings
    ollShare: 435, // 30% of earnings
    nextSession: null,
    daysPerWeek: ["Tuesday", "Thursday", "Saturday"],
    time: "4:00 PM - 6:00 PM"
  }
];

// Mock data for teachers
const teachersData = [
  { id: 1, name: "Jamie Smith" },
  { id: 2, name: "Alex Rodriguez" },
  { id: 3, name: "Sarah Johnson" },
  { id: 4, name: "Michael Brown" }
];

const AdminBatches = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showAddBatchDialog, setShowAddBatchDialog] = useState(false);
  const [showEditBatchDialog, setShowEditBatchDialog] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [currentBatch, setCurrentBatch] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      batchName: '',
      startDate: '',
      endDate: '',
      teacher: '',
      time: '',
      topics: ''
    }
  });

  const editForm = useForm({
    defaultValues: {
      batchName: '',
      startDate: '',
      endDate: '',
      teacher: '',
      time: '',
      topics: ''
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

  const handleAddBatch = (data: any) => {
    console.log("New batch data:", { ...data, daysPerWeek: selectedDays });
    toast({
      title: "Batch added",
      description: "New batch has been successfully created"
    });
    setShowAddBatchDialog(false);
    form.reset();
    setSelectedDays([]);
  };

  const handleEditBatch = (batchId: number) => {
    const batch = batchesData.find(b => b.id === batchId);
    if (batch) {
      setCurrentBatch(batch);
      editForm.reset({
        batchName: batch.name,
        startDate: batch.startDate,
        endDate: batch.endDate,
        teacher: batch.teacher,
        time: batch.time,
        topics: ''
      });
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
    editForm.reset();
    setSelectedDays([]);
  };

  const filteredBatches = batchesData
    .filter(batch => 
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === 'all' || batch.status === activeTab)
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Batches</h1>
        
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search batches..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={() => setShowAddBatchDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Batch
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Teacher (20%)</TableHead>
                    <TableHead>OLL Share (30%)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.length > 0 ? (
                    filteredBatches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{batch.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {batch.startDate} to {batch.endDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              batch.status === 'ongoing' 
                                ? 'default' 
                                : batch.status === 'upcoming' 
                                  ? 'outline' 
                                  : 'secondary'
                            }
                          >
                            {batch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4 text-muted-foreground" />
                            <span>{batch.teacher}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="text-xs flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {batch.daysPerWeek.join(', ')}
                            </div>
                            <div className="text-xs flex items-center mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              {batch.time}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            {batch.students}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-success" />
                            ${batch.earnings}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                            ${batch.teacherEarnings}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                            ${batch.ollShare}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/admin/batches/${batch.id}`)}
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
                                <DropdownMenuItem 
                                  className="flex items-center"
                                  onClick={() => handleEditBatch(batch.id)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Batch
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Batch
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No batches found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Batch Dialog */}
      <Dialog open={showAddBatchDialog} onOpenChange={setShowAddBatchDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Batch</DialogTitle>
            <DialogDescription>
              Create a new batch by filling out the details below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddBatch)} className="space-y-6">
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

              <div>
                <FormLabel>Bulk Add Students</FormLabel>
                <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                  <label className="cursor-pointer">
                    <Input type="file" className="hidden" accept=".csv,.xlsx" />
                    <div className="space-y-2">
                      <Plus className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">Upload CSV or Excel file</p>
                      <p className="text-xs text-muted-foreground">
                        Format: Name, Email, Phone, Age, School, Password
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowAddBatchDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Batch</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Batch Dialog */}
      <Dialog open={showEditBatchDialog} onOpenChange={setShowEditBatchDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Batch</DialogTitle>
            <DialogDescription>
              Update batch information below.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdateBatch)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
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
                  control={editForm.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <Input value={field.value} readOnly />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
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
                  control={editForm.control}
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
                control={editForm.control}
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
                control={editForm.control}
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

export default AdminBatches;
