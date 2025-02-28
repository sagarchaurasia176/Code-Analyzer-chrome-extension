export const MODELS: { model: string; name: Model; display: string }[] = [
    {
      model: "gemini-1.5-flash",
      name: "gemini_1.5_flash",
      display: "Gemini 1.5 Flash",
    },
    {
      model: "claude-3-haiku-20240307",
      name: "claude_3_haiku",
      display: "Claude 3 Haiku",
    },
  ];
  
  /**
   * Type of valid models that can be used in the application.
   */
  export type Model =| "gemini_1.5_flash" | "claude_3_haiku"
  