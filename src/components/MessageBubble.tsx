"use client";

import React from "react";
import { User, Heart } from "lucide-react";
import { format } from "date-fns";
import { useChat } from "@/contexts/ChatContext";

interface Tool {
  type: string;
  [key: string]: any;
}

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  messageType?: string;
}

interface MessageBubbleProps {
  message: Message;
}

// ToolRenderer (same as before)
const ToolRenderer: React.FC<{ tool: Tool }> = ({ tool }) => {
  const { sendMessage } = useChat();

  const handleClick = (value: string) => {
    sendMessage(value, "text");
  };

  switch (tool.type) {
    case "button":
      return (
        <button
          onClick={() => handleClick(tool.label)}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            tool.variant === "primary"
              ? "bg-blue-600 hover:bg-blue-500"
              : tool.variant === "secondary"
              ? "bg-gray-600 hover:bg-gray-500"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {tool.label}
        </button>
      );

    case "list":
      return (
        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 my-2">
          {tool.title && <h3 className="font-semibold text-gray-200 mb-2">{tool.title}</h3>}
          <ul className="list-inside text-gray-300 space-y-1">
            {tool.items.map((item: string, idx: number) =>
              tool.ordered ? (
                <li key={idx} className="list-decimal">{item}</li>
              ) : (
                <li key={idx} className="list-disc">{item}</li>
              )
            )}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto my-2">
          {tool.title && <h3 className="font-semibold text-gray-200 mb-2">{tool.title}</h3>}
          <table className="w-full border border-gray-700 rounded-lg">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                {tool.columns.map((col: string, idx: number) => (
                  <th key={idx} className="px-3 py-2 border border-gray-600 text-left">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tool.rows.map((row: string[], rowIdx: number) => (
                <tr key={rowIdx} className="text-gray-300">
                  {row.map((cell: string, cellIdx: number) => (
                    <td key={cellIdx} className="px-3 py-2 border border-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "suggestions":
      return (
        <div className="flex flex-wrap gap-2 my-2">
          {tool.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              onClick={() => handleClick(opt)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-200"
            >
              {opt}
            </button>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  console.log("Messages:",message);
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp);

  let contentHTML = message.content;
  let tools: Tool[] = [];

  const toolsMarker = "TOOLS:";

  if (!isUser && message.content.includes(toolsMarker)) {
    const [contentJson, toolsJson] = message.content.split(toolsMarker);
    try {
      const parsedContent = JSON.parse(contentJson.trim());
      const contentText = parsedContent.CONTENT?.trim() || "";

      // ✅ Do not render fallback message
      if (contentText === "Sorry, main sirf health-related queries ka answer de sakta hoon.") {
        contentHTML = "";
      } else {
        contentHTML = contentText;
      }

      tools = JSON.parse(toolsJson.trim());
    } catch (err) {
      console.error("❌ Failed to parse CONTENT or TOOLS JSON:", err);
    }
  }

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-600" : "bg-gradient-to-r from-pink-500 to-red-500"
        }`}
      >
        {isUser ? <User size={16} className="text-white" /> : <Heart size={16} className="text-white" />}
      </div>

      {/* Message */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        {contentHTML && (
          <div className={`rounded-2xl px-4 py-3 ${isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}>
            <div
              className="whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          </div>
        )}

        {/* Render tools */}
        {!isUser && tools.length > 0 && (
          <div className="w-full mt-2 space-y-2">
            {tools.map((tool, i) => (
              <ToolRenderer key={i} tool={tool} />
            ))}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-1 px-2">{format(timestamp, "HH:mm")}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
