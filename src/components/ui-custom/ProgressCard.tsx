
import React from 'react';
import { cn } from '@/lib/utils';

type ProgressCardProps = {
  title: string;
  value: number;
  maxValue: number;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const ProgressCard = ({
  title,
  value,
  maxValue,
  icon,
  color = 'primary',
  className,
  size = 'md',
}: ProgressCardProps) => {
  const percentage = Math.min(Math.round((value / maxValue) * 100), 100);
  
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div className={cn(
      "glass-card rounded-xl hover-card",
      sizeClasses[size],
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        {icon && (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            `bg-${color}/10 text-${color}`
          )}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="progress-bar">
        <div 
          className={cn("progress-bar-fill", colorClasses[color])} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-sm">
        <span className="font-medium">{value} / {maxValue}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressCard;
