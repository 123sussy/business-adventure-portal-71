
import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskManager from '@/components/mentor/TaskManager';

// You would typically fetch this data based on the batchId
const mockBatchData = {
  id: 1,
  name: 'Business Bootcamp - Batch 1',
  description: 'Comprehensive program for aspiring entrepreneurs covering business planning, marketing, and operations.',
  startDate: '2023-09-01',
  endDate: '2023-12-15',
  students: 25,
  progress: 65
};

const BatchDetails = () => {
  const { batchId } = useParams();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{mockBatchData.name}</h1>
        <p className="text-muted-foreground">{mockBatchData.description}</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>Overview content here</div>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="mt-6">
          Students list here
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          <TaskManager />
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-6">
          Sessions list here
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BatchDetails;
