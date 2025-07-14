"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-embassy-blue-800 group-[.toaster]:border group-[.toaster]:border-embassy-blue-200 group-[.toaster]:shadow-xl group-[.toaster]:backdrop-blur-sm group-[.toaster]:rounded-xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-embassy-blue-600 group-[.toast]:text-sm group-[.toast]:mt-1",
          actionButton:
            "group-[.toast]:bg-embassy-blue-600 group-[.toast]:text-white group-[.toast]:hover:bg-embassy-blue-700 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:font-medium group-[.toast]:transition-colors",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 group-[.toast]:hover:bg-gray-200 group-[.toast]:rounded-lg group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-sm group-[.toast]:transition-colors",
          closeButton:
            "group-[.toast]:bg-embassy-blue-100 group-[.toast]:text-embassy-blue-600 group-[.toast]:hover:bg-embassy-blue-200 group-[.toast]:border-0",
          success:
            "group-[.toaster]:bg-emerald-50 group-[.toaster]:text-emerald-800 group-[.toaster]:border-emerald-200",
          error:
            "group-[.toaster]:bg-embassy-red-50 group-[.toaster]:text-embassy-red-800 group-[.toaster]:border-embassy-red-200",
          warning:
            "group-[.toaster]:bg-embassy-yellow-50 group-[.toaster]:text-embassy-yellow-800 group-[.toaster]:border-embassy-yellow-200",
          info:
            "group-[.toaster]:bg-embassy-blue-50 group-[.toaster]:text-embassy-blue-800 group-[.toaster]:border-embassy-blue-200",
          loading:
            "group-[.toaster]:bg-embassy-blue-50 group-[.toaster]:text-embassy-blue-800 group-[.toaster]:border-embassy-blue-200",
        },
        style: {
          background: theme === 'dark' 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          border: theme === 'dark' 
            ? '1px solid rgba(0, 51, 153, 0.3)' 
            : '1px solid rgba(0, 51, 153, 0.1)',
          borderRadius: '12px',
          boxShadow: theme === 'dark'
            ? '0 10px 25px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 51, 153, 0.1)'
            : '0 10px 25px rgba(0, 51, 153, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
          color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        },
      }}
      icons={{
        success: (
          <div className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full">
            <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        ),
        error: (
          <div className="flex items-center justify-center w-5 h-5 bg-embassy-red-100 rounded-full">
            <svg className="w-3 h-3 text-embassy-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        ),
        warning: (
          <div className="flex items-center justify-center w-5 h-5 bg-embassy-yellow-100 rounded-full">
            <svg className="w-3 h-3 text-embassy-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        ),
        info: (
          <div className="flex items-center justify-center w-5 h-5 bg-embassy-blue-100 rounded-full">
            <svg className="w-3 h-3 text-embassy-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        ),
        loading: (
          <div className="flex items-center justify-center w-5 h-5">
            <svg className="w-4 h-4 text-embassy-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ),
      }}
      {...props}
    />
  )
}

export { Toaster }
