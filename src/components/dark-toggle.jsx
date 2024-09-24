import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // On initial render, get the user's theme preference from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = (newTheme) => {
    // Remove the old theme class and add the new one
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    // Update the theme in state and localStorage
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <button
        onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
        className="outline-none"
      >
        {theme === "light" ? (
          <Sun className="h-[2.15rem] w-[2.15rem]" />
        ) : (
          <Moon className="h-[2.15rem] w-[2.15rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
};

export default DarkModeToggle;
