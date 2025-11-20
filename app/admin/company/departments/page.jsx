'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

const Departments = () => {
  const departments = [
    { id: 1, name: "Engineering", head: "John Doe", employees: 25, projects: 8 },
    { id: 2, name: "Operations", head: "Jane Smith", employees: 15, projects: 5 },
    { id: 3, name: "Safety", head: "Mike Johnson", employees: 8, projects: 12 },
  ];

  return (
  
      <div className="flex min-h-screen w-full">
      
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
         
            <h1 className="text-lg font-semibold">Departments</h1>
          </header>
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Departments</h2>
              <p className="text-muted-foreground">Manage company departments</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => (
                <Card key={dept.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Head:</span>
                        <span className="font-medium">{dept.head}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Employees:</span>
                        <Badge variant="secondary">{dept.employees}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Projects:</span>
                        <Badge variant="default">{dept.projects}</Badge>
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

export default Departments;
