import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockCallLogs } from '@/services/api';

export function TextBlastManager() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get unique phone numbers from call logs
  const uniqueNumbers = [...new Set(mockCallLogs.map(log => log.phone_number))];

  const handleSendBlast = async () => {
    if (!message.trim()) {
      toast({
        title: 'Missing Message',
        description: 'Please enter a message to send.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock sending text blast
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Text Blast Sent!',
        description: `Message sent to ${uniqueNumbers.length} recipients.`,
      });
      setMessage('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send text blast.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Text Blast Manager
        </CardTitle>
        <CardDescription>
          Send messages to all numbers that have called your Twilio numbers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Recipients</p>
            <p className="text-sm text-muted-foreground">{uniqueNumbers.length} unique phone numbers</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="blast-message">Message Content</Label>
          <Textarea
            id="blast-message"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-sm text-muted-foreground">
            {message.length}/160 characters
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recipients Preview:</h4>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
            {uniqueNumbers.map((number, index) => (
              <Badge key={index} variant="outline">
                {number}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSendBlast} 
            disabled={isLoading || !message.trim()}
            className="min-w-32"
          >
            {isLoading ? (
              'Sending...'
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Blast
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}