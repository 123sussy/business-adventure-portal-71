
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Edit, 
  Save,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

// Mock data
const profileData = {
  name: 'Admin User',
  role: 'Administrator',
  email: 'admin@example.com',
  phone: '(555) 555-5555',
  location: 'New York, NY',
  department: 'Operations',
  position: 'Platform Administrator',
  joinDate: 'January 2022',
  bio: 'System administrator for the OLL Business Bootcamp platform. Responsible for managing users, batches, and overall system operations.'
};

const AdminProfile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    department: profileData.department,
    position: profileData.position,
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
        <h1 className="text-2xl font-bold">Admin Profile</h1>
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
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <ShieldCheck size={16} />
                <span>{profileData.role}</span>
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
                    <Briefcase size={14} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{profileData.department}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Admin Details */}
        <Card className="lg:col-span-2 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <CardTitle>Administrator Details</CardTitle>
            <CardDescription>Your role and responsibilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Position</h3>
                <p className="text-muted-foreground">{profileData.position}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Join Date</h3>
                <p className="text-muted-foreground">{profileData.joinDate}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Biography</h3>
                <p className="text-muted-foreground">{profileData.bio}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Permissions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="bg-muted/50 p-2 rounded-md text-sm">User Management</div>
                  <div className="bg-muted/50 p-2 rounded-md text-sm">Batch Management</div>
                  <div className="bg-muted/50 p-2 rounded-md text-sm">Financial Reports</div>
                  <div className="bg-muted/50 p-2 rounded-md text-sm">Content Moderation</div>
                  <div className="bg-muted/50 p-2 rounded-md text-sm">System Settings</div>
                  <div className="bg-muted/50 p-2 rounded-md text-sm">Analytics Access</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security */}
      <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Password</h3>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Enhance your account security</p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Login History</h3>
                <p className="text-sm text-muted-foreground">View your recent login activity</p>
              </div>
              <Button variant="outline">View History</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your administrator profile information
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
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                value={editedProfile.department}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                value={editedProfile.position}
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
                className="col-span-3"
                rows={4}
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

export default AdminProfile;
