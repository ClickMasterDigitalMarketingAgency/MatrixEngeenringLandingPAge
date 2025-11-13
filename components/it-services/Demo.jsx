'use client';

import { Button } from '@/components/ui/button';

export const Demo = () => {
  return (
    <section className="py-16 bg-secondary/30 ">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center my-6 ">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Security Solution Demos
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Here are demonstrations of the core features of our in-house
            developed security and digital solutions.
          </p>
        </div>

        {/* Demo Details */}
        <div className="space-y-10">
          <div className="p-6 rounded-lg  ">
            <h3 className="text-xl font-semibold text-primary mb-3">
              SWIFT CSP - 2FA on Jump Server
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As part of the stringent SWIFT Customer Security Programme (CSP),
              all SWIFT clients must guarantee that access to the SWIFT
              environment incorporates Multi-Factor Authentication (MFA). This
              video demonstrates how Two-Factor Authentication (2FA) can be
              enabled for login to a secure Jump Server for accessing the SWIFT
              infrastructure using our security solutions.
            </p>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              ▶ Watch Demo
            </Button>
          </div>

          <div className="p-6 rounded-lg ">
            <h3 className="text-xl font-semibold text-primary mb-3">
              SWIFT Alliance Access with MFA
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As part of the SWIFT Customer Security Controls Framework (CSCF),
              multifactor authentication must be implemented for operators
              accessing the SWIFT Web GUI. This demonstration shows the seamless
              user experience and enhanced security when accessing the Alliance
              portal secured by our MFA platform.
            </p>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              ▶ Watch Demo
            </Button>
          </div>
        </div>

     
      </div>
    </section>
  );
};
