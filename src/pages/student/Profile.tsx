
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  Home, 
  Calendar, 
  Edit, 
  PencilIcon, 
  Save, 
  Upload,
  FileText,
  GraduationCap,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    school: 'Lincoln High School',
    grade: '11th Grade',
    address: '456 Oak Street, Springfield, IL 62701',
    parentName: 'Michael Johnson',
    parentPhone: '+1 (555) 987-6543',
    bio: "I'm a student entrepreneur interested in developing eco-friendly products.",
    schoolProject: 'Eco Crafts',
    projectDescription: 'Handmade sustainable crafts and products for everyday use.',
    interests: 'Sustainability, Crafting, Marketing, Design'
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" /> Save Changes
            </>
          ) : (
            <>
              <PencilIcon className="h-4 w-4" /> Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="text-2xl">AJ</AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer"
                >
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <Upload className="h-4 w-4" />
                </label>
              )}
            </div>
            
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold">{formData.name}</h2>
              <p className="text-muted-foreground">{formData.school}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Summer 2025
                </Badge>
                <Badge variant="outline">
                  {formData.grade}
                </Badge>
              </div>
            </div>
            
            <div className="sm:ml-auto flex flex-col gap-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Project: </span>
                <span className="font-medium">{formData.schoolProject}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Joined: </span>
                <span>April 2023</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="personal">
        <TabsList className="w-full grid grid-cols-3 md:w-auto">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="school">School Project</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                {isEditing ? 'Edit your personal details below' : 'Your personal details and contact information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
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
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
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
                  <Label htmlFor="grade">Grade</Label>
                  {isEditing ? (
                    <Input 
                      id="grade" 
                      value={formData.grade} 
                      onChange={(e) => handleInputChange('grade', e.target.value)} 
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      {formData.grade}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="school">School Name</Label>
                {isEditing ? (
                  <Input 
                    id="school" 
                    value={formData.school} 
                    onChange={(e) => handleInputChange('school', e.target.value)} 
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <School className="h-4 w-4 text-muted-foreground" />
                    {formData.school}
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
                    <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
                    {formData.address}
                  </div>
                )}
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  {isEditing ? (
                    <Input 
                      id="parentName" 
                      value={formData.parentName} 
                      onChange={(e) => handleInputChange('parentName', e.target.value)} 
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {formData.parentName}
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                  {isEditing ? (
                    <Input 
                      id="parentPhone" 
                      value={formData.parentPhone} 
                      onChange={(e) => handleInputChange('parentPhone', e.target.value)} 
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {formData.parentPhone}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea 
                    id="bio" 
                    value={formData.bio} 
                    onChange={(e) => handleInputChange('bio', e.target.value)} 
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="text-sm">
                    {formData.bio}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="school" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Project Information</CardTitle>
              <CardDescription>
                Details about your school entrepreneurship project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="schoolProject">Project Name</Label>
                {isEditing ? (
                  <Input 
                    id="schoolProject" 
                    value={formData.schoolProject} 
                    onChange={(e) => handleInputChange('schoolProject', e.target.value)} 
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <School className="h-4 w-4 text-muted-foreground" />
                    {formData.schoolProject}
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                {isEditing ? (
                  <Textarea 
                    id="projectDescription" 
                    value={formData.projectDescription} 
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)} 
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="text-sm">
                    {formData.projectDescription}
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="interests">Interests & Skills</Label>
                {isEditing ? (
                  <Input 
                    id="interests" 
                    value={formData.interests} 
                    onChange={(e) => handleInputChange('interests', e.target.value)} 
                    placeholder="e.g. Marketing, Design, Technology (comma separated)"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.split(',').map((interest, index) => (
                      <Badge key={index} variant="outline" className="bg-muted">
                        {interest.trim()}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Project Logo</h3>
                  {isEditing && (
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center justify-center border rounded-md p-8 bg-muted/20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-muted rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">EC</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Project logo not uploaded</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>
                A summary of your project metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">$520</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Customers</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Tasks</p>
                  <p className="text-2xl font-bold">95%</p>
                </div>
                <div className="border rounded-md p-4 text-center">
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="text-2xl font-bold">100%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documents</span>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Important documents and certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex items-center">
                  <div className="p-2 bg-primary/10 rounded-md mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Project Plan.pdf</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        May 15, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        2.4 MB
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border rounded-md p-4 flex items-center">
                  <div className="p-2 bg-primary/10 rounded-md mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Certificate of Completion.pdf</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        July 30, 2023
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        2.1 MB
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
