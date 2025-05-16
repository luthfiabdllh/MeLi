"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Send, RefreshCw } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { useSession } from "next-auth/react"
import { sendAiMessage, startAiConversation } from "@/app/api/ai/chatai"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function DoctorChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { data: session } = useSession(); 

  // Start conversation when component mounts
    useEffect(() => {
    if (session?.accessToken) {
        startConversation();
    }
    }, [session]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const startConversation = async () => {
    setIsLoading(true);
    setError(null);
    setMessages([]);

    try {
      // Pastikan session tersedia
      if (!session?.accessToken) {
        throw new Error("Not authenticated");
      }
      
      // Panggil fungsi dari chatai.ts
      const response = await startAiConversation(session.accessToken, {});
      
      // Set pesan selamat datang default karena chatai.ts tidak mengembalikan apa-apa
      setMessages([{ 
        role: "assistant", 
        content: "Hello! I'm Dr. MeLi, your AI medical assistant. How can I help you today?" 
      }]);
    } catch (err) {
      console.error("Error starting conversation:", err);
      setError("Failed to connect to the doctor assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const sendMessage = async () => {
  if (!input.trim() || isLoading) return

  const userMessage = input.trim()
  setInput("")
  setIsLoading(true)
  setError(null)

  // Add user message immediately
  setMessages((prev) => [...prev, { role: "user", content: userMessage }])

  try {
    // Pastikan session tersedia
    if (!session?.accessToken) {
      throw new Error("Not authenticated");
    }
    
    // Gunakan fungsi sendAiMessage dari chatai.ts
    const data = await sendAiMessage(session.accessToken, { message: userMessage });
    
    // Tambahkan respons AI ke messages
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
  } catch (err) {
    console.error("Error sending message:", err)
    setError("Failed to get a response. Please try again.")
  } finally {
    setIsLoading(false)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }
}
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="/logo.svg" alt="Doctor" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Dr. MeLi</h2>
            <p className="text-xs text-muted-foreground">AI Medical Assistant</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/logo.svg" alt="Doctor" />
                      <AvatarFallback className="text-xs">MD</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">Dr. Meli</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-slate-100 dark:bg-slate-800">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder.svg?height=24&width=24&text=MD" alt="Doctor" />
                    <AvatarFallback className="text-xs">MD</AvatarFallback>
                  </Avatar>
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your health question..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            <Button onClick={sendMessage} disabled={!input.trim() || isLoading} size="icon">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={startConversation}
              disabled={isLoading}
              title="Reset conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
