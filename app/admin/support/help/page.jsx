'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const HelpCenter = () => {
  const faqs = [
    { id: 1, question: "How to create a new project?", answer: "Navigate to Projects > All Projects and click 'New Project' button." },
    { id: 2, question: "How to manage inventory?", answer: "Go to Inventory Management section to add, edit, or delete items." },
    { id: 3, question: "How to track project progress?", answer: "Use the Project Progress page to monitor all project phases." },
  ];

  return (
    
      <div className="flex min-h-screen w-full">
       
        <main className="flex-1 overflow-auto">
        
          <div className="p-6 space-y-6">
            <div>
              <h1>Help Center</h1>
              <p className="text-muted-foreground">Frequently asked questions</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
   
  );
};

export default HelpCenter;
