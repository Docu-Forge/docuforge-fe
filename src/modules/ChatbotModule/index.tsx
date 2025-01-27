'use client'
import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { User } from "@/types/User";
import { set } from "date-fns";
import { CornerDownLeft } from "lucide-react";
import { createRef, useState } from "react";
import chat from "@/lib/OpenAI";
import { ChatCompletion } from "openai/resources/index.mjs";
import ReactMarkdown from "react-markdown";

interface ChatbotModuleProps {
    user: User;
}


export const ChatbotModule = ({ user }:ChatbotModuleProps) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{input:string, response:string}[]>([]);
    const chatInputRef = createRef<HTMLTextAreaElement>();
    const handleInput = async ()=>{
        if(input === '') return;
        setMessages((prevMessages) => [...prevMessages, {input: input, response: 'loading'}]);
        const responses = await chat(input);
        const dummyResponse = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        setInput('');
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), {input: input, response: responses.message.content as string}]);
        // setMessages((prevMessages) => [...prevMessages.slice(0, -1), {input: input, response: dummyResponse}]);
    }
    return (
        <div className="flex flex-col px-20 h-screen pt-20 pb-6">
            <h1 className="bg-gradient-to-r hidden lg:block from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent font-bold text-2xl mb-2">AI Chat Assistant</h1>
            <style>
                {`
                    * {
                        // border: 1px solid red;
                    }
                `}
            </style>
            <ChatMessageList className="flex min-h-[calc(100%-100px)] justify-start max-h-[calc(100%-100px)] border rounded-lg" autoFocus>
                {messages.map((message, index) => (
                    <ChatMessageList className="h-fit" key={index}>
                        <ChatBubble variant='sent'>
                            <ChatBubbleAvatar user={user} />
                            <ChatBubbleMessage variant='sent'>
                                <ReactMarkdown>
                                    {message.input}
                                </ReactMarkdown>
                            </ChatBubbleMessage>
                        </ChatBubble>

                        <ChatBubble variant='received'>
                            <ChatBubbleAvatar />
                            {message.response === 'loading' ? (<ChatBubbleMessage isLoading/>) : 
                                (<ChatBubbleMessage variant='received'>
                                    <ReactMarkdown>
                                        {message.response}
                                    </ReactMarkdown>
                                </ChatBubbleMessage>
                            )}
                            
                        </ChatBubble>
                    </ChatMessageList>
                ))}
            </ChatMessageList>
            <div className="flex gap-2 absolute bottom-0 self-center w-full px-20 pb-8 pt-0 bg-white">
                <ChatInput
                    placeholder="Type your prompt here..."
                    className="min-h-12"
                    onChange={(e) => setInput(e.target.value)}
                    ref={chatInputRef}
                />
                <div className="flex items-center">
                    <Button
                        size="sm"
                        className="ml-auto gap-1.5 h-12"
                        onClick={ ()=>{ handleInput(); 
                            if (chatInputRef.current) {
                            chatInputRef.current.value = '';
                        } }}
                        variant="blue"
                    >
                        Ask AI
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}