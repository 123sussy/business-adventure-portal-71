
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TaskSubmissionProps {
  taskId: number;
  taskTitle: string;
  onSubmissionComplete: () => void;
}

const TaskSubmission: React.FC<TaskSubmissionProps> = ({ taskId, taskTitle, onSubmissionComplete }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      console.log("Submitting task:", {
        taskId,
        comments,
        file: selectedFile?.name
      });
      
      setIsSubmitting(false);
      setOpen(false);
      setComments('');
      setSelectedFile(null);
      onSubmissionComplete();
      
      toast({
        title: "Task Submitted",
        description: `Your task "${taskTitle}" has been submitted successfully.`,
      });
    }, 1500);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Upload size={16} />
        Submit Task
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Task: {taskTitle}</DialogTitle>
            <DialogDescription>
              Upload your completed task. Accepted formats: PDF, PNG, JPG, MP4.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Task File</Label>
              <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.mp4"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <Label htmlFor="file" className="cursor-pointer w-full h-full block">
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={24} className="text-primary" />
                      <p className="text-sm font-medium text-primary">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button type="button" size="sm" variant="outline">Replace File</Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload size={24} className="text-muted-foreground" />
                      <p className="text-sm font-medium">Drop file here or click to upload</p>
                      <p className="text-xs text-muted-foreground">Max file size: 50MB</p>
                    </div>
                  )}
                </Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Add any additional information about your submission..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!selectedFile || isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Task'}
                {isSubmitting ? null : <CheckCircle size={16} />}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskSubmission;
