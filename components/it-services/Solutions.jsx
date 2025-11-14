import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const solutions = [
  {
    title: 'SWIFT CSP - 2FA Web Access',
    description:
      'Secure your critical Financial Alliance Web portal with two-factor authentication (2FA) enabled and stay compliant with SWIFT CSP mandatory guidelines.',
    icons: ['🔴', '🌐', '📱'],
  },
  {
    title: 'SWIFT Infrastructure Security',
    description:
      'Protect your central SWIFT systems by enabling only authorized terminal server-based access, secured with robust two-factor authentication (2FA).',
    icons: ['🌐', '🪟', '📱'],
  },

  {
    title: 'Web-Based Password Reset',
    description:
      'Deploy an effective, web-based Self Service Password Reset solution secured by 2FA for all your users protected by strong authentication.',
    icons: ['🔒', '🌍', '📱'],
  },
  {
    title: 'RADIUS Client Authentication',
    description:
      'Integrate and secure all your existing RADIUS clients with our custom 2FA solution built specifically upon the standard RADIUS protocol.',
    icons: ['🔴', '📱'],
  },
  {
    title: 'Windows Password Reset',
    description:
      "Deploy a streamlined, Windows-based Self Service Password Reset solution for your organization's users that is secured with two-factor authentication (2FA).",
    icons: ['🔒', '🪟', '📱'],
  },
  {
    title: 'User Management & Auditing',
    description:
      'Implement centralized user management, provisioning, and de-provisioning, ensuring full visibility and access control for compliance and security auditing.',
    icons: ['🌐', '🔒', '📱'],
  },
];

export const Solutions = () => {
  return (
    <section className="py-16 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Network & IT Security Solutions
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Metrix Engineering Services has developed several specialized IT
            security and digital solutions for our clients, as listed below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-2 mb-4 text-3xl">
                  {solution.icons.map((icon, i) => (
                    <span key={i}>{icon}</span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">
                  {solution.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                  {solution.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="default" size="sm">
                    View More
                  </Button>
                  {/* <Button variant="secondary" size="sm">
                    Demo
                  </Button> */}
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
