
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarClock, DollarSign, Users, School, CheckCircle, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data for the dashboard
const salesData = [
  { name: 'Jan', total: 2500 },
  { name: 'Feb', total: 3500 },
  { name: 'Mar', total: 4000 },
  { name: 'Apr', total: 6500 },
  { name: 'May', total: 5000 },
  { name: 'Jun', total: 7500 },
  { name: 'Jul', total: 9000 },
];

const attendanceData = [
  { batch: 'Batch 1', attendance: 92 },
  { batch: 'Batch 2', attendance: 85 },
  { batch: 'Batch 3', attendance: 78 },
  { batch: 'Batch 4', attendance: 95 },
  { batch: 'Batch 5', attendance: 88 },
];

// Upcoming sessions for today
const todaySessions = [
  {
    id: 1,
    time: '09:00 AM - 11:00 AM',
    batch: 'Business Bootcamp - Batch 1',
    topic: 'Financial Planning',
    teacher: 'Jamie Smith',
    attendees: 15,
    status: 'scheduled'
  },
  {
    id: 2,
    time: '01:00 PM - 03:00 PM',
    batch: 'Business Bootcamp - Batch 2',
    topic: 'Market Research Strategies',
    teacher: 'Alex Rodriguez',
    attendees: 18,
    status: 'scheduled'
  },
  {
    id: 3,
    time: '04:00 PM - 06:00 PM',
    batch: 'Entrepreneurship 101',
    topic: 'Introduction to Entrepreneurship',
    teacher: 'Sarah Johnson',
    attendees: 12,
    status: 'rescheduled'
  }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today: {new Date().toLocaleDateString()}
          </Button>
          <Button>View Reports</Button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+120</div>
            <p className="text-xs text-muted-foreground">
              +10 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              1 starting next week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Sessions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            Today's Sessions
          </CardTitle>
          <CardDescription>
            All scheduled sessions for today, {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaySessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.time}</TableCell>
                  <TableCell>{session.batch}</TableCell>
                  <TableCell>{session.topic}</TableCell>
                  <TableCell>{session.teacher}</TableCell>
                  <TableCell>{session.attendees}</TableCell>
                  <TableCell>
                    <Badge variant={session.status === 'scheduled' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Revenue</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue trend for the current year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={salesData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                  />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance By Batch</CardTitle>
              <CardDescription>
                Average attendance percentage across active batches
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis dataKey="batch" tickLine={false} axisLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `${value}%`} 
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} />
                  <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
