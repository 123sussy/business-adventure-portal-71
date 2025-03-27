
import React from 'react';
import { cn } from '@/lib/utils';

type UserAvatarProps = {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
  className?: string;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const UserAvatar = ({
  name,
  image,
  size = 'md',
  status,
  className
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  return (
    <div className="relative">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center bg-primary/10 text-primary font-medium",
          sizeClasses[size],
          className
        )}
      >
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      
      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3',
            {
              'bg-success': status === 'online',
              'bg-gray-400': status === 'offline',
              'bg-warning': status === 'away',
            }
          )}
        />
      )}
    </div>
  );
};

export default UserAvatar;
