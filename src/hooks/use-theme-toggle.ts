import { useTheme } from "next-themes";

export const useThemeToggle = () => {
  const { setTheme, theme } = useTheme();



  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return {
    theme,
    handleThemeChange,
  };
};
