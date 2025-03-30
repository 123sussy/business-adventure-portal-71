
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, FileText, RotateCcw } from 'lucide-react';
import TaskSubmission from './TaskSubmission';
import TaskView from './TaskView';

type TaskStatus = 'pending' | 'submitted' | 'completed' | 'overdue' | 'resubmit';

interface TaskProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    deadline: string;
    submittedAt?: string;
    feedback?: string;
    rating?: number;
  };
}

const TaskCardUpdated: React.FC<TaskProps> = ({ task }) => {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(task.status);
  
  const handleSubmissionComplete = () => {
    setTaskStatus('submitted');
  };
  
  const getStatusIcon = () => {
    switch (taskStatus) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'submitted':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'overdue':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'resubmit':
        return <RotateCcw className="h-5 w-5 text-warning" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getStatusBadge = () => {
    switch (taskStatus) {
      case 'completed':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Completed</Badge>;
      case 'submitted':
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Submitted</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Overdue</Badge>;
      case 'resubmit':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Needs Revision</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };
  
  const isDeadlinePassed = () => {
    const deadline = new Date(task.deadline);
    const today = new Date();
    return today > deadline;
  };
  
  const getDaysRemaining = () => {
    const deadline = new Date(task.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <Card className={`
      border-l-4 
      ${taskStatus === 'completed' ? 'border-l-success' : 
        taskStatus === 'submitted' ? 'border-l-primary' : 
        taskStatus === 'overdue' ? 'border-l-destructive' : 
        taskStatus === 'resubmit' ? 'border-l-warning' : 
        'border-l-muted'}
    `}>
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <h3 className="font-medium">{task.title}</h3>
              {getStatusBadge()}
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-sm">
              <span className="text-muted-foreground">Due: </span>
              <span className={isDeadlinePassed() && taskStatus === 'pending' ? 'text-destructive font-medium' : ''}>
                {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
            
            {taskStatus === 'pending' && !isDeadlinePassed() && getDaysRemaining() <= 3 && (
              <div className="text-xs text-warning mt-1">
                {getDaysRemaining() === 0 ? 'Due today!' : `${getDaysRemaining()} days left`}
              </div>
            )}
            
            {taskStatus === 'completed' && task.rating && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs">Rating:</span>
                <span className="text-xs font-medium">{task.rating}/5</span>
                <span className="text-yellow-500">★</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-muted/20 flex justify-end">
        {taskStatus === 'pending' && (
          <TaskSubmission 
            taskId={task.id}
            taskTitle={task.title}
            onSubmissionComplete={handleSubmissionComplete}
          />
        )}
        
        {['submitted', 'completed', 'resubmit'].includes(taskStatus) && (
          <TaskView
            taskId={task.id}
            taskTitle={task.title}
            taskStatus={taskStatus}
            submittedAt={task.submittedAt}
            feedback={task.feedback}
            rating={task.rating}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCardUpdated;
