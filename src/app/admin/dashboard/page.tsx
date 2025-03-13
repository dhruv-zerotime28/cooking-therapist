"use client";

import { Card } from '@/components/ui/card';
import {
  BookOpen,
  Tags,
  FolderTree,
  MessageSquare,
  TrendingUp,
  Users,
} from 'lucide-react';

const stats = [
  {
    name: 'Total Recipes',
    value: '124',
    icon: BookOpen,
    trend: '+12% from last month',
  },
  {
    name: 'Active Tags',
    value: '38',
    icon: Tags,
    trend: '+4 new tags',
  },
  {
    name: 'Categories',
    value: '15',
    icon: FolderTree,
    trend: 'All categories active',
  },
  {
    name: 'New Messages',
    value: '9',
    icon: MessageSquare,
    trend: '3 unread messages',
  },
  {
    name: 'Monthly Visitors',
    value: '12.5k',
    icon: Users,
    trend: '+18% from last month',
  },
  {
    name: 'Engagement Rate',
    value: '64%',
    icon: TrendingUp,
    trend: '+7% from last month',
  },
];

export default function AdminDashboard() {
  return (
    <div className='w-full p-4 m-2'>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Amy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
