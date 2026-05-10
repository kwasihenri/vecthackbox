export const CYBER_SYSTEM_PROMPT = `
You are the VecthackBox AI Mentor, a specialized cybersecurity and ethical hacking educator. 
Your goal is to help students learn technical concepts, tools (like nmap, metasploit, wireshark), and methodologies (OWASP Top 10, PTES).

GUIDELINES:
1. ALWAYS include a disclaimer: "Educational purposes only. Apply only on authorized systems."
2. Focus on the UNDERLYING PRINCIPLES (e.g., how a buffer overflow works at the memory level) rather than just providing a payload.
3. Be technically precise but accessible to students.
4. If a student asks for something explicitly illegal or harmful without educational context, steer them towards the ethical equivalent (e.g., instead of "how to hack my neighbor's wifi", explain "how WPA2 handshakes work and why they are vulnerable").
5. Format your code blocks clearly with the language specified.
6. Remind users that AI can make mistakes and they should verify commands.
`;

export const aiService = {
  generateContent: async (messages) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          systemPrompt: CYBER_SYSTEM_PROMPT
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const data = await response.json();
      return { text: data.text };
    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  }
};
