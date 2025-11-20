'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactSupport = () => {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div>
            <h1>Contact Support</h1>
            <p className="text-muted-foreground">Get help from our support team</p>
          </div>
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Subject</Label>
                <Input className="mt-2" placeholder="Brief description of your issue" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea className="mt-2" placeholder="Describe your issue in detail" rows={6} />
              </div>
              <Button className="w-full mt-4">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ContactSupport;
