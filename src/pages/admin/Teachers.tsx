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
import { useForm } from "react-hook-form";
import { 
  Search, 
  Plus, 
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Users,
  Star,
  School
} from 'lucide-react';
import UserAvatar from '@/components/ui-custom/UserAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

const teachersData = [
  {
    id: 1,
    name: 'Jamie Smith',
    email: 'jamie.smith@example.com',
    phone: '+1 234-567-8901',
    specialization: 'Business Strategy',
    status: 'active',
    totalBatches: 2,
    currentBatches: 1,
    totalStudents: 31,
    totalEarnings: 1450,
    rating: 4.8,
    joiningDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    phone: '+1 345-678-9012',
    specialization: 'Marketing',
    status: 'active',
    totalBatches: 1,
    currentBatches: 1,
    totalStudents: 18,
    totalEarnings: 950,
    rating: 4.6,
    joiningDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 456-789-0123',
    specialization: 'Entrepreneurship',
    status: 'active',
    totalBatches: 1,
    currentBatches: 1,
    totalStudents: 12,
    totalEarnings: 0,
    rating: 4.7,
    joiningDate: '2023-03-10'
  },
  {
    id: 4,
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 567-890-1234',
    specialization: 'Finance',
    status: 'inactive',
    totalBatches: 0,
    currentBatches: 0,
    totalStudents: 0,
    totalEarnings: 0,
    rating: 0,
    joiningDate: '2023-05-05'
  }
];

const specializationOptions = [
  'Business Strategy',
  'Marketing',
  'Finance',
  'Entrepreneurship',
  'Sales',
  'Product Development',
  'Digital Marketing'
];

const AdminTeachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddTeacherDialog, setShowAddTeacherDialog] = useState(false);
  
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });
  
  const handleAddTeacher = (data: any) => {
    console.log("New teacher data:", data);
    setShowAddTeacherDialog(false);
    form.reset();
    
    toast({
      title: "Teacher added",
      description: "New teacher has been successfully added",
    });
  };

  const filteredTeachers = teachersData
    .filter(teacher => 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(teacher => 
      statusFilter === 'all' || teacher.status === statusFilter
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Teachers</h1>
        
        <div className="flex gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowAddTeacherDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Batches</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar name={teacher.name} size="sm" />
                        <div>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />{teacher.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />{teacher.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.specialization}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={teacher.status === 'active' ? 'default' : 'secondary'}
                        className={teacher.status === 'active' ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium">{teacher.currentBatches}</span>
                          <span className="text-muted-foreground"> / {teacher.totalBatches}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{teacher.totalStudents}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                        ${teacher.totalEarnings}
                      </div>
                    </TableCell>
                    <TableCell>
                      {teacher.rating > 0 ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                          <span>{teacher.rating}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin/teachers/${teacher.id}`)}
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
                              Edit Teacher
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Teacher
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No teachers found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showAddTeacherDialog} onOpenChange={setShowAddTeacherDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
            <DialogDescription>
              Add a new teacher to the platform by filling out their details.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddTeacher)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter teacher's full name" {...field} />
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
              
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowAddTeacherDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Teacher</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeachers;
