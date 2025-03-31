
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  School,
  Trophy, 
  Edit, 
  Star,
  GraduationCap,
  FileText,
  Check,
  Save
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data
const profileData = {
  name: 'Sarah Johnson',
  role: 'Mentor',
  email: 'sarah.johnson@example.com',
  phone: '(555) 234-5678',
  location: 'Chicago, IL',
  education: 'MBA, Business Administration',
  specialization: 'Entrepreneurship & Marketing',
  experience: '8 years in Business Consulting',
  bio: 'Sarah has extensive experience helping startups and young entrepreneurs develop successful business strategies. She specializes in marketing and product development, with a focus on sustainability and social entrepreneurship.',
  joined: 'March 2022',
  stats: {
    students: 32,
    activeBatches: 3,
    avgRating: 4.8,
    rank: 3,
    nationalRank: 17
  },
  recentActivities: [
    { id: 1, action: 'Reviewed student task', details: 'Business plan for Alex Johnson', date: '2 hours ago' },
    { id: 2, action: 'Conducted session', details: 'Marketing strategies with Batch 2', date: '2 days ago' },
    { id: 3, action: 'Provided feedback', details: 'Product design for Emma Wilson', date: '3 days ago' },
  ]
};

const MentorProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    education: profileData.education,
    specialization: profileData.specialization,
    experience: profileData.experience,
    bio: profileData.bio
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditModalOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
          <Edit size={16} className="mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <Card className="lg:col-span-1 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mb-4">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <h2 className="text-xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground mb-2">{profileData.role}</p>
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(profileData.stats.avgRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : i < profileData.stats.avgRating
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm font-medium ml-1">{profileData.stats.avgRating}</span>
              </div>
              
              <div className="w-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{profileData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{profileData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{profileData.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <School size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Education</p>
                    <p className="text-sm font-medium">{profileData.education}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Briefcase size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-medium">{profileData.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats & Biography */}
        <Card className="lg:col-span-2 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <CardTitle>Mentor Overview</CardTitle>
            <CardDescription>Your performance and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Students</p>
                <p className="text-2xl font-bold">{profileData.stats.students}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Batches</p>
                <p className="text-2xl font-bold">{profileData.stats.activeBatches}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mentor Rank</p>
                <p className="text-2xl font-bold">#{profileData.stats.rank}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">National Rank</p>
                <p className="text-2xl font-bold">#{profileData.stats.nationalRank}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Biography</h3>
                <p className="text-muted-foreground">{profileData.bio}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Specialization</h3>
                <p className="text-muted-foreground">{profileData.specialization}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions and reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profileData.recentActivities.map(activity => (
              <div 
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Check size={14} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                </div>
                <div className="text-xs text-muted-foreground">{activity.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editedProfile.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editedProfile.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editedProfile.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={editedProfile.location}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="education" className="text-right">
                Education
              </Label>
              <Input
                id="education"
                name="education"
                value={editedProfile.education}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialization" className="text-right">
                Specialization
              </Label>
              <Input
                id="specialization"
                name="specialization"
                value={editedProfile.specialization}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Experience
              </Label>
              <Input
                id="experience"
                name="experience"
                value={editedProfile.experience}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Biography
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={editedProfile.bio}
                onChange={handleInputChange}
                rows={4}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveProfile}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MentorProfile;
