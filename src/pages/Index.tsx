import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PhoneNumbersManager } from '@/components/PhoneNumbersManager';
import { TextBlastManager } from '@/components/TextBlastManager';
import { CallLogsManager } from '@/components/CallLogsManager';
import { Phone, MessageSquare, BarChart3, Settings, Activity } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('numbers');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Twilio Call Management</h1>
            <p className="text-muted-foreground">
              Manage your phone numbers, campaigns, and call analytics
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="numbers" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Numbers
            </TabsTrigger>
            <TabsTrigger value="blast" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Text Blast
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Call Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="numbers" className="space-y-6">
            <PhoneNumbersManager />
          </TabsContent>

          <TabsContent value="blast" className="space-y-6">
            <TextBlastManager />
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <CallLogsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;