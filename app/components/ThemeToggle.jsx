"use client";

import React, { useEffect, useLayoutEffect } from "react";
import '../styles/toggle.css'

export default function ThemeToggle() {

  // true = use dark mode
  const [theme, setTheme] = React.useState("null");

  function toggleThemePreference() {
    let themeAsBool = theme;
    if (typeof themeAsBool === "string") {
      themeAsBool = (theme === "true");
    }
    setTheme(!themeAsBool);
    const docClassList = document.documentElement.classList;
    if (docClassList.contains("dark-mode")) {
      docClassList.remove("dark-mode");
      docClassList.add("light-mode");
    } else {
      docClassList.remove("light-mode");
      docClassList.add("dark-mode");
    }
  }

  // set initial state for the checkbox and add the initial theme class based on the user's browser preference
  useLayoutEffect(() => {
    if (document.readyState === 'complete') {
      const docClassList = document.documentElement.classList;
      if(!(docClassList.contains("dark-mode") || docClassList.contains("light-mode"))) { 
        const themePrefLocalStorage = window.localStorage.getItem('themePreference');
        // set dark mode variables if user preference is set to dark mode in local storage or browser preference
        // the variable in local storage gets precedence
        if (themePrefLocalStorage === "true" || ((themePrefLocalStorage === null || themePrefLocalStorage === "null") && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add("dark-mode");
            const toggleCheckbox = document.querySelector(".toggle-checkbox");
            toggleCheckbox.checked = true;
            setTheme(true);
        } else {
          docClassList.add("light-mode");
          console.log(themePrefLocalStorage);
          setTheme(false);
        }
      }
    }
  },[]);

  React.useEffect(()=>{
    window.localStorage.setItem('themePreference', theme)
  },[theme])

  return(
    <label className="custom-toggle theme-toggle">
      <input className="toggle-checkbox" type="checkbox" onClick={toggleThemePreference}></input>
      <span className="toggle-button">
        <svg className="toggle-icon toggle-sun" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4.14113" stroke="#000000" strokeWidth="1.91129"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.9556 3.08065C12.9556 2.55286 12.5277 2.125 12 2.125C11.4722 2.125 11.0443 2.55286 11.0443 3.08065L11.0443 5.64078C11.3561 5.59432 11.6753 5.57024 12 5.57024C12.3247 5.57024 12.6438 5.59431 12.9556 5.64076L12.9556 3.08065ZM12.9556 18.3594C12.6438 18.4059 12.3247 18.4299 12 18.4299C11.6753 18.4299 11.3561 18.4058 11.0443 18.3594L11.0443 20.9194C11.0443 21.4471 11.4722 21.875 12 21.875C12.5277 21.875 12.9556 21.4471 12.9556 20.9194L12.9556 18.3594Z" fill="#000000"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.9194 12.9556C21.4471 12.9556 21.875 12.5277 21.875 12C21.875 11.4722 21.4471 11.0443 20.9194 11.0443L18.3592 11.0443C18.4057 11.3561 18.4298 11.6753 18.4298 12C18.4298 12.3247 18.4057 12.6438 18.3592 12.9556L20.9194 12.9556ZM5.6406 12.9556C5.59415 12.6438 5.57008 12.3247 5.57008 12C5.57008 11.6753 5.59416 11.3561 5.64062 11.0443L3.08064 11.0443C2.55286 11.0443 2.125 11.4722 2.125 12C2.125 12.5277 2.55286 12.9556 3.08064 12.9556L5.6406 12.9556Z" fill="#000000"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M18.9828 6.36876C19.356 5.99555 19.356 5.39047 18.9828 5.01727C18.6096 4.64407 18.0045 4.64407 17.6313 5.01727L15.8209 6.82764C16.0743 7.01528 16.3169 7.22391 16.5466 7.45354C16.7762 7.68315 16.9848 7.92581 17.1724 8.17912L18.9828 6.36876ZM8.17898 17.1725C7.92567 16.9849 7.68302 16.7763 7.45341 16.5467C7.22378 16.3171 7.01514 16.0744 6.82751 15.8211L5.01742 17.6311C4.64422 18.0043 4.64422 18.6094 5.01742 18.9826C5.39062 19.3558 5.9957 19.3558 6.36891 18.9826L8.17898 17.1725Z" fill="#000000"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.36888 5.01722C5.99568 4.64402 5.3906 4.64402 5.01739 5.01722C4.64419 5.39043 4.64419 5.99551 5.01739 6.36871L6.82776 8.17908C7.0154 7.92574 7.22403 7.68306 7.45366 7.45342C7.68327 7.22381 7.92593 7.0152 8.17924 6.82758L6.36888 5.01722ZM17.1727 15.821C16.9851 16.0743 16.7764 16.317 16.5468 16.5466C16.3172 16.7762 16.0745 16.9849 15.8212 17.1725L17.6313 18.9826C18.0045 19.3558 18.6095 19.3558 18.9828 18.9826C19.356 18.6094 19.356 18.0043 18.9828 17.6311L17.1727 15.821Z" fill="#000000"/>
        </svg>
            <svg className="toggle-icon toggle-moon" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.00333 5.43284C10.0138 5.04231 11.0994 4.91335 12.1676 5.05694C13.2359 5.20054 14.2552 5.61245 15.1388 6.25757C16.0223 6.9027 16.7439 7.76194 17.2421 8.76211C17.7403 9.76228 18.0003 10.8738 18 12.0019C17.9997 13.13 17.7391 14.2413 17.2404 15.2412C16.7417 16.2411 16.0197 17.0999 15.1358 17.7446C14.252 18.3892 13.2324 18.8005 12.1641 18.9435C11.0958 19.0865 10.0102 18.957 9 18.5659C9 18.5659 13 16.1176 13 12C13 7.88235 9.00333 5.43284 9.00333 5.43284Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </span>
    </label>
  );
}
