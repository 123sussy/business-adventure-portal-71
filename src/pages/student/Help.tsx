
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare, Mail, PhoneCall, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const faqs = [
  {
    id: "1",
    question: "How do I upload my task submission?",
    answer: "Go to the Tasks page, find the task you want to submit, and click on the 'Submit Task' button. You can upload files in PDF, PNG, JPG, or MP4 format."
  },
  {
    id: "2",
    question: "When do I receive my earnings?",
    answer: "Earnings are calculated at the end of each month and distributed by the 5th of the following month. You can track your earnings in the Sales section of your dashboard."
  },
  {
    id: "3",
    question: "How is my rank calculated?",
    answer: "Your rank is calculated based on a combination of sales amount, number of customers, task completion rate, and attendance. The leaderboard is updated daily."
  },
  {
    id: "4",
    question: "Can I reschedule a session?",
    answer: "Students cannot reschedule sessions directly. Please contact your mentor if you're unable to attend a scheduled session, and they will make arrangements accordingly."
  },
  {
    id: "5",
    question: "How do I get help if I'm stuck on a task?",
    answer: "You can reach out to your mentor through the feedback system or send a message directly. We encourage asking questions during the sessions as well."
  },
  {
    id: "6",
    question: "What should I do if I miss a session?",
    answer: "All sessions are recorded and available in the Sessions section. You can watch the recording to catch up on what you missed."
  },
  {
    id: "7",
    question: "How do I provide feedback about the platform or mentor?",
    answer: "Go to the Feedback section and click on 'Submit Feedback'. You can choose the category (Teacher, Content, or Platform) and provide your feedback there."
  },
  {
    id: "8",
    question: "Can I edit my sales entries after submission?",
    answer: "No, sales entries cannot be edited after submission to maintain integrity. If you've made a mistake, please reach out to the admin for assistance."
  }
];

const helpCategories = [
  {
    id: "account",
    title: "Account & Profile",
    description: "Manage your account settings and profile information",
    icon: <HelpCircle className="h-5 w-5" />
  },
  {
    id: "tasks",
    title: "Tasks & Submissions",
    description: "Help with completing and submitting tasks",
    icon: <ChevronRight className="h-5 w-5" />
  },
  {
    id: "sessions",
    title: "Sessions & Attendance",
    description: "Information about attending sessions and recordings",
    icon: <ChevronRight className="h-5 w-5" />
  },
  {
    id: "sales",
    title: "Sales & Earnings",
    description: "Guidelines for reporting sales and earnings",
    icon: <ChevronRight className="h-5 w-5" />
  },
  {
    id: "technical",
    title: "Technical Support",
    description: "Help with technical issues and platform functionality",
    icon: <ChevronRight className="h-5 w-5" />
  }
];

const StudentHelp = () => {
  const [activeTab, setActiveTab] = useState<string>("faq");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>
      
      <div className="relative w-full max-w-md mx-auto mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for help..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="mt-6 space-y-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id} className="px-6 border-b last:border-0">
                      <AccordionTrigger className="py-4 hover:no-underline">
                        <span className="text-left font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-1">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>No FAQs match your search. Try different keywords or contact us directly.</p>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Help Categories</CardTitle>
              <CardDescription>
                Browse help articles by category
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {helpCategories.map((category) => (
                <div key={category.id} className="flex items-center p-3 rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="mr-3 p-2 rounded-full bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center p-6 border rounded-md text-center">
                  <PhoneCall className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-lg font-medium mb-1">WhatsApp Support</h3>
                  <p className="text-muted-foreground mb-3">Quick responses during business hours</p>
                  <p className="font-medium text-primary">+91 9920188188</p>
                  <Button variant="outline" className="mt-4">
                    Chat on WhatsApp
                  </Button>
                </div>
                
                <div className="flex flex-col items-center p-6 border rounded-md text-center">
                  <Mail className="h-10 w-10 text-primary mb-3" />
                  <h3 className="text-lg font-medium mb-1">Email Support</h3>
                  <p className="text-muted-foreground mb-3">Response within 24 hours</p>
                  <p className="font-medium text-primary">info@oll.co</p>
                  <Button variant="outline" className="mt-4">
                    Send Email
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-3">Submit a Support Ticket</h3>
                <p className="text-muted-foreground mb-6">
                  For technical issues or complex questions, please submit a support ticket and our team will get back to you.
                </p>
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Create Support Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Our support team is available during these hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 2:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </div>
                <p className="text-sm text-muted-foreground pt-3">
                  For urgent matters outside business hours, please send an email and we'll respond at the earliest opportunity.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentHelp;
