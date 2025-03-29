
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import UserAvatar from '@/components/ui-custom/UserAvatar';
import { 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  Briefcase, 
  Check, 
  AlertCircle,
  School,
  Video
} from 'lucide-react';

// Mock data for today's sessions
const todaySessions = [
  {
    id: 1,
    batchName: 'Business Bootcamp - Batch 1',
    time: '10:00 AM - 12:00 PM',
    teacher: 'Jamie Smith',
    topic: 'Financial Planning',
    status: 'scheduled',
    totalStudents: 15,
    attendingStudents: 13
  },
  {
    id: 2,
    batchName: 'Business Bootcamp - Batch 2',
    time: '2:00 PM - 4:00 PM',
    teacher: 'Alex Rodriguez',
    topic: 'Marketing Strategies',
    status: 'ongoing',
    totalStudents: 18,
    attendingStudents: 16
  },
  {
    id: 3,
    batchName: 'Entrepreneurship 101',
    time: '5:00 PM - 7:00 PM',
    teacher: 'Sarah Johnson',
    topic: 'Business Models',
    status: 'scheduled',
    totalStudents: 12,
    attendingStudents: 0
  }
];

// Mock data for stats
const statsData = {
  totalStudents: 156,
  totalTeachers: 12,
  totalBatches: 9,
  activeStudents: 134,
  totalRevenue: 28450,
  pendingApprovals: 5
};

// Weekly schedule data
const weeklySchedule = [
  { day: 'Monday', sessions: 3 },
  { day: 'Tuesday', sessions: 4 },
  { day: 'Wednesday', sessions: 5 },
  { day: 'Thursday', sessions: 3 },
  { day: 'Friday', sessions: 4 },
  { day: 'Saturday', sessions: 2 },
  { day: 'Sunday', sessions: 0 }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule View
          </Button>
          <Button>
            <Video className="h-4 w-4 mr-2" />
            Create Session
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Students</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              {statsData.totalStudents}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {statsData.activeStudents} active students
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Teachers</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <School className="mr-2 h-5 w-5 text-secondary" />
              {statsData.totalTeachers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Across {statsData.totalBatches} batches
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-success" />
              ${statsData.totalRevenue}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              From student sales
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <CardDescription>
            All sessions planned for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todaySessions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaySessions.map(session => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.batchName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{session.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserAvatar name={session.teacher} size="sm" />
                        <span>{session.teacher}</span>
                      </div>
                    </TableCell>
                    <TableCell>{session.topic}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          session.status === 'ongoing' 
                            ? 'default' 
                            : session.status === 'scheduled' 
                              ? 'outline' 
                              : 'secondary'
                        }
                      >
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {session.status === 'ongoing' || session.status === 'completed' ? (
                        <span>{session.attendingStudents}/{session.totalStudents}</span>
                      ) : (
                        <span>-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {session.status === 'ongoing' ? (
                        <Button size="sm">Join</Button>
                      ) : session.status === 'scheduled' ? (
                        <Button variant="outline" size="sm">View Details</Button>
                      ) : (
                        <Button variant="ghost" size="sm">View Recording</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No sessions scheduled for today.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Session distribution throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklySchedule.map(day => (
                <div key={day.day} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day.day}</span>
                    <span className="text-sm text-muted-foreground">{day.sessions} sessions</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(day.sessions / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Users size={16} />
                </div>
                <div>
                  <p className="font-medium">New Student Registration</p>
                  <p className="text-xs text-muted-foreground">Emily Parker joined the platform</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2h ago</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                  <DollarSign size={16} />
                </div>
                <div>
                  <p className="font-medium">New Sale Recorded</p>
                  <p className="text-xs text-muted-foreground">Alex Johnson made a sale of $45</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">5h ago</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                  <School size={16} />
                </div>
                <div>
                  <p className="font-medium">New Teacher Added</p>
                  <p className="text-xs text-muted-foreground">Sarah Thompson joined as a mentor</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">1d ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Actions</CardTitle>
          <CardDescription>Items that require your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Student Approvals Pending</p>
                  <p className="text-sm text-muted-foreground">{statsData.pendingApprovals} students waiting for approval</p>
                </div>
              </div>
              <Button>Review</Button>
            </div>
            
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Upcoming Batch Starting</p>
                  <p className="text-sm text-muted-foreground">Marketing Bootcamp starts in 3 days</p>
                </div>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
            
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium">Teacher Payment Processing</p>
                  <p className="text-sm text-muted-foreground">8 teachers due for payment this month</p>
                </div>
              </div>
              <Button variant="outline">Process Payments</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
