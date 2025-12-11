import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Conversation from './components/Conversation';

type Mode = 'dashboard' | 'conversation';

function App() {
  const [mode, setMode] = useState<Mode>('dashboard');

  return (
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
  );
}

export default App;
