/**
 
 * A simple 404 page with:
 * - Animated star background
 * - Big "404" heading
 * - "Page Not Found" message
 * - Button to return to homepage
 */
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] bg-midnight-blue overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars"></div>
      </div>

      <h1 className="text-6xl font-bold text-white mb-2">404</h1>
      <p className="text-xl text-gray-300 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
}
