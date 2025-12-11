import { useState, useRef, useEffect } from 'react';
import { Feather, MessageCircle, UserX, Flame, Sword, X } from 'lucide-react';

interface CancelledPurchase {
  id: number;
  name: string;
  price: string;
  reason: string;
  image: string;
  isLogo?: boolean;
}

interface DashboardProps {
  onNavigateToConversation: () => void;
}

const Dashboard = ({ onNavigateToConversation }: DashboardProps) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBossModeDropdown, setShowBossModeDropdown] = useState(false);
  const [intensityLevel, setIntensityLevel] = useState('Stubborn Friend');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const intensityLevels = [
    { value: 'Gentle Nudge', description: 'Just a friendly reminder', icon: Feather },
    { value: 'Friendly Debate', description: 'Let\'s talk this through', icon: MessageCircle },
    { value: 'Stubborn Friend', description: 'I really think you should reconsider', icon: UserX },
    { value: 'Devil\'s Advocate', description: 'But have you considered...', icon: Flame },
    { value: 'Hardcore Steelmanning', description: 'I will destroy your arguments', icon: Sword },
  ];

  const currentLevel = intensityLevels.find((level) => level.value === intensityLevel);
  const CurrentIcon = currentLevel?.icon || UserX;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [searchQuery]);

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

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowSignInPopup(false);
      }
    };

    if (showSignInPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSignInPopup]);

  const handleCreateFriction = () => {
    if (isSignedIn) {
      onNavigateToConversation();
    } else {
      setShowSignInPopup(true);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowSignInPopup(false);
  };

  const handleLogout = () => {
    setIsSignedIn(false);
  };

  const cancelledPurchases: CancelledPurchase[] = [
    {
        id: 1,
        name: 'Apple Watch Series 9',
        price: '$399',
        reason: 'Not Needed',
        image: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-the-advanced-new-apple-watch-series-9/article/Apple-Watch-S9-pink-aluminum-Sport-Band-pink-230912_inline.jpg.large_2x.jpg',
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5',
      price: '$399',
      reason: 'Too Expensive',
      image: 'https://images.topgear.com.ph/topgear/images/2022/12/31/sony-wh-1000xm5-03-1672468069.jpg',
    },
    {
      id: 3,
      name: 'Netflix',
      price: '$15.99/mo',
      reason: 'Too Expensive',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png',
      isLogo: true,
    },
    {
      id: 4,
      name: 'Logitech G Pro X',
      price: '$149',
      reason: 'Impulse Buy',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gamespot.com%2Fa%2Fuploads%2Foriginal%2F1574%2F15747411%2F4142368-logitechgprox2wirelessgamingheadsetreview.jpg&f=1&nofb=1&ipt=1f79b7902323d0488456bff427dd8dfc4e6290c371eb35fb4d2f4dea681a074f',
    },
    {
      id: 5,
      name: 'Spotify Premium',
      price: '$9.99/mo',
      reason: 'Redundant service',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/512px-Spotify_logo_without_text.svg.png',
      isLogo: true,
    },
  ];

  const totalSaved = 1228;
  const longestArgument = { hours: 2, minutes: 15 };
  const strongestReason = 'Impulse Buy';

  // Landing page sections data
  const landingSections = [
    {
      title: 'Can you reason for it?',
      description: 'Do you really need it?',
    },
    {
      title: 'Choose your fighter',
      description: 'Pick your intensity level and let Friction challenge your purchase decision.',
    },
    {
      title: 'See what you\'ve saved',
      description: 'Track every purchase you avoided. Watch the numbers grow. Feel the satisfaction.',
    },
  ];

  return (
    <div className="h-full bg-slate-950 text-slate-50 overflow-y-auto relative">
      {/* Sign In Popup */}
      {showSignInPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-slate-50">Sign In</h2>
              <button
                onClick={() => setShowSignInPopup(false)}
                className="text-slate-400 hover:text-slate-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-400 mb-6">
              Sign in to start creating friction and tracking your cancelled purchases.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleSignIn}
                className="w-full px-4 py-3 bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium rounded-full transition-colors"
              >
                Sign in with Google
              </button>
              <button
                onClick={handleSignIn}
                className="w-full px-4 py-3 bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium rounded-full transition-colors"
              >
                Sign in with Email
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto p-4 space-y-12">
        {/* Header above input box */}
        <div className="flex flex-col items-center justify-center space-y-2 max-w-lg mx-auto">
          <img 
            src="/friction.png" 
            alt="Friction" 
            className="w-24 h-24 object-contain"
          />
          <div className="text-2xl font-medium text-slate-50">Friction</div>
          <div className="text-base text-slate-400 text-center">
            Introducing friction, for your next purchase
          </div>
        </div>

        {/* Block 1: Create Friction Input Box */}
        <div className="space-y-2">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto">
            {/* Text Input Area */}
            <div className="p-3">
              <textarea
                ref={textareaRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Product you want to buy..."
                className="w-full bg-transparent text-slate-950 placeholder-slate-400 resize-none focus:outline-none text-base leading-tight"
              />
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-slate-200">
              {/* Left Side - Boss Mode Selector */}
              <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowBossModeDropdown(!showBossModeDropdown)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors"
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
                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 w-[320px]">
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
                              ? 'bg-slate-100 text-slate-950'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                          }`}
                        >
                          <LevelIcon className="w-4 h-4 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="font-medium">{level.value}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{level.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Side - Create Friction Button */}
              <button
                onClick={handleCreateFriction}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white text-sm font-medium rounded-full transition-colors"
              >
                Create friction
              </button>
            </div>
          </div>
        </div>

        {isSignedIn ? (
          // Logged In View - Current Dashboard
          <>
            {/* Block 2: Stats */}
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                {/* Total Saved */}
                <div className="bg-slate-900 p-6">
                  <h3 className="text-sm text-slate-400 mb-2">Total $ saved</h3>
                  <div className="text-3xl font-medium">${totalSaved}</div>
                </div>

                {/* Longest Argument */}
                <div className="bg-slate-900 p-6">
                  <h3 className="text-sm text-slate-400 mb-2">Longest argument</h3>
                  <div className="text-3xl font-medium">
                    {longestArgument.hours}h {longestArgument.minutes}min
                  </div>
                </div>

                {/* Strongest Reason */}
                <div className="bg-slate-900 p-6">
                  <h3 className="text-sm text-slate-400 mb-2">Strongest reason</h3>
                  <div className="text-3xl font-medium">{strongestReason}</div>
                </div>
              </div>
            </div>

            {/* Block 3: Latest Cancelled Purchases */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium">
                Latest <strong className="text-red-500">cancelled</strong> purchases
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {cancelledPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="bg-slate-900 p-6 flex flex-col items-center justify-center"
                  >
                    <div className="relative mb-3">
                      <img
                        src={purchase.image}
                        alt={purchase.name}
                        className={`w-32 h-32 ${
                          purchase.isLogo ? 'object-contain' : 'object-cover rounded'
                        }`}
                      />
                      <div className="absolute -top-1 -right-1 bg-slate-50 text-red-500 text-xs px-1.5 py-0.5 rounded">
                        {purchase.reason}
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="text-sm font-medium">{purchase.name}</div>
                      <div className="text-xs text-slate-400">{purchase.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <div className="flex justify-center pb-8">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-full transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          // Signed Out View - Landing Page with 3 Sections
          <>
            {/* Section 1: Can you reason for it? */}
            <div className="space-y-2">
              <div className="p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Apple Watch Card */}
                  <div className="p-8 rounded-2xl flex flex-col items-center justify-center">
                    <div className="relative mb-4">
                      <img
                        src={cancelledPurchases[0].image}
                        alt={cancelledPurchases[0].name}
                        className="w-48 h-48 object-cover rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2 bg-slate-50 text-red-500 text-xs px-2 py-1 rounded">
                        {cancelledPurchases[0].reason}
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="text-lg font-medium mb-1">{cancelledPurchases[0].name}</div>
                      <div className="text-sm text-slate-400">{cancelledPurchases[0].price}</div>
                    </div>
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-6 text-slate-200">{landingSections[0].title}</h2>
                    {/* Message Bubble */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] px-4 py-3 bg-slate-900 text-slate-300 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">
                          Your phone already tells time, tracks fitness, and sends notifications—why strap another screen to your wrist that you'll charge every night and upgrade in two years?{'\n\n'}Do you really need the {cancelledPurchases[0].name}?
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1.5: Chrome Extension */}
            <div className="space-y-2">
              <div className="p-12">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4 text-slate-200 text-center">
                      A Chrome extension that pops up when you're filling credit card details
                    </h3>
                    <p className="text-lg text-slate-400 mb-6 text-center">
                      Right at the moment of purchase, Friction challenges your decision
                    </p>
                    
                    {/* Credit Card Form Illustration */}
                    <div className="relative bg-slate-800 rounded-xl p-6 border border-slate-700">
                      {/* Rotated Popup Message */}
                      <div className="absolute bottom-4 right-4 z-10 transform rotate-[-8deg]">
                        <div className="bg-white text-slate-900 px-4 py-3 rounded-lg shadow-lg">
                          <p className="text-sm font-medium whitespace-nowrap">Can you reason for it?</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 pointer-events-none opacity-50">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value="4242 4242 4242 4242"
                            disabled
                            className="w-full px-3 py-2 border border-slate-600 rounded-md text-slate-400 text-sm bg-slate-900 cursor-not-allowed"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value="12/25"
                              disabled
                              className="w-full px-3 py-2 border border-slate-600 rounded-md text-slate-400 text-sm bg-slate-900 cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              value="123"
                              disabled
                              className="w-full px-3 py-2 border border-slate-600 rounded-md text-slate-400 text-sm bg-slate-900 cursor-not-allowed"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value="John Doe"
                            disabled
                            className="w-full px-3 py-2 border border-slate-600 rounded-md text-slate-400 text-sm bg-slate-900 cursor-not-allowed"
                          />
                        </div>
                        <button 
                          disabled
                          className="w-full py-3 bg-slate-700 text-slate-500 text-sm font-medium rounded-md cursor-not-allowed"
                        >
                          Complete Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Choose your fighter - with intensity levels */}
            <div className="space-y-2">
              <div className="p-12">
                <h2 className="text-4xl font-bold mb-6 text-slate-200 text-center">{landingSections[1].title}</h2>
                <p className="text-lg text-slate-400 mb-8 text-center">{landingSections[1].description}</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {intensityLevels.map((level) => {
                    const LevelIcon = level.icon;
                    return (
                      <div
                        key={level.value}
                        className="p-6 rounded-xl flex flex-col items-center text-center border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <LevelIcon className="w-8 h-8 text-slate-500 mb-3" />
                        <div className="text-sm font-medium text-slate-300 mb-1">{level.value}</div>
                        <div className="text-xs text-slate-500">{level.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: See what you've saved */}
            <div className="space-y-2">
              <div className="p-12 text-center">
                <h2 className="text-4xl font-bold mb-4 text-slate-200">{landingSections[2].title}</h2>
                <p className="text-lg text-slate-400">{landingSections[2].description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

