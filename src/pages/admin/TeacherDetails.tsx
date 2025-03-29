
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';

// This is a stub file that would contain the admin teacher details functionality

const AdminTeacherDetails = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/admin/teachers')}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Teachers
        </Button>
        <h1 className="text-2xl font-bold">Teacher Details</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12 text-muted-foreground">
            This page would display detailed information about Teacher ID: {teacherId}, 
            including their profile, assigned batches, students, earnings, and performance data.
            <div className="mt-4">
              <Button onClick={() => navigate('/admin/teachers')}>
                Return to Teachers List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                Teacher overview content would go here, including performance metrics and personal details.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batches" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                Batches assigned to this teacher would be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                Students assigned to this teacher would be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                Teacher earnings history and statistics would be displayed here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTeacherDetails;
