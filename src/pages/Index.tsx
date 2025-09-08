import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PhoneNumbersManager } from '@/components/PhoneNumbersManager';
import { TextBlastManager } from '@/components/TextBlastManager';
import { CallLogsManager } from '@/components/CallLogsManager';
import { SettingsManager } from '@/components/SettingsManager';
import { Phone, MessageSquare, BarChart3, Settings, Activity } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('numbers');

  // Mock stats
  const stats = {
    totalNumbers: 2,
    totalCalls: 3,
    uniqueCallers: 3,
    messagesBlasted: 0,
  };

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
          <Badge variant="outline" className="px-3 py-1">
            <Activity className="mr-2 h-4 w-4" />
            System Active
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Phone Numbers</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNumbers}</div>
              <p className="text-xs text-muted-foreground">
                Active campaigns
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCalls}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Callers</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueCallers}</div>
              <p className="text-xs text-muted-foreground">
                Contact database
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.messagesBlasted}</div>
              <p className="text-xs text-muted-foreground">
                Text blasts sent
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
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
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
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

          <TabsContent value="settings" className="space-y-6">
            <SettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;