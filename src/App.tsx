import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Conversation from './components/Conversation';
import { UserProvider } from './contexts/UserContext';

type Mode = 'dashboard' | 'conversation';

function App() {
  const [mode, setMode] = useState<Mode>('dashboard');

  return (
    <UserProvider>
      <div className="h-screen flex flex-col bg-slate-950">
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {mode === 'dashboard' ? (
            <Dashboard onNavigateToConversation={() => setMode('conversation')} />
          ) : (
            <Conversation onClose={() => setMode('dashboard')} />
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
