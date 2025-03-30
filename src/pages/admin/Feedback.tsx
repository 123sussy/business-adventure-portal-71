
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageSquare,
  Search,
  Filter,
  Eye,
  MessageCircle,
  Star,
  CheckCircle,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const feedbackData = [
  {
    id: 1,
    student: "Alex Johnson",
    title: "Platform Navigation Issues",
    category: "platform",
    status: "pending",
    date: "2023-06-15",
    message: "I'm having trouble navigating between the dashboard and the sales page. Sometimes the links don't work and I have to refresh the page.",
    image: null
  },
  {
    id: 2,
    student: "Taylor Swift",
    title: "Teacher Communication",
    category: "teacher",
    status: "resolved",
    date: "2023-06-10",
    message: "I'd like to suggest having a direct messaging feature to communicate with teachers instead of using the feedback system.",
    response: "Thank you for your suggestion! We're currently working on implementing a direct messaging feature that will be available in the next update.",
    image: null
  },
  {
    id: 3,
    student: "John Smith",
    title: "Session Content Suggestion",
    category: "content",
    status: "pending",
    date: "2023-06-12",
    message: "I think it would be helpful to have more practical exercises during the business planning sessions. Currently, it's mostly theoretical.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    student: "Sophia Chen",
    title: "Platform Loading Time",
    category: "platform",
    status: "pending",
    date: "2023-06-18",
    message: "The platform takes a long time to load, especially the sales report section. This makes it difficult to update my sales information quickly.",
    image: null
  },
  {
    id: 5,
    student: "Michael Brown",
    title: "Teacher Feedback Timing",
    category: "teacher",
    status: "resolved",
    date: "2023-06-05",
    message: "It would be nice if we could get feedback on our tasks more quickly. Sometimes it takes more than a week to receive feedback.",
    response: "We've addressed this with our teaching team and have implemented a new policy that ensures feedback will be provided within 48 hours of submission.",
    image: null
  }
];

const reviewData = [
  {
    id: 1,
    student: "Emma Wilson",
    batchName: "Business Bootcamp - Batch 0",
    rating: 5,
    date: "2023-05-01",
    review: "The bootcamp was excellent! I learned so much about business fundamentals and how to apply them in real-world scenarios. The mentor was very knowledgeable and supportive."
  },
  {
    id: 2,
    student: "Noah Garcia",
    batchName: "Business Bootcamp - Batch 0",
    rating: 4,
    date: "2023-05-02",
    review: "Great experience overall. The content was well-structured and the sessions were engaging. I would have appreciated more one-on-one mentoring time."
  },
  {
    id: 3,
    student: "Olivia Davis",
    batchName: "Business Bootcamp - Batch 0",
    rating: 3,
    date: "2023-05-03",
    review: "The bootcamp was good but there were some technical issues with the platform that made accessing materials difficult at times. Content was valuable though."
  }
];

const AdminFeedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("feedback");
  const [response, setResponse] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const handleViewFeedback = (feedback: any) => {
    setSelectedFeedback(feedback);
    setViewDialogOpen(true);
  };
  
  const handleOpenResponseDialog = (feedback: any) => {
    setSelectedFeedback(feedback);
    setResponse(feedback.response || '');
    setResponseDialogOpen(true);
  };
  
  const handleSubmitResponse = () => {
    // Update local state
    const updatedFeedbackData = feedbackData.map(item => 
      item.id === selectedFeedback.id 
        ? { ...item, status: 'resolved', response: response } 
        : item
    );
    
    // In a real app, you would make an API call here
    console.log("Submitting response:", {
      feedbackId: selectedFeedback.id,
      response,
    });
    
    toast({
      title: "Response submitted",
      description: "Your response has been sent to the student.",
    });
    
    setResponseDialogOpen(false);
  };
  
  const filteredFeedback = feedbackData.filter(item => 
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.message.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || item.status === statusFilter) &&
    (categoryFilter === 'all' || item.category === categoryFilter)
  );
  
  const filteredReviews = reviewData.filter(item =>
    item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Feedback & Reviews</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search feedback..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {activeTab === 'feedback' && (
          <>
            <select 
              className="px-3 py-2 rounded-md border" 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="platform">Platform</option>
              <option value="teacher">Teacher</option>
              <option value="content">Content</option>
            </select>
            
            <select 
              className="px-3 py-2 rounded-md border" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </>
        )}
      </div>
      
      <Tabs defaultValue="feedback" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="reviews">Batch Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
              <CardDescription>
                Manage and respond to student feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Student</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeedback.length > 0 ? (
                    filteredFeedback.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell className="font-medium">
                          {feedback.student}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate">
                            <span className="font-medium">{feedback.title}</span>
                            <div className="text-xs text-muted-foreground truncate">
                              {feedback.message.substring(0, 50)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              feedback.category === 'platform' 
                                ? 'bg-blue-100 text-blue-800' 
                                : feedback.category === 'teacher'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-green-100 text-green-800'
                            }
                          >
                            {feedback.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={feedback.status === 'resolved' ? 'outline' : 'default'}
                          >
                            {feedback.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(feedback.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewFeedback(feedback)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={feedback.status === 'resolved' ? 'outline' : 'default'}
                              size="sm"
                              onClick={() => handleOpenResponseDialog(feedback)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No feedback found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Reviews</CardTitle>
              <CardDescription>
                Reviews submitted by students after batch completion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Student</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {review.student}
                        </TableCell>
                        <TableCell>
                          {review.batchName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="flex">
                              {Array(5).fill(0).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md truncate">
                            {review.review.substring(0, 100)}...
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(review.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No reviews found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View Feedback Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedFeedback?.title}</DialogTitle>
            <DialogDescription>
              From {selectedFeedback?.student} on {selectedFeedback?.date && new Date(selectedFeedback.date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={
                      selectedFeedback?.category === 'platform' 
                        ? 'bg-blue-100 text-blue-800' 
                        : selectedFeedback?.category === 'teacher'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                    }
                  >
                    {selectedFeedback?.category}
                  </Badge>
                  
                  <Badge 
                    variant={selectedFeedback?.status === 'resolved' ? 'outline' : 'default'}
                  >
                    {selectedFeedback?.status}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm">{selectedFeedback?.message}</p>
            </div>
            
            {selectedFeedback?.image && (
              <div className="border rounded-md p-2">
                <img 
                  src={selectedFeedback.image} 
                  alt="Feedback attachment" 
                  className="max-h-[200px] mx-auto object-contain rounded"
                />
              </div>
            )}
            
            {selectedFeedback?.response && (
              <div className="border rounded-md p-4 bg-muted/20">
                <h3 className="text-sm font-medium mb-2">Response:</h3>
                <p className="text-sm">{selectedFeedback.response}</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setViewDialogOpen(false)}
            >
              Close
            </Button>
            
            {selectedFeedback?.status !== 'resolved' && (
              <Button onClick={() => {
                setViewDialogOpen(false);
                handleOpenResponseDialog(selectedFeedback);
              }}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Respond
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Respond to Feedback</DialogTitle>
            <DialogDescription>
              Write a response to {selectedFeedback?.student}'s feedback
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-muted/20">
              <h3 className="text-sm font-medium mb-2">Original Feedback:</h3>
              <p className="text-sm">{selectedFeedback?.message}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="response">Your Response</Label>
              <Textarea 
                id="response" 
                className="min-h-[150px]" 
                placeholder="Write your response here..." 
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setResponseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!response.trim()}
              onClick={handleSubmitResponse}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Submit Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFeedback;
