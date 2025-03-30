
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { PencilIcon, User, Mail, Phone, MapPin, Calendar, BadgeCheck, Shield, Lock, Bell, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94105',
    bio: 'Experienced business mentor with over 10 years of experience in entrepreneurship and startup coaching. Specialized in helping young entrepreneurs turn their ideas into successful businesses.',
    expertise: ['Business Strategy', 'Marketing', 'Finance'],
    education: 'MBA, Stanford University',
    experience: '10+ years in business consulting',
    preferredContact: 'email',
    notifyNewStudent: true,
    notifySessionChanges: true,
    notifyEarnings: true
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSwitchChange = (field: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
        >
          {isEditing ? 'Save Changes' : (
            <>
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-2xl">SJ</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{formData.name}</CardTitle>
            <div className="flex justify-center mt-2 gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Mentor
              </Badge>
              <Badge variant="outline" className="bg-muted">
                Since 2022
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid gap-1">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4" />
                Verified Teacher
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Top Performer 2023
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button size="sm" variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
        
        {/* Tabs Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    {isEditing ? 'Edit your personal details below' : 'Your personal information and contact details'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input 
                        id="name" 
                        value={formData.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)} 
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {formData.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)} 
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {formData.email}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)} 
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {formData.phone}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Textarea 
                        id="address" 
                        value={formData.address} 
                        onChange={(e) => handleInputChange('address', e.target.value)} 
                      />
                    ) : (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        {formData.address}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="professional" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>
                    {isEditing ? 'Edit your professional details below' : 'Your professional background and expertise'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea 
                        id="bio" 
                        className="min-h-[100px]" 
                        value={formData.bio} 
                        onChange={(e) => handleInputChange('bio', e.target.value)} 
                      />
                    ) : (
                      <div className="text-sm">{formData.bio}</div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="expertise">Areas of Expertise</Label>
                    {isEditing ? (
                      <Input 
                        id="expertise" 
                        value={formData.expertise.join(', ')} 
                        onChange={(e) => handleInputChange('expertise', e.target.value)} 
                        placeholder="e.g. Marketing, Finance, Strategy (separated by commas)"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="education">Education</Label>
                    {isEditing ? (
                      <Input 
                        id="education" 
                        value={formData.education} 
                        onChange={(e) => handleInputChange('education', e.target.value)} 
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formData.education}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="experience">Experience</Label>
                    {isEditing ? (
                      <Input 
                        id="experience" 
                        value={formData.experience} 
                        onChange={(e) => handleInputChange('experience', e.target.value)} 
                      />
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formData.experience}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="preferred-contact">Preferred Contact Method</Label>
                    {isEditing ? (
                      <Select 
                        defaultValue={formData.preferredContact}
                        onValueChange={(value) => handleInputChange('preferredContact', value)}
                      >
                        <SelectTrigger id="preferred-contact">
                          <SelectValue placeholder="Select contact method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="both">Both Email and Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="text-sm">
                        {formData.preferredContact === 'email' ? 'Email' : 
                         formData.preferredContact === 'phone' ? 'Phone' : 'Both Email and Phone'}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notification Preferences
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-student">New Student Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when a new student joins your batch
                        </div>
                      </div>
                      <Switch 
                        id="new-student"
                        checked={formData.notifyNewStudent}
                        onCheckedChange={(checked) => handleSwitchChange('notifyNewStudent', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-changes">Session Change Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified about session reschedules or cancellations
                        </div>
                      </div>
                      <Switch 
                        id="session-changes"
                        checked={formData.notifySessionChanges}
                        onCheckedChange={(checked) => handleSwitchChange('notifySessionChanges', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="earnings">Earnings Notifications</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified when you receive new earnings
                        </div>
                      </div>
                      <Switch 
                        id="earnings"
                        checked={formData.notifyEarnings}
                        onCheckedChange={(checked) => handleSwitchChange('notifyEarnings', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                      <Lock className="h-4 w-4" />
                      Security
                    </h3>
                    
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
