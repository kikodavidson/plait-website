import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { base44 } from "@/api/base44Client";

const AGENT_NAME = "plait_onboarding";
const GREETING = "I'm here to get you through onboarding fast. Tell me where you're stuck or ask me anything about these steps.";

export default function OnboardingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Subscribe to the conversation to receive streamed assistant responses
  useEffect(() => {
    if (!conversation?.id || subscribed) return;

    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      if (data?.messages) {
        setMessages(data.messages);
        setLoading(false);
      }
    });

    setSubscribed(true);
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [conversation, subscribed]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      let conv = conversation;
      if (!conv) {
        conv = await base44.agents.createConversation({
          agent_name: AGENT_NAME,
          metadata: { source: "meta_onboarding_page" },
        });
        setConversation(conv);

        // Subscribe immediately after creating
        base44.agents.subscribeToConversation(conv.id, (data) => {
          if (data?.messages) {
            setMessages(data.messages);
            setLoading(false);
          }
        });
        setSubscribed(true);
      }

      await base44.agents.addMessage(conv, { role: "user", content: text });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong on my end. Try asking again, or scroll down to the form at the bottom of this page to reach Luke directly." },
      ]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating toggle button with label */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 bg-[#2d2d2d] text-white flex items-center gap-2.5 shadow-lg hover:shadow-xl transition-all rounded-full pl-4 pr-5 py-3.5"
            aria-label="Open Plait Onboarding Assistant"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="font-bold text-sm whitespace-nowrap">Plait Onboarding Assistant</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#2d2d2d] shrink-0">
              <div>
                <p className="text-white font-bold text-sm leading-tight">Plait Onboarding Assistant</p>
                <p className="text-white/50 text-xs mt-0.5">Here to help you get set up</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#2d2d2d] text-white rounded-br-md"
                        : "bg-gray-50 text-[#2d2d2d] rounded-bl-md border border-gray-100"
                    }`}
                  >
                    <ReactMarkdown className="prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3 shrink-0">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full border border-gray-100 pr-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about any step..."
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-[#2d2d2d] focus:outline-none"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-[#2d2d2d] text-white flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}