
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, BarChart3, Calendar } from 'lucide-react';
import SalesChart from '@/components/student/SalesChart';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock sales data for 30 days
const generateMockSalesData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // More sales on weekends and random spikes
    let amount = 0;
    
    if (date.getDay() === 0 || date.getDay() === 6) {
      // Weekends have higher sales
      amount = Math.floor(Math.random() * 40) + 20;
    } else {
      // Weekdays
      amount = Math.floor(Math.random() * 25) + 5;
    }
    
    // Add some spikes
    if (Math.random() > 0.85) {
      amount += Math.floor(Math.random() * 50) + 20;
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      amount
    });
  }
  
  return data;
};

const generateMonthlySalesData = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  return months.map(month => ({
    date: month,
    amount: Math.floor(Math.random() * 300) + 100
  }));
};

// Mock data
const mockDailySales = generateMockSalesData();
const mockMonthlySales = generateMonthlySalesData();

const salesTransactions = [
  { id: 1, customer: 'John Smith', product: 'Eco-friendly Notebook', amount: 25, date: '2023-10-15' },
  { id: 2, customer: 'Emily Johnson', product: 'Bamboo Pen Set', amount: 18, date: '2023-10-14' },
  { id: 3, customer: 'Michael Lee', product: 'Recycled Paper Journal', amount: 22, date: '2023-10-12' },
  { id: 4, customer: 'Sophia Garcia', product: 'Eco-friendly Notebook', amount: 25, date: '2023-10-10' },
  { id: 5, customer: 'David Wilson', product: 'Sustainable Pencil Case', amount: 15, date: '2023-10-08' },
  { id: 6, customer: 'Emma Rodriguez', product: 'Bamboo Pen Set', amount: 18, date: '2023-10-05' },
  { id: 7, customer: 'James Brown', product: 'Recycled Paper Journal', amount: 22, date: '2023-10-03' },
  { id: 8, customer: 'Olivia Martinez', product: 'Sustainable Pencil Case', amount: 15, date: '2023-10-01' },
];

const Sales = () => {
  const [period, setPeriod] = useState('daily');
  const totalEarnings = salesTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sales</h1>
        <Select defaultValue="daily" onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              <div className="text-2xl font-bold">${totalEarnings}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="text-2xl font-bold">{salesTransactions.length}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              <div className="text-2xl font-bold">
                ${(totalEarnings / salesTransactions.length).toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <SalesChart 
        data={period === 'daily' ? mockDailySales : mockMonthlySales} 
        title={`${period === 'daily' ? 'Daily' : 'Monthly'} Sales History`}
        description={`Your ${period} sales performance over time`}
      />
      
      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Product</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {salesTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/20">
                    <td className="p-4 align-middle">{transaction.customer}</td>
                    <td className="p-4 align-middle">{transaction.product}</td>
                    <td className="p-4 align-middle">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 align-middle text-right font-medium">${transaction.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <Button variant="outline">View All Transactions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
