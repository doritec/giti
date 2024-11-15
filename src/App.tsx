import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { RecoveryModal } from './components/RecoveryModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src="https://i0.wp.com/www.omgubuntu.co.uk/wp-content/uploads/2016/07/wire-logo.jpg"
            alt="Company Logo"
            className="h-30 w-auto object-contain" // Increased from h-16 to h-24
          />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Account Recovery</h1>
          <p className="text-gray-500">We'll help you get back into your account</p>
        </div>

        {/* Recovery Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium
                     hover:bg-blue-700 transform transition-all duration-200 
                     active:scale-[0.98] shadow-lg hover:shadow-blue-200"
        >
          Recover Account
        </button>

        {/* Login Link */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 mx-auto"
        >
          <span className="font-medium">Continue to login</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <RecoveryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default App;