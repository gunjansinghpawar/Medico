"use client";

import { usePathname } from "next/navigation";
import ChatInput from "@/components/ChatInput";

export default function ConditionalChatInput() {
  const pathname = usePathname();

  // Chat input should NOT show on /chat or any sub-route of it
  const isHidden = pathname.startsWith("/chat");

  return !isHidden ? <ChatInput /> : null;
}
