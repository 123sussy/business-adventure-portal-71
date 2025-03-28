
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, DollarSign, Trash2, Calendar, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Interface for sale data
interface Sale {
  id: number;
  amount: number;
  customerSource: string;
  customerType: string;
  proofUrl: string;
  date: Date;
}

// Mock data for sales
const mockSales: Sale[] = [
  { 
    id: 1, 
    amount: 75.00, 
    customerSource: 'family', 
    customerType: 'new', 
    proofUrl: '/placeholder.svg', 
    date: new Date(2023, 6, 5) 
  },
  { 
    id: 2, 
    amount: 150.00, 
    customerSource: 'referral', 
    customerType: 'recurring', 
    proofUrl: '/placeholder.svg', 
    date: new Date(2023, 6, 10) 
  },
  { 
    id: 3, 
    amount: 45.50, 
    customerSource: 'society', 
    customerType: 'new', 
    proofUrl: '/placeholder.svg', 
    date: new Date(2023, 6, 15) 
  },
];

const CustomerSourceOptions = [
  { value: 'friends', label: 'Friends' },
  { value: 'family', label: 'Family' },
  { value: 'society', label: 'Society' },
  { value: 'referral', label: 'Referral' },
  { value: 'other', label: 'Other' },
];

const CustomerTypeOptions = [
  { value: 'new', label: 'New Customer' },
  { value: 'recurring', label: 'Recurring Customer' },
];

const StudentSales = () => {
  const { toast } = useToast();
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [newSale, setNewSale] = useState({
    amount: '',
    customerSource: '',
    customerType: '',
    otherSource: '',
    proofFile: null as File | null
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewSale({ ...newSale, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewSale({ ...newSale, proofFile: e.target.files[0] });
    }
  };

  const handleAddSale = () => {
    // Validate the form
    if (!newSale.amount || !newSale.customerSource || !newSale.customerType || !newSale.proofFile) {
      toast({
        title: "Error",
        description: "Please fill in all fields and upload proof of sale",
        variant: "destructive"
      });
      return;
    }

    // Create new sale object
    const sale: Sale = {
      id: sales.length + 1,
      amount: parseFloat(newSale.amount),
      customerSource: newSale.customerSource === 'other' ? newSale.otherSource : newSale.customerSource,
      customerType: newSale.customerType,
      proofUrl: URL.createObjectURL(newSale.proofFile),
      date: new Date()
    };

    // Add the new sale
    setSales([...sales, sale]);
    
    // Close dialog and reset form
    setDialogOpen(false);
    setNewSale({
      amount: '',
      customerSource: '',
      customerType: '',
      otherSource: '',
      proofFile: null
    });

    toast({
      title: "Sale Added",
      description: `$${sale.amount.toFixed(2)} sale has been recorded.`
    });
  };

  const handleDeleteSale = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id));
    toast({
      title: "Sale Deleted",
      description: "The sale has been removed from your records."
    });
  };

  const getTotalSales = () => {
    return sales.reduce((total, sale) => total + sale.amount, 0);
  };

  const getFilteredSales = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    switch (selectedTab) {
      case 'this-month':
        return sales.filter(sale => {
          const saleMonth = sale.date.getMonth();
          const saleYear = sale.date.getFullYear();
          return saleMonth === currentMonth && saleYear === currentYear;
        });
      case 'all':
      default:
        return sales;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Sales</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              Add New Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Sale</DialogTitle>
              <DialogDescription>
                Record a new sale you've made with your business.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <div className="col-span-3 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="amount"
                    name="amount"
                    className="pl-7"
                    placeholder="0.00"
                    type="number"
                    value={newSale.amount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerSource" className="text-right">
                  Customer Source
                </Label>
                <div className="col-span-3">
                  <Select 
                    onValueChange={(value) => handleSelectChange('customerSource', value)}
                    value={newSale.customerSource}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How did you find the customer?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CustomerSourceOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {newSale.customerSource === 'other' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="otherSource" className="text-right">
                    Specify Source
                  </Label>
                  <Input
                    id="otherSource"
                    name="otherSource"
                    className="col-span-3"
                    placeholder="Please specify"
                    value={newSale.otherSource}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerType" className="text-right">
                  Customer Type
                </Label>
                <div className="col-span-3">
                  <Select 
                    onValueChange={(value) => handleSelectChange('customerType', value)}
                    value={newSale.customerType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="New or recurring customer?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {CustomerTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="proof" className="text-right">
                  Proof of Sale
                </Label>
                <div className="col-span-3">
                  <div className="relative">
                    <Input
                      id="proof"
                      type="file"
                      accept="image/png,image/jpeg,video/mp4"
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      type="button"
                    >
                      <Upload size={16} />
                      {newSale.proofFile ? newSale.proofFile.name : "Upload Proof (.png, .jpg, .mp4)"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Please upload an image or video as proof of your sale
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddSale}>
                Add Sale
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sales Summary Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-medium text-muted-foreground">Total Sales</h2>
              <p className="text-3xl font-bold text-primary">${getTotalSales().toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">From {sales.length} sales</p>
            </div>
            <Button size="sm" variant="outline" className="gap-1" onClick={() => setDialogOpen(true)}>
              <DollarSign size={16} />
              Record New Sale
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>View and manage your recorded sales</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Sales</TabsTrigger>
              <TabsTrigger value="this-month">This Month</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Customer Source</TableHead>
                    <TableHead>Customer Type</TableHead>
                    <TableHead>Proof</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredSales().length > 0 ? (
                    getFilteredSales().map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-muted-foreground" />
                            {format(sale.date, 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${sale.amount.toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{sale.customerSource}</TableCell>
                        <TableCell>
                          {sale.customerType === 'new' ? 'New Customer' : 'Recurring Customer'}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <a href={sale.proofUrl} target="_blank" rel="noopener noreferrer">
                              View Proof
                            </a>
                          </Button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => handleDeleteSale(sale.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No sales found for the selected period.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Sale Button - Fixed at bottom right */}
      <Button 
        onClick={() => setDialogOpen(true)}
        size="icon" 
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus size={24} />
      </Button>
    </div>
  );
};

export default StudentSales;
