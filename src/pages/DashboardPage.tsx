import { useAuth, useClerk } from '@clerk/clerk-react';
import { LogOut } from 'lucide-react';

function DashboardPage() {
  const { user } = useAuth();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl text-accent-cyan tracking-tight">
          DASHBOARD
        </h1>
        <p className="font-mono text-sm text-zinc-500 mt-2">
          PHASE 2
        </p>
        <p className="font-mono text-xs text-zinc-400 mt-6">
          CLEARANCE GRANTED: {user?.primaryEmailAddress?.emailAddress || 'OPERATOR'}
        </p>
        <button
          onClick={handleSignOut}
          className="mt-8 font-mono text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <LogOut className="w-3 h-3" />
          TERMINATE SESSION
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
