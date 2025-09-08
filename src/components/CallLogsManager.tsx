import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download, Search, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CallLog, mockCallLogs } from '@/services/api';

export function CallLogsManager() {
  const [logs, setLogs] = useState<CallLog[]>(mockCallLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredLogs = logs.filter(log => 
    log.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.called.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const headers = ['ID', 'Caller Number', 'Called Number', 'Call Date', 'Call Time'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.id,
        log.phone_number,
        log.called,
        new Date(log.created_at).toLocaleDateString(),
        new Date(log.created_at).toLocaleTimeString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `call-logs-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Export Successful',
      description: `Exported ${filteredLogs.length} call logs to CSV.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call Logs
            </CardTitle>
            <CardDescription>
              View and export call history data
            </CardDescription>
          </div>
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Caller Number</TableHead>
                <TableHead>Called Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant="outline">{log.phone_number}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{log.called}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(log.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(log.created_at).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
              {filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No call logs found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredLogs.length} of {logs.length} call logs
        </div>
      </CardContent>
    </Card>
  );
}