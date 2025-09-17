import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Brain,
  Send,
  Mic,
  MicOff,
  Heart,
  Lightbulb,
  Zap,
  Moon,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  type: "user" | "companion";
  timestamp: Date;
  mood?: "supportive" | "alert" | "encouraging" | "relaxing";
}

const companionSuggestions = [
  {
    icon: Heart,
    text: "How are you feeling today?",
    mood: "supportive" as const,
  },
  {
    icon: Lightbulb,
    text: "Try a 5-minute breathing exercise",
    mood: "encouraging" as const,
  },
  {
    icon: Zap,
    text: "Let's do some gentle stretches",
    mood: "encouraging" as const,
  },
  {
    icon: Moon,
    text: "Prepare for rest cycle",
    mood: "relaxing" as const,
  },
];

export function AICompanion() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm ARIA, your AI wellness companion. I'm here to support your mental health and help you thrive during your mission. How are you feeling today?",
      type: "companion",
      timestamp: new Date(),
      mood: "supportive",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how challenging it can be in space. Remember, you're doing incredibly important work. Would you like to try a quick mindfulness exercise?",
        "Your biometric data shows you might benefit from some relaxation. I've prepared a personalized breathing exercise for you.",
        "It's completely normal to feel isolated sometimes. You're part of an amazing team, even when you're far from Earth. Let's focus on something positive.",
        "I've noticed some stress indicators. Would you like me to guide you through a VR meditation session?",
        "Your sleep patterns suggest you might need some rest. Shall we prepare for your sleep cycle with some calming activities?",
      ];

      const companionMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        type: "companion",
        timestamp: new Date(),
        mood: "supportive",
      };

      setMessages((prev) => [...prev, companionMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: typeof companionSuggestions[0]) => {
    sendMessage(suggestion.text);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const moodColors = {
    supportive: "text-accent",
    alert: "text-warning",
    encouraging: "text-success",
    relaxing: "text-primary",
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-gradient-cosmic">
              <AvatarFallback className="bg-transparent text-primary-foreground">
                <Brain className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">ARIA</CardTitle>
              <p className="text-sm text-muted-foreground">
                AI Wellness Companion
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            Online
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 transition-all duration-300",
                    message.type === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.type === "companion" && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className={cn("h-4 w-4", moodColors[message.mood || "supportive"])} />
                      <span className="text-xs font-medium">ARIA</span>
                      {message.mood && (
                        <Badge variant="outline" className="text-xs">
                          {message.mood}
                        </Badge>
                      )}
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-accent animate-pulse" />
                    <span className="text-sm">ARIA is typing...</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        <div className="border-t border-border p-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {companionSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto p-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-xs truncate">{suggestion.text}</span>
                </Button>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Share your thoughts..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage(inputValue);
                }
              }}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={toggleListening}
              className={cn(
                "transition-colors duration-300",
                isListening && "bg-accent text-accent-foreground"
              )}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="bg-gradient-cosmic"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}