
import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Trophy, 
  Edit, 
  ShoppingBag,
  Rocket,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const profileData = {
  name: 'Alex Johnson',
  role: 'Student',
  email: 'alex.johnson@example.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, CA',
  school: 'Lincoln High School',
  grade: '10th Grade',
  business: 'Eco Crafts',
  joined: 'June 2023',
  badges: [
    { id: 1, name: 'First Sale', description: 'Made first product sale', icon: <ShoppingBag size={16} /> },
    { id: 2, name: 'Business Creator', description: 'Created a business plan', icon: <Rocket size={16} /> },
    { id: 3, name: 'Early Bird', description: 'Joined in the first week', icon: <Clock size={16} /> },
    { id: 4, name: 'Rising Star', description: 'Top 10 in leaderboard', icon: <Trophy size={16} /> },
  ],
  stats: {
    sales: 17,
    earnings: 325,
    points: 780,
    rank: 7
  },
  recentActivities: [
    { id: 1, action: 'Made a sale', details: 'Eco-friendly notebook for $25', date: '2 days ago' },
    { id: 2, action: 'Updated business plan', details: 'Added new product line', date: '1 week ago' },
    { id: 3, action: 'Earned badge', details: 'Rising Star badge for reaching top 10', date: '2 weeks ago' },
  ]
};

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button variant="outline" size="sm">
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
              <p className="text-muted-foreground mb-6">{profileData.role}</p>
              
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
                    <p className="text-xs text-muted-foreground">Business</p>
                    <p className="text-sm font-medium">{profileData.business}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm mb-1">Total Sales</p>
                  <p className="text-2xl font-bold">{profileData.stats.sales}</p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm mb-1">Earnings</p>
                  <p className="text-2xl font-bold text-success">${profileData.stats.earnings}</p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm mb-1">Points</p>
                  <p className="text-2xl font-bold text-primary">{profileData.stats.points}</p>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-muted-foreground text-sm mb-1">Rank</p>
                  <p className="text-2xl font-bold text-accent">#{profileData.stats.rank}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for badges and activity */}
          <Tabs defaultValue="badges" className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <TabsList>
              <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy size={18} className="text-accent" />
                    Earned Badges
                  </CardTitle>
                  <CardDescription>
                    Achievements unlocked through the program
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profileData.badges.map(badge => (
                      <div 
                        key={badge.id}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                          {badge.icon}
                        </div>
                        <div>
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/rewards">View All Rewards</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest actions and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.recentActivities.map(activity => (
                      <div 
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                    ))}
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

export default Profile;
