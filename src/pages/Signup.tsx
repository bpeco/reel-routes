import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import bgAuth from '@/assets/bg-auth.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="mobile-container min-h-screen flex flex-col relative overflow-hidden">
      {/* Background image */}
      <img
        src={bgAuth}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient fade to solid at bottom for form readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />

      {/* Header */}
      <div className="relative z-10 p-4 safe-top">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/welcome')}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      <div className="relative z-10 flex-1 px-6 py-4 flex flex-col">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg">
            Create account
          </h1>
          <p className="text-white/80 drop-shadow-md">
            Start planning unforgettable trips
          </p>
        </motion.div>

        {/* Form card with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6 shadow-float"
        >
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-12 bg-background/80"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 bg-background/80"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 bg-background/80"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Terms */}
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{' '}
              <span className="text-primary">Terms of Service</span> and{' '}
              <span className="text-primary">Privacy Policy</span>
            </p>

            {/* Submit */}
            <Button variant="sunset" size="lg" className="w-full mt-2" type="submit">
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 bg-background/80">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" className="flex-1 bg-background/80">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Apple
            </Button>
          </div>
        </motion.div>

        {/* Login link */}
        <p className="text-center text-sm text-white/80 mt-8 drop-shadow-md">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-white font-semibold underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
