import { Children, createContext, useState } from "react";
import { useSelector } from "react-redux";

export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("Light");
  const notes = useSelector((state) => state.note.data);
  const filteredNotes = notes.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleTheme = () => {
    return setTheme((prev) => {
      return prev == "Light" ? "Dark" : "Light";
    });
  };
  console.log(theme);

  return (
    <ThemeContext.Provider
      value={{ filteredNotes, search, setSearch, theme, handleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
