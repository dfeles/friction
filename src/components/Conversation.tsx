import { useState, useRef, useEffect } from 'react';
import { Feather, MessageCircle, UserX, Flame, Sword } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Product {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ConversationProps {
  onClose: () => void;
}

const Conversation = ({ onClose }: ConversationProps) => {
  // Apple Watch product data
  const product: Product = {
    name: 'Apple Watch Series 9',
    price: '$399',
    description: 'The most advanced Apple Watch yet, featuring a brighter display, faster S9 SiP chip, and new Double Tap gesture.',
    image: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-pink-aluminum-Sport-Band-pink-230912_inline.jpg.large_2x.jpg',
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Look, I know you're thinking about getting the ${product.name}, but I really think you should reconsider. Do you actually need another device to track your steps? You already have your phone for that.`,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showBossModeDropdown, setShowBossModeDropdown] = useState(false);
  const [intensityLevel, setIntensityLevel] = useState('Stubborn Friend');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const intensityLevels = [
    { value: 'Gentle Nudge', description: 'Just a friendly reminder', icon: Feather },
    { value: 'Friendly Debate', description: 'Let\'s talk this through', icon: MessageCircle },
    { value: 'Stubborn Friend', description: 'I really think you should reconsider', icon: UserX },
    { value: 'Devil\'s Advocate', description: 'But have you considered...', icon: Flame },
    { value: 'Hardcore Steelmanning', description: 'I will destroy your arguments', icon: Sword },
  ];

  const currentLevel = intensityLevels.find((level) => level.value === intensityLevel);
  const CurrentIcon = currentLevel?.icon || UserX;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBossModeDropdown(false);
      }
    };

    if (showBossModeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBossModeDropdown]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: `I received your message: "${input}". This is a placeholder response.`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const handleVoiceRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // TODO: Process voice input
    } else {
      // Start recording
      setIsRecording(true);
      // TODO: Start voice recording
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-50">
      {/* Product Details Header */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4 flex-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-medium">{product.name}</h2>
                <span className="text-slate-400">{product.price}</span>
              </div>
              <p className="text-sm text-slate-400">{product.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-50 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] px-2 py-1 ${
                message.sender === 'user'
                  ? 'bg-slate-800 text-slate-50'
                  : 'bg-slate-900 text-slate-300'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Cursor Style */}
      <div className="bg-slate-950 p-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-800">
          {/* Text Input Area */}
          <div className="p-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-transparent text-slate-50 placeholder-slate-500 resize-none focus:outline-none text-sm"
              style={{ minHeight: '24px', maxHeight: '200px' }}
            />
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-slate-800">
            {/* Left Side - Selectors */}
            <div className="flex items-center gap-2 relative" ref={dropdownRef}>
              <button
                onClick={() => setShowBossModeDropdown(!showBossModeDropdown)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors"
              >
                <CurrentIcon className="w-3.5 h-3.5" />
                <span>{intensityLevel}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${showBossModeDropdown ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showBossModeDropdown && (
                <div className="absolute bottom-full left-0 mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 w-[320px]">
                  {intensityLevels.map((level) => {
                    const LevelIcon = level.icon;
                    return (
                      <button
                        key={level.value}
                        onClick={() => {
                          setIntensityLevel(level.value);
                          setShowBossModeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg flex items-center gap-3 ${
                          intensityLevel === level.value
                            ? 'bg-slate-700 text-slate-50'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-slate-50'
                        }`}
                      >
                        <LevelIcon className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-medium">{level.value}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{level.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Side - Action Icons and Send Button */}
            <div className="flex items-center gap-2">
              {/* Action Icons */}
              <button className="p-1.5 text-slate-400 hover:text-slate-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>

              {/* Send Button - Mic or Paperplane (same size) */}
              {input.trim() ? (
                <button
                  onClick={handleSend}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-50 rounded-full transition-colors"
                  title="Send"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleVoiceRecord}
                  className={`p-3 rounded-full transition-colors ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-50'
                  }`}
                  title="Voice input"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

