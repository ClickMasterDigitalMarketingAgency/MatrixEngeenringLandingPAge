'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const Teams = () => {
  const teams = [
    { id: 1, name: "Alpha Team", lead: "John Doe", members: 8, project: "Bridge Construction" },
    { id: 2, name: "Beta Team", lead: "Jane Smith", members: 10, project: "Highway Expansion" },
    { id: 3, name: "Gamma Team", lead: "Mike Johnson", members: 6, project: "Building Renovation" },
  ];

  return (
  
      <div className="flex min-h-screen w-full">
      
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          
            <h1 className="text-lg font-semibold">Teams</h1>
          </header>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Teams</h2>
              <p className="text-muted-foreground">Manage project teams</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Card key={team.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Team Lead:</span>
                        <span className="font-medium">{team.lead}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <Badge variant="secondary">{team.members}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project:</span>
                        <span className="font-medium text-xs">{team.project}</span>
                      </div>
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

export default Teams;
