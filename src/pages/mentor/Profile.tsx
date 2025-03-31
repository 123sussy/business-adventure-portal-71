
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileUpload, Mail, Phone, User, MapPin, Briefcase, Calendar, BookOpen, Award, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MentorProfile = () => {
  // Initial profile state
  const [profile, setProfile] = useState({
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Business mentor with 10+ years of experience in entrepreneurship and startup coaching. Specializing in marketing strategy and business development.",
    jobTitle: "Business Coach & Entrepreneur",
    yearsExperience: 10,
    education: "MBA, Harvard Business School",
    specializations: ["Business Strategy", "Marketing", "Entrepreneurship"],
    achievements: ["Founded 3 successful startups", "Published author", "Guest lecturer at NYU"]
  });
  
  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profile});
  
  // Handle input changes when editing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };
  
  // Save profile changes
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated"
    });
  };
  
  // Cancel editing and revert changes
  const handleCancel = () => {
    setEditedProfile({...profile});
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={profile.name} />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.jobTitle}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{profile.location}</span>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Experience
              </h3>
              <p className="text-sm">{profile.yearsExperience} years</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Education
              </h3>
              <p className="text-sm">{profile.education}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          {isEditing ? (
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={editedProfile.location}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle"
                    name="jobTitle"
                    value={editedProfile.jobTitle}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input 
                    id="yearsExperience"
                    name="yearsExperience"
                    type="number"
                    value={editedProfile.yearsExperience}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input 
                    id="education"
                    name="education"
                    value={editedProfile.education}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>{profile.bio}</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.specializations.map((spec, index) => (
                        <span 
                          key={index}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Achievements
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {profile.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Class Statistics</CardTitle>
          <CardDescription>Your mentoring activity and impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Total Batches</p>
              <p className="text-2xl font-bold">4</p>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Students Mentored</p>
              <p className="text-2xl font-bold">76</p>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Sessions Conducted</p>
              <p className="text-2xl font-bold">124</p>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Avg. Student Rating</p>
              <p className="text-2xl font-bold">4.8/5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;
