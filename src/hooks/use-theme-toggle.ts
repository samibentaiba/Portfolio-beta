import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const updateUserTheme = async (newTheme: string) => {
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (err) {
      console.error("Failed to update theme on server:", err);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateUserTheme(newTheme);
  };

  return {
    theme,
    handleThemeChange,
  };
};
