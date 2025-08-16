import {create} from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "aqua", //this is to bring the theme in the loacl storage, if not
    // return default theme which is aqua.
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme); //first set default theme in localhost
        set({theme: theme}); //this is to change the theme to the new theme.
    },
}));

//we will be saving the selected theme to the localhost here so when users leave the page, it will be there on reload.