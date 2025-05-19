import React, { forwardRef } from "react";

export const Input = forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`
      w-full
      border border-gray-300 dark:border-slate-600
      bg-white dark:bg-slate-700
      text-gray-700 dark:text-gray-200
      placeholder-gray-400 dark:placeholder-gray-500
      rounded-lg
      focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600
      transition
      ${className}
    `}
    {...props}
  />
));

Input.displayName = "Input";
