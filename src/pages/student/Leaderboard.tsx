
import React, { useState, useEffect } from 'react';
import { Trophy, Filter, Search, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UserAvatar from '@/components/ui-custom/UserAvatar';

// Mock data
const studentLeaderboard = [
  { id: 1, name: 'Alex Johnson', points: 1250, earnings: 345, school: 'Lincoln High School', rank: 1, nationalRank: 15 },
  { id: 2, name: 'Samantha Lee', points: 1100, earnings: 290, school: 'Washington Academy', rank: 2, nationalRank: 23 },
  { id: 3, name: 'Miguel Santos', points: 950, earnings: 210, school: 'Riverside Prep', rank: 3, nationalRank: 42 },
  { id: 4, name: 'Emma Wilson', points: 900, earnings: 185, school: 'Oakwood High', rank: 4, nationalRank: 56 },
  { id: 5, name: 'Jayden Brown', points: 850, earnings: 170, school: 'Lincoln High School', rank: 5, nationalRank: 78 },
  { id: 6, name: 'Sophia Chen', points: 820, earnings: 165, school: 'Westlake Academy', rank: 6, nationalRank: 95 },
  { id: 7, name: 'Ethan Miller', points: 780, earnings: 140, school: 'Riverside Prep', rank: 7, nationalRank: 112 },
  { id: 8, name: 'Olivia Davis', points: 750, earnings: 120, school: 'Washington Academy', rank: 8, nationalRank: 143 },
  { id: 9, name: 'Noah Garcia', points: 700, earnings: 110, school: 'Oakwood High', rank: 9, nationalRank: 187 },
  { id: 10, name: 'Ava Martinez', points: 650, earnings: 95, school: 'Westlake Academy', rank: 10, nationalRank: 203 },
];

const mentorLeaderboard = [
  { id: 1, name: 'Jennifer Smith', points: 2200, students: 12, rating: 4.9, rank: 1 },
  { id: 2, name: 'David Chen', points: 2050, students: 10, rating: 4.8, rank: 2 },
  { id: 3, name: 'Sarah Johnson', points: 1950, students: 11, rating: 4.7, rank: 3 },
  { id: 4, name: 'Michael Lee', points: 1850, students: 9, rating: 4.8, rank: 4 },
  { id: 5, name: 'Emma Rodriguez', points: 1700, students: 8, rating: 4.6, rank: 5 },
  { id: 6, name: 'James Wilson', points: 1650, students: 7, rating: 4.7, rank: 6 },
  { id: 7, name: 'Sophia Nguyen', points: 1600, students: 8, rating: 4.5, rank: 7 },
  { id: 8, name: 'Robert Garcia', points: 1550, students: 6, rating: 4.8, rank: 8 },
];

// Current user data (for highlighting and showing in the top stats)
const currentUserId = 7; // Ethan Miller

const StudentLeaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Find the current user in the leaderboard
    const foundUser = studentLeaderboard.find(student => student.id === currentUserId);
    setCurrentUser(foundUser);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };

  const filteredStudents = studentLeaderboard.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Trophy size={24} className="text-accent" />
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <Button variant="outline" size="icon" onClick={toggleFilters}>
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* User's rank highlight card */}
      {currentUser && (
        <Card className="bg-primary/5 border-primary/20 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {currentUser.rank}
                </div>
                <div>
                  <h3 className="font-medium">Your Ranking</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.name} • {currentUser.points} points
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-muted-foreground">National Rank</p>
                <p className="text-xl font-bold">#{currentUser.nationalRank}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {filterVisible && (
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="school">School</Label>
                <Input id="school" placeholder="All Schools" />
              </div>
              
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="All Cities" />
              </div>
              
              <div>
                <Label htmlFor="age">Age Group</Label>
                <Input id="age" placeholder="All Ages" />
              </div>
              
              <div>
                <Label htmlFor="type">Achievement Type</Label>
                <Input id="type" placeholder="All Types" />
              </div>
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" size="sm">Reset</Button>
              <Button size="sm">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Student Leaderboard</CardTitle>
          <CardDescription>Based on points earned from sales and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 py-3 px-4 font-medium border-b bg-muted/50">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-4 sm:col-span-3">Student</div>
              <div className="col-span-4 hidden sm:block">School</div>
              <div className="col-span-2 hidden md:block text-right">National Rank</div>
              <div className="col-span-3 sm:col-span-2 text-right">Points</div>
              <div className="col-span-4 sm:col-span-2 text-right">Earnings</div>
            </div>
            
            {filteredStudents.map((student) => (
              <div 
                key={student.id}
                className={`grid grid-cols-12 py-3 px-4 items-center border-b last:border-0 hover:bg-muted/20 transition-colors ${student.id === currentUserId ? 'bg-primary/5' : ''}`}
              >
                <div className="col-span-1 text-center font-semibold">
                  {student.rank <= 3 ? (
                    <div className={`
                      w-6 h-6 mx-auto rounded-full flex items-center justify-center text-white
                      ${student.rank === 1 ? 'bg-yellow-500' : 
                        student.rank === 2 ? 'bg-gray-400' : 'bg-amber-700'}
                    `}>
                      {student.rank}
                    </div>
                  ) : (
                    student.rank
                  )}
                </div>
                <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
                  <UserAvatar 
                    name={student.name} 
                    size="sm" 
                    highlight={student.id === currentUserId}
                  />
                  <span className="font-medium truncate">{student.name}</span>
                </div>
                <div className="col-span-4 hidden sm:block truncate">{student.school}</div>
                <div className="col-span-2 hidden md:block text-right font-semibold">#{student.nationalRank}</div>
                <div className="col-span-3 sm:col-span-2 text-right font-semibold">{student.points}</div>
                <div className="col-span-4 sm:col-span-2 text-right text-success font-semibold">${student.earnings}</div>
              </div>
            ))}
            
            {filteredStudents.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No students found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLeaderboard;
