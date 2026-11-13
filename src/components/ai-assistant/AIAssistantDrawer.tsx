"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Briefcase, 
  Code2, 
  Users, 
  Sparkles, 
  CornerDownLeft 
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { sound } from "@/lib/sound";
import { AIOrbCanvas } from "../three/AIOrbCanvas";
import { ChatMessage } from "@/types";

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

type AssistantMode = "developer" | "recruiter" | "collaboration";

export function AIAssistantDrawer({ isOpen, onClose, onToggle }: AIAssistantDrawerProps) {
  const [mode, setMode] = useState<AssistantMode>("developer");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "assistant",
      content: PORTFOLIO_DATA.aiAssistant.greeting,
      timestamp: "LIVE",
      suggestedQuestions: PORTFOLIO_DATA.aiAssistant.suggestedQuestions.slice(0, 3),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages, loading]);

  // Voice speech synthesis
  const speakText = (text: string) => {
    if (!ttsEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and bullets
      const clean = text.replace(/[*_#•`-]/g, " ");
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  // Voice recognition toggle
  const toggleSpeechRecognition = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use keyboard input.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        sound.playClick();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    sound.playClick();
    const cleanText = userText.trim();
    setInput("");

    const newMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      content: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanText, mode }),
      });

      if (!res.ok) throw new Error("Assistant response failed");

      const data = await res.json();
      sound.playSuccess();

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestedQuestions: data.suggestedQuestions,
        },
      ]);

      speakText(data.reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "assistant",
          content:
            "AMAY AI local telemetry fallback active. Please inquire about Amay's skills, projects (PRIOSORT, RAKSHAK, NOTIFYIQ), or contact details.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => {
              sound.playModalOpen();
              onToggle();
            }}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 border border-purple-500/40 shadow-lg shadow-purple-950/40 hover:border-cyan-400 hover:shadow-cyan-950/40 transition-all duration-300 backdrop-blur-md"
            aria-label="Launch AMAY AI Assistant"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <div className="text-left font-mono">
              <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300">
                AMAY AI
              </span>
              <span className="text-[10px] text-purple-400 block -mt-0.5">
                DIGITAL TWIN v2.5
              </span>
            </div>
            <Bot className="w-4 h-4 text-purple-400 group-hover:text-cyan-300 ml-1 transition-colors" />
          </button>
        )}
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg h-full bg-slate-950 border-l border-purple-500/30 flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-purple-500/20">
              <div className="flex items-center gap-3">
                <AIOrbCanvas isTyping={loading} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold font-mono text-white">
                      AMAY AI // DIGITAL TWIN
                    </h3>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Mode: <span className="font-mono text-cyan-300 uppercase">{mode}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setTtsEnabled(!ttsEnabled);
                  }}
                  className={`p-1.5 rounded transition-colors ${
                    ttsEnabled ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40" : "text-slate-500 hover:text-slate-300"
                  }`}
                  title={ttsEnabled ? "Voice Output Active" : "Voice Output Muted"}
                >
                  {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 bg-slate-900/60 border-b border-purple-500/20 text-xs font-mono">
              <button
                onClick={() => {
                  sound.playClick();
                  setMode("developer");
                }}
                className={`py-2 px-2 flex items-center justify-center gap-1.5 border-b-2 font-semibold transition-colors ${
                  mode === "developer"
                    ? "border-cyan-400 text-cyan-300 bg-purple-950/20"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Developer</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setMode("recruiter");
                }}
                className={`py-2 px-2 flex items-center justify-center gap-1.5 border-b-2 font-semibold transition-colors ${
                  mode === "recruiter"
                    ? "border-purple-400 text-purple-300 bg-purple-950/20"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter</span>
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setMode("collaboration");
                }}
                className={`py-2 px-2 flex items-center justify-center gap-1.5 border-b-2 font-semibold transition-colors ${
                  mode === "collaboration"
                    ? "border-emerald-400 text-emerald-300 bg-purple-950/20"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Collab</span>
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 cyber-grid text-xs">
              {messages.map((m) => {
                const isAssistant = m.sender === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-xl text-slate-200 leading-relaxed font-sans shadow-md ${
                        isAssistant
                          ? "bg-slate-900/90 border border-purple-500/20 rounded-tl-none"
                          : "bg-purple-950/70 border border-purple-500/40 rounded-tr-none text-purple-100"
                      }`}
                    >
                      <div className="whitespace-pre-line">{m.content}</div>
                      <span className="block mt-1 text-[9px] font-mono text-slate-500 text-right">
                        {m.timestamp}
                      </span>
                    </div>

                    {/* Suggested Questions */}
                    {isAssistant && m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                        {m.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-purple-950/50 border border-purple-500/20 hover:border-purple-500/50 text-slate-300 hover:text-purple-200 transition-colors text-left"
                          >
                            ⚡ {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>AMAY AI neural engine synthesizing response...</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Voice & Text Input Bar */}
            <div className="p-3 bg-slate-900/90 border-t border-purple-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="relative flex items-center gap-2"
              >
                {/* Voice Input Toggle Button */}
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isListening
                      ? "bg-red-950 border-red-500 text-red-400 animate-pulse"
                      : "bg-slate-950 border-purple-500/30 text-purple-400 hover:border-cyan-400 hover:text-cyan-300"
                  }`}
                  title={isListening ? "Listening... click to stop" : "Voice input (Speech Recognition)"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask in ${mode} mode (or click mic for voice)...`}
                  className="flex-1 bg-slate-950 border border-purple-500/30 rounded-lg pl-3 pr-10 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 p-1.5 rounded-md text-cyan-400 hover:bg-purple-950/50 disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1.5 px-1">
                <span>Verified knowledge base</span>
                <span>Context-grounded • Voice Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
