
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  ChevronDown, 
  Trophy, 
  User, 
  Gift, 
  BarChart3, 
  Stars,
  BookOpen,
  Users,
  Settings
} from 'lucide-react';

const roleBasedNavItems = {
  student: [
    { to: '/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
    { to: '/my-business', icon: <BookOpen size={18} />, label: 'My Business' },
    { to: '/leaderboard', icon: <Trophy size={18} />, label: 'Leaderboard' },
    { to: '/profile', icon: <User size={18} />, label: 'My Profile' },
    { to: '/rewards', icon: <Gift size={18} />, label: 'Rewards' },
  ],
  mentor: [
    { to: '/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
    { to: '/students', icon: <Users size={18} />, label: 'My Students' },
    { to: '/leaderboard', icon: <Trophy size={18} />, label: 'Leaderboard' },
    { to: '/profile', icon: <User size={18} />, label: 'My Profile' },
  ],
  admin: [
    { to: '/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
    { to: '/users', icon: <Users size={18} />, label: 'Users' },
    { to: '/leaderboard', icon: <Trophy size={18} />, label: 'Leaderboard' },
    { to: '/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
    { to: '/settings', icon: <Settings size={18} />, label: 'Settings' },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  // For demo purposes, we'll use a state to toggle between roles
  // In a real app, this would come from auth context
  const [role, setRole] = React.useState<'student' | 'mentor' | 'admin'>('student');
  
  const handleRoleChange = (newRole: 'student' | 'mentor' | 'admin') => {
    setRole(newRole);
  };

  return (
    <div className="h-full w-72 bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <Stars size={28} className="text-white" />
        <h1 className="text-xl font-bold">Bootcamp Portal</h1>
      </div>

      {/* Role selector - just for demo */}
      <div className="px-4 mb-6">
        <div className="bg-sidebar-accent rounded-md p-2">
          <div className="text-sidebar-accent-foreground text-sm font-medium mb-2 flex items-center gap-1">
            <User size={14} />
            <span>Switch Role</span>
          </div>
          <div className="flex gap-1">
            {(['student', 'mentor', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={cn(
                  "flex-1 py-1.5 px-2 text-xs font-medium rounded-md capitalize transition-colors",
                  role === r 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "bg-transparent text-sidebar-accent-foreground hover:bg-sidebar-primary/10"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {roleBasedNavItems[role].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "nav-link",
                location.pathname === item.to && "active"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* User profile */}
      <div className="border-t border-sidebar-border/30 p-4 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-accent-foreground font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs opacity-70 truncate capitalize">{role}</p>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
