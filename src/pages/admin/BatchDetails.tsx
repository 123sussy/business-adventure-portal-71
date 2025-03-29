
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, DollarSign, School, Users } from 'lucide-react';

// This is a stub file that would contain the admin batch details functionality
// Similar to the mentor batch details, but with admin privileges

const AdminBatchDetails = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/admin/batches')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Batches
        </Button>
        <h1 className="text-2xl font-bold">Batch Details</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div>
              <h2 className="text-xl font-bold">Business Bootcamp - Batch {batchId}</h2>
              <p className="text-muted-foreground">May 1, 2023 to July 30, 2023</p>
              
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">15 Students</div>
                    <div className="text-xs text-muted-foreground">Enrolled</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Jamie Smith</div>
                    <div className="text-xs text-muted-foreground">Teacher</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  <div>
                    <div className="text-sm font-medium">$1,200</div>
                    <div className="text-xs text-muted-foreground">Total Revenue</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:ml-auto flex flex-wrap gap-2">
              <Button>
                Edit Batch
              </Button>
              <Button variant="outline">
                Add Student
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Batch Overview</CardTitle>
              <CardDescription>
                Details and statistics for Business Bootcamp - Batch {batchId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                This would contain detailed batch information, statistics, and overview charts.
                <div className="mt-4">
                  <Button onClick={() => setActiveTab('sessions')}>View Sessions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>
                Manage all scheduled sessions for this batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                This would contain session management functionality, including adding, editing, and rescheduling sessions.
                <div className="mt-4">
                  <Button>Add New Session</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>
                Manage students enrolled in this batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                This would contain student management functionality, including viewing attendance, progress, and earnings.
                <div className="mt-4">
                  <Button>Add Students to Batch</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                Manage tasks for this batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                This would contain task management functionality, including creating, assigning, and reviewing tasks.
                <div className="mt-4">
                  <Button>Add New Task</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBatchDetails;
