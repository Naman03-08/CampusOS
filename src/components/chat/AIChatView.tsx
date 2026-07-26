import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Copy, Check, BookOpen, RefreshCw, Zap } from 'lucide-react';
import { ChatMessage } from '../../types';
import { StructuredResponseFormatter } from './StructuredResponseFormatter';

export const AIChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello! I am your Personal Assistant. Ask me any question, academic proof, coding debug, or task guidance!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Token saving and word limit settings (default true)
  const [limitWords, setLimitWords] = useState<boolean>(() => {
    const cached = localStorage.getItem('campus_os_chat_limit_words');
    return cached !== 'false'; // defaults to true
  });
  const [autoNewChat, setAutoNewChat] = useState<boolean>(() => {
    const cached = localStorage.getItem('campus_os_chat_auto_new');
    return cached !== 'false'; // defaults to true
  });
  const [tokensSaved, setTokensSaved] = useState<number>(() => {
    const cached = localStorage.getItem('campus_os_chat_tokens_saved');
    return cached ? parseInt(cached, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('campus_os_chat_limit_words', limitWords.toString());
  }, [limitWords]);

  useEffect(() => {
    localStorage.setItem('campus_os_chat_auto_new', autoNewChat.toString());
  }, [autoNewChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const hasPreviousUserMsg = messages.some((m) => m.sender === 'user');
    let activeMessages = [...messages];

    if (autoNewChat && hasPreviousUserMsg) {
      // Calculate words & approximate tokens saved from discarded history
      const discardedText = messages.map((m) => m.text).join(' ');
      const discardedWords = discardedText.trim().split(/\s+/).filter(Boolean).length;
      const approxTokens = Math.round(discardedWords * 1.33);

      if (approxTokens > 0) {
        setTokensSaved((prev) => {
          const newVal = prev + approxTokens;
          localStorage.setItem('campus_os_chat_tokens_saved', newVal.toString());
          return newVal;
        });
      }

      // Automatically reset and start a fresh session with the new question
      const initialMsg = messages[0] || {
        id: 'm1',
        sender: 'ai',
        text: 'Hello! I am your Personal Assistant. Ask me any question, academic proof, coding debug, or advice!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      activeMessages = [initialMsg, userMsg];
      setMessages([initialMsg, userMsg]);
    } else {
      activeMessages = [...messages, userMsg];
      setMessages((prev) => [...prev, userMsg]);
    }

    const promptToSend = inputText;
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          limitWords,
          history: activeMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: data.reply || 'Here is the step-by-step explanation.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    'Explain Dijkstra\'s algorithm step-by-step',
    'Derive the time complexity of QuickSort',
    'How do I calculate page faults in FIFO vs LRU?',
    'Give me 5 practice viva questions for DBMS',
  ];

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[550px] flex flex-col bg-white/90 backdrop-blur-xl rounded-3xl border border-white/90 shadow-3d card-3d overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 px-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white flex items-center justify-between border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-indigo-700 flex items-center justify-center text-white font-black shadow-3d-indigo shrink-0">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="font-black text-sm sm:text-base text-white tracking-tight">CampusOS Personal Assistant</h2>
            <p className="text-[11px] text-blue-300 font-bold">Your Autonomous Personal AI Assistant & Tutor</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Token-Saving Settings Banner */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
          <span className="font-bold text-slate-700">Token-Saver Optimization Settings</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={limitWords}
              onChange={(e) => setLimitWords(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="font-semibold text-slate-600 hover:text-slate-800 transition-colors">Strict Word Cap (&lt;1000 Words)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoNewChat}
              onChange={(e) => setAutoNewChat(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="font-semibold text-slate-600 hover:text-slate-800 transition-colors">Auto-New Chat on Second Question</span>
          </label>
          {tokensSaved > 0 && (
            <div className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 font-extrabold flex items-center gap-1 shrink-0">
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span>Saved: ~{tokensSaved.toLocaleString()} API Tokens</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/60">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 max-w-3xl ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-2xl font-black text-xs flex items-center justify-center shrink-0 shadow-3d-sm ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5 text-amber-300" />}
            </div>

            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 shadow-3d-sm relative group ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
              }`}
            >
              {m.sender === 'user' ? (
                <div className="whitespace-pre-wrap font-sans">{m.text}</div>
              ) : (
                <StructuredResponseFormatter content={m.text} />
              )}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/30 text-[10px] opacity-80 font-bold">
                <span>{m.timestamp}</span>
                {m.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(m.id, m.text)}
                    className="p-1 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-3d-sm">
              <Bot className="w-4.5 h-4.5 text-amber-300 animate-bounce" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-3d-sm text-xs font-bold text-slate-600 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>CampusOS AI is thinking and formulating step-by-step solution...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-3 px-6 bg-slate-100/90 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto text-[11px] font-extrabold text-slate-600">
        <span className="text-slate-400 shrink-0 uppercase tracking-wider font-black">Quick Prompts:</span>
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => {
              setInputText(qp);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-slate-200/90 shadow-2xs shrink-0 transition-all cursor-pointer font-bold"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask any question, derive proofs, debug code, or request exam strategies..."
          className="flex-1 px-4 py-3.5 text-xs sm:text-sm font-semibold rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white shadow-inner transition-all"
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md btn-3d-blue disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
