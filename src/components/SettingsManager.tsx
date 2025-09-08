import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SettingsManager() {
  const [settings, setSettings] = useState({
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    defaultFromNumber: '+19296596292',
    enableAutoResponse: true,
    enableCallLogging: true,
    maxMessageLength: 160,
    responseDelay: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Mock saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Settings Saved',
        description: 'Your configuration has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
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
          <Settings className="h-5 w-5" />
          System Settings
        </CardTitle>
        <CardDescription>
          Configure your Twilio integration and system preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Twilio Configuration</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="account-sid">Account SID</Label>
              <Input
                id="account-sid"
                type="password"
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={settings.twilioAccountSid}
                onChange={(e) => setSettings({...settings, twilioAccountSid: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="auth-token">Auth Token</Label>
              <Input
                id="auth-token"
                type="password"
                placeholder="Your Twilio Auth Token"
                value={settings.twilioAuthToken}
                onChange={(e) => setSettings({...settings, twilioAuthToken: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="from-number">Default From Number</Label>
              <Input
                id="from-number"
                placeholder="+1234567890"
                value={settings.defaultFromNumber}
                onChange={(e) => setSettings({...settings, defaultFromNumber: e.target.value})}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">System Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Response</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically send text messages after call completion
                </p>
              </div>
              <Switch
                checked={settings.enableAutoResponse}
                onCheckedChange={(checked) => setSettings({...settings, enableAutoResponse: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Call Logging</Label>
                <p className="text-sm text-muted-foreground">
                  Log all incoming calls to the database
                </p>
              </div>
              <Switch
                checked={settings.enableCallLogging}
                onCheckedChange={(checked) => setSettings({...settings, enableCallLogging: checked})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-length">Max Message Length</Label>
              <Input
                id="max-length"
                type="number"
                min="1"
                max="1600"
                value={settings.maxMessageLength}
                onChange={(e) => setSettings({...settings, maxMessageLength: parseInt(e.target.value)})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="response-delay">Response Delay (seconds)</Label>
              <Input
                id="response-delay"
                type="number"
                min="0"
                max="300"
                value={settings.responseDelay}
                onChange={(e) => setSettings({...settings, responseDelay: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              'Saving...'
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}