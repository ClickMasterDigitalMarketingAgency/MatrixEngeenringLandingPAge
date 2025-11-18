'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Github, Linkedin } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ✅ Responsive AnimatedBackground
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated Curvy Lines - Hidden on mobile */}
      <svg
        className="absolute inset-0 w-full h-full hidden sm:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity="0.1"
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Line 1 */}
        <path
          d="M -200 100 Q 200 200, 600 150 T 1400 200 T 2200 100"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
          className="animate-[draw_20s_ease-in-out_infinite]"
        />

        {/* Line 2 */}
        <path
          d="M -100 250 Q 300 300, 700 280 T 1500 320 T 2300 250"
          stroke="url(#gradient2)"
          strokeWidth="2.5"
          fill="none"
          className="animate-[draw_25s_ease-in-out_infinite_reverse]"
        />

        {/* Line 3 */}
        <path
          d="M -150 400 Q 250 500, 650 420 T 1450 480 T 2250 400"
          stroke="url(#gradient3)"
          strokeWidth="2"
          fill="none"
          className="animate-[draw_30s_ease-in-out_infinite]"
        />

        {/* Line 4 */}
        <path
          d="M -100 550 Q 350 600, 750 570 T 1550 620 T 2350 550"
          stroke="url(#gradient1)"
          strokeWidth="2.5"
          fill="none"
          className="animate-[draw_22s_ease-in-out_infinite_reverse]"
        />

        {/* Line 5 */}
        <path
          d="M -200 700 Q 200 800, 600 720 T 1400 780 T 2200 700"
          stroke="url(#gradient2)"
          strokeWidth="3"
          fill="none"
          className="animate-[draw_28s_ease-in-out_infinite]"
        />
      </svg>

      {/* Floating Orbs - Smaller and positioned for mobile */}
      <div className="absolute top-10 left-4 w-40 h-40 sm:top-20 sm:left-10 sm:w-64 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]" />
      <div className="absolute top-20 right-8 w-48 h-48 sm:top-40 sm:right-20 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-10 left-1/4 w-44 h-44 sm:bottom-20 sm:left-1/3 sm:w-72 sm:h-72 bg-indigo-500/10 rounded-full blur-3xl animate-[float_18s_ease-in-out_infinite]" />

      {/* Gradient Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]" />
    </div>
  );
}

const Index = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  // ✅ Sign in form state
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    // TODO: call your real login API here and check response
    const success = true;

    if (success) {
      router.push('/admin/dashboard');
    } else {
      setLoginError('Invalid email or password.');
      console.error('Login failed');
    }
  };

  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen flex items-center justify-center bg-background/80 p-4">
        {/* Main Container - Responsive sizing */}
        <div className="relative w-full max-w-4xl h-auto min-h-[600px] sm:h-[600px] bg-card rounded-3xl shadow-2xl overflow-hidden">
          {/* Mobile Toggle Buttons - Only show on small screens */}
          <div className="sm:hidden flex w-full bg-primary p-4">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                isSignUp
                  ? 'bg-card text-primary shadow-lg'
                  : 'text-card bg-transparent'
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 ${
                !isSignUp
                  ? 'bg-card text-primary shadow-lg'
                  : 'text-card bg-transparent'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Animated Overlay Panel - Hidden on mobile, shown on desktop */}
          <div
            className={`hidden sm:flex absolute top-0 h-full w-1/2 bg-primary z-10 transition-all duration-700 ease-in-out items-center justify-center text-card ${
              isSignUp
                ? 'left-0 rounded-r-[200px]'
                : 'left-1/2 rounded-l-[200px]'
            }`}
          >
            <div className="text-center px-8 lg:px-12">
              {isSignUp ? (
                <div className="animate-fade-in">
                  <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                    Welcome Back!
                  </h2>
                  <p className="mb-6 lg:mb-8 opacity-90 text-sm lg:text-base">
                    Enter your personal details to use all of site features
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSignUp(false)}
                    className="border-2 border-card text-card bg-transparent hover:bg-card hover:text-primary rounded-full px-8 lg:px-12 py-4 lg:py-6 text-sm lg:text-base font-semibold transition-all duration-300"
                  >
                    SIGN IN
                  </Button>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                    Hello, Friend!
                  </h2>
                  <p className="mb-6 lg:mb-8 opacity-90 text-sm lg:text-base">
                    Register with your personal details to use all of site
                    features
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSignUp(true)}
                    className="border-2 border-card text-card bg-transparent hover:bg-card hover:text-primary rounded-full px-8 lg:px-12 py-4 lg:py-6 text-sm lg:text-base font-semibold transition-all duration-300"
                  >
                    SIGN UP
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sign Up Form */}
          <div
            className={`w-full sm:absolute top-0 left-0 sm:w-1/2 h-full flex items-center justify-center p-6 sm:p-12 transition-all duration-700 ${
              isSignUp
                ? 'sm:opacity-0 sm:pointer-events-none hidden sm:block'
                : 'block'
            }`}
          >
            <div className="w-full max-w-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Create Account
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                or use your email for registration
              </p>

              <div className="flex gap-2 sm:gap-3 mb-6 justify-center sm:justify-start">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              <form className="space-y-4">
                <div>
                  <Label htmlFor="signup-name" className="sr-only">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Name"
                      className="pl-10 h-11 sm:h-12 bg-secondary border-0 rounded-lg text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-email" className="sr-only">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-11 sm:h-12 bg-secondary border-0 rounded-lg text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Password"
                      className="pl-10 h-11 sm:h-12 bg-secondary border-0 rounded-lg text-sm sm:text-base"
                    />
                  </div>
                </div>

                <Button className="w-full h-11 sm:h-12 rounded-full bg-primary hover:bg-primary/90 text-card font-semibold text-sm sm:text-base">
                  SIGN UP
                </Button>
              </form>
            </div>
          </div>

          {/* Sign In Form */}
          <div
            className={`w-full sm:absolute top-0 right-0 sm:w-1/2 h-full flex items-center justify-center p-6 sm:p-12 transition-all duration-700 ${
              isSignUp
                ? 'block'
                : 'sm:opacity-0 sm:pointer-events-none hidden sm:block'
            }`}
          >
            <div className="w-full max-w-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Sign in to Account
              </h2>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                or use your email account
              </p>

              <div className="flex gap-2 sm:gap-3 mb-6 justify-center sm:justify-start">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg w-10 h-10 sm:w-12 sm:h-12 border-border hover:bg-secondary"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="signin-email" className="sr-only">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 h-11 sm:h-12 bg-secondary border-0 rounded-lg text-sm sm:text-base"
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signin-password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Password"
                      className="pl-10 h-11 sm:h-12 bg-secondary border-0 rounded-lg text-sm sm:text-base"
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                    />
                  </div>
                </div>

                {loginError && (
                  <p className="text-sm text-red-500">{loginError}</p>
                )}

                <button
                  type="button"
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                >
                  Forgot your password?
                </button>

                <Button
                  type="submit"
                  className="w-full h-11 sm:h-12 rounded-full bg-primary hover:bg-primary/90 text-card font-semibold text-sm sm:text-base"
                >
                  LOG IN
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
