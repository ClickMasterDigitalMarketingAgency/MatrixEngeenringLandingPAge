'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone } from "lucide-react";

const Clients = () => {
  const clients = [
    { id: 1, name: "ABC Corporation", contact: "Robert Smith", email: "robert@abc.com", phone: "+1234567890", projects: 3, status: "Active" },
    { id: 2, name: "XYZ Industries", contact: "Sarah Johnson", email: "sarah@xyz.com", phone: "+1234567891", projects: 2, status: "Active" },
  ];

  return (
   
      <div className="flex min-h-screen w-full">
      
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          
            <h1 className="text-lg font-semibold">Clients</h1>
          </header>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Clients</h2>
              <p className="text-muted-foreground">Manage client relationships</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                      </div>
                      <Badge>{client.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">Contact: <span className="font-medium">{client.contact}</span></p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Badge variant="secondary">{client.projects} Active Projects</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
  
  );
};

export default Clients;
