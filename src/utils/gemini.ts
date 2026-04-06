import { supabase } from "@/integrations/supabase/client";

export const callGemini = async (
  userMessage: string,
  chatHistory: Array<{ role: string; text: string }>
) => {
  const { data, error } = await supabase.functions.invoke("gemini-chat", {
    body: {
      userMessage,
      chatHistory,
    },
  });

  const responseData = data as { message?: string; error?: string } | null;

  if (error || responseData?.error) {
    throw new Error(responseData?.error || error?.message || "No response from Gemini");
  }

  if (!responseData?.message) {
    throw new Error("No response from Gemini");
  }

  return responseData.message;
};
