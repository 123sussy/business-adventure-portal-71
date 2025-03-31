
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Star, MessageSquare, Download, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TaskViewProps {
  taskId: number;
  taskTitle: string;
  taskStatus: 'pending' | 'submitted' | 'completed' | 'overdue' | 'resubmit';
  submittedAt?: string;
  feedback?: string;
  rating?: number;
  onResubmit?: () => void;
}

const TaskView: React.FC<TaskViewProps> = ({ 
  taskId, 
  taskTitle, 
  taskStatus, 
  submittedAt, 
  feedback, 
  rating,
  onResubmit
}) => {
  const [open, setOpen] = useState(false);

  // Mock file data
  const mockFile = {
    name: "task_submission.pdf",
    type: "application/pdf",
    size: 2.45,
    url: "https://example.com/file.pdf" // This would be a real URL in production
  };

  const handleDownload = () => {
    // Mock download functionality
    toast({
      title: "Download started",
      description: `${mockFile.name} is being downloaded.`,
    });
  };

  const handleResubmit = () => {
    setOpen(false);
    if (onResubmit) {
      onResubmit();
    }
  };

  const renderStatusBadge = () => {
    switch (taskStatus) {
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Submitted</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'resubmit':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Needs Revision</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pending</Badge>;
    }
  };

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="gap-2">
        <Eye size={14} />
        View
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{taskTitle}</span>
              {renderStatusBadge()}
            </DialogTitle>
            <DialogDescription>
              {submittedAt && `Submitted on ${new Date(submittedAt).toLocaleDateString()}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* File Preview */}
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <FileText size={24} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">{mockFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {mockFile.size} MB - {mockFile.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto" onClick={handleDownload}>
                  <Download size={14} className="mr-2" />
                  Download
                </Button>
              </div>
            </div>
            
            {/* Teacher Feedback (if completed or needs revision) */}
            {(taskStatus === 'completed' || taskStatus === 'resubmit') && feedback && (
              <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-muted-foreground" />
                  <h4 className="font-medium">Teacher's Feedback</h4>
                </div>
                <p className="text-sm">{feedback}</p>
                
                {rating && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(rating)}
                      </div>
                      <span className="text-sm font-medium">{rating}/5</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              {taskStatus === 'resubmit' && (
                <Button onClick={handleResubmit} className="gap-2">
                  <CheckCircle size={16} />
                  Resubmit Task
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskView;
