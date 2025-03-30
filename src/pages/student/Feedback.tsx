
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { MessageSquare, Upload, Send, ThumbsUp, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type FeedbackCategory = 'teacher' | 'content' | 'platform';

interface FeedbackFormValues {
  category: FeedbackCategory;
  title: string;
  message: string;
}

const StudentFeedback = () => {
  const [activeTab, setActiveTab] = useState<string>("submit");
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FeedbackFormValues>({
    defaultValues: {
      category: 'teacher',
      title: '',
      message: '',
    },
  });

  const onSubmit = (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newFeedback = {
        id: Date.now(),
        ...data,
        image: selectedFile ? URL.createObjectURL(selectedFile) : null,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      setFeedbacks([newFeedback, ...feedbacks]);
      setIsSubmitting(false);
      form.reset();
      setSelectedFile(null);
      setDialogOpen(false);
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! Our team will review it shortly.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Feedback</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Submit Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Feedback</DialogTitle>
              <DialogDescription>
                Let us know how we can improve your experience
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Feedback Category</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="teacher" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Teacher
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="content" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Content
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="platform" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Platform
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a brief title for your feedback" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your feedback in detail" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel>Image (Optional)</FormLabel>
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    <input
                      id="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="file" className="cursor-pointer block">
                      {selectedFile ? (
                        <div className="space-y-2">
                          <img 
                            src={URL.createObjectURL(selectedFile)}
                            alt="Feedback image preview"
                            className="max-h-[100px] mx-auto object-contain"
                          />
                          <p className="text-sm">{selectedFile.name}</p>
                          <Button type="button" variant="outline" size="sm">
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm">Click to upload an image</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    {isSubmitting ? null : <Send className="h-4 w-4" />}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="submit" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="submit">My Submissions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          {feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{feedback.title}</CardTitle>
                        <CardDescription>
                          Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center px-2 py-1 rounded bg-muted text-xs font-medium">
                        {feedback.category}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{feedback.message}</p>
                    {feedback.image && (
                      <img 
                        src={feedback.image} 
                        alt="Feedback" 
                        className="rounded-md max-h-[200px] object-contain"
                      />
                    )}
                    <div className="flex justify-between items-center text-xs text-muted-foreground pt-2">
                      <span>Status: {feedback.status}</span>
                      {feedback.response && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Response received
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <MessageSquare className="h-12 w-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No feedback submitted yet</h3>
                <p className="text-muted-foreground mb-6">
                  Share your thoughts about the platform, content, or teachers
                </p>
                <Button onClick={() => setDialogOpen(true)}>Submit Feedback</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Reviews</CardTitle>
              <CardDescription>
                You can submit batch reviews once a batch is completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Business Bootcamp - Batch 1</h3>
                      <p className="text-sm text-muted-foreground">May 1, 2023 to July 30, 2023</p>
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" className="gap-2">
                        <Star className="h-4 w-4" />
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-muted/30">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">Business Bootcamp - Batch 0</h3>
                      <p className="text-sm text-muted-foreground">Feb 1, 2023 to Apr 30, 2023</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Reviewed</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex">
                    <div className="mr-3">
                      <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= 4 ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium mt-1">4.0/5.0</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">Great experience! Learned a lot about business fundamentals and how to apply them in real-world scenarios.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentFeedback;
