import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    
    // Auto-desaparece após duration
    const timer = setTimeout(() => {
      setToast(null);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return { toast, showToast };
};