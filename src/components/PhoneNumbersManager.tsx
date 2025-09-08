import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Copy, Phone, FileAudio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NumberMapping, mockNumberMappings } from '@/services/api';

export function PhoneNumbersManager() {
  const [numbers, setNumbers] = useState<NumberMapping[]>(mockNumberMappings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    phone_number: '',
    text_content: '',
    audio_file: null as File | null,
  });

  const handleAddNumber = async () => {
    if (!formData.phone_number || !formData.text_content || !formData.audio_file) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock adding number
      const newNumber: NumberMapping = {
        id: numbers.length + 1,
        phone_number: formData.phone_number,
        audio_url: `https://example.com/audio${numbers.length + 1}.mp3`,
        text_content: formData.text_content,
        created_at: new Date().toISOString(),
      };

      setNumbers([...numbers, newNumber]);
      setFormData({ phone_number: '', text_content: '', audio_file: null });
      setIsDialogOpen(false);

      toast({
        title: 'Success',
        description: 'Phone number added successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add phone number.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicate = (number: NumberMapping) => {
    const duplicated: NumberMapping = {
      ...number,
      id: numbers.length + 1,
      phone_number: '',
      created_at: new Date().toISOString(),
    };
    
    setNumbers([...numbers, duplicated]);
    toast({
      title: 'Campaign Duplicated',
      description: 'Campaign template has been duplicated. Update the phone number.',
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, audio_file: file });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Phone Numbers Management
            </CardTitle>
            <CardDescription>
              Manage your Twilio phone numbers and their associated campaigns
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Number
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Phone Number</DialogTitle>
                <DialogDescription>
                  Configure a new Twilio phone number with audio and text content.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1234567890"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="audio">Audio File</Label>
                  <Input
                    id="audio"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="text">Follow-up Text Message</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter the text message to send after the call..."
                    value={formData.text_content}
                    onChange={(e) => setFormData({ ...formData, text_content: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddNumber} disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Number'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phone Number</TableHead>
              <TableHead>Text Content</TableHead>
              <TableHead>Audio</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {numbers.map((number) => (
              <TableRow key={number.id}>
                <TableCell>
                  <Badge variant="secondary">{number.phone_number}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {number.text_content}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileAudio className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Audio file</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(number.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDuplicate(number)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}