
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Bell, 
  Lock, 
  Upload, 
  PencilIcon, 
  Save,
  LogOut
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 (555) 987-6543',
    role: 'Administrator',
    department: 'Management',
    bio: 'System administrator responsible for overall platform management and operations.',
    notifyNewTeacher: true,
    notifyNewBatch: true,
    notifySystemAlerts: true,
    theme: 'system',
    language: 'en'
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
        <h1 className="text-2xl font-bold">Admin Profile</h1>
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
                <AvatarFallback className="text-2xl">AU</AvatarFallback>
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
              <p className="text-muted-foreground">{formData.role}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs text-primary font-medium">Administrator Access</span>
              </div>
            </div>
            
            <div className="sm:ml-auto">
              <Button 
                variant="outline" 
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                {isEditing ? 'Edit your profile information below' : 'Your personal and contact details'}
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
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <Input 
                      id="role" 
                      value={formData.role} 
                      onChange={(e) => handleInputChange('role', e.target.value)} 
                      disabled
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      {formData.role}
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <Input 
                      id="department" 
                      value={formData.department} 
                      onChange={(e) => handleInputChange('department', e.target.value)} 
                    />
                  ) : (
                    <div className="text-sm">
                      {formData.department}
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
        
        <TabsContent value="account" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Configure your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  {isEditing ? (
                    <Select 
                      defaultValue={formData.theme}
                      onValueChange={(value) => handleInputChange('theme', value)}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm capitalize">
                      {formData.theme}
                    </div>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  {isEditing ? (
                    <Select 
                      defaultValue={formData.language}
                      onValueChange={(value) => handleInputChange('language', value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm">
                      {formData.language === 'en' ? 'English' : 
                       formData.language === 'es' ? 'Español' : 'Français'}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notification Preferences
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-teacher">New Teacher Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified when a new teacher is added to the platform
                    </div>
                  </div>
                  <Switch 
                    id="new-teacher"
                    checked={formData.notifyNewTeacher}
                    onCheckedChange={(checked) => handleSwitchChange('notifyNewTeacher', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-batch">New Batch Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified when a new batch is created
                    </div>
                  </div>
                  <Switch 
                    id="new-batch"
                    checked={formData.notifyNewBatch}
                    onCheckedChange={(checked) => handleSwitchChange('notifyNewBatch', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <div className="text-sm text-muted-foreground">
                      Get notified about important system alerts and updates
                    </div>
                  </div>
                  <Switch 
                    id="system-alerts"
                    checked={formData.notifySystemAlerts}
                    onCheckedChange={(checked) => handleSwitchChange('notifySystemAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline">
                    Update
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">
                    Setup
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Login Sessions</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">View and manage your active login sessions</p>
                  </div>
                  <Button variant="outline">
                    View
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4 text-destructive">Danger Zone</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">
                    Delete
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

export default AdminProfile;
