import React from 'react'
import { Activity, Layout, Server } from 'lucide-react'

function App() {
  const basePath = import.meta.env.VITE_BASE_PATH || import.meta.env.BASE_URL || '/template-base/'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Layout className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Project Template</h1>
        </div>

        <p className="text-gray-600 mb-8 leading-relaxed">
          This is a modern full-stack template featuring <span className="font-medium text-gray-800">React</span> with Tailwind CSS and <span className="font-medium text-gray-800">FastAPI</span>.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-blue-700" />
              <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Base Path</h2>
            </div>
            <code className="text-sm font-mono text-blue-600 bg-white/50 px-2 py-1 rounded border border-blue-100 block truncate">
              {basePath}
            </code>
          </div>

          <div className="flex flex-col space-y-3">
            <a
              href={`${basePath}api/health`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:transform active:scale-95"
            >
              <Server className="w-4 h-4" />
              <span>Test API Health</span>
            </a>
            <p className="text-xs text-center text-gray-400 italic">
              Check if the backend services are responding
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
