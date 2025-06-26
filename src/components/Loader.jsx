/**

 * Displays a full-screen loading spinner:
 * - A semi-transparent dark overlay blocks the UI
 * - A spinning ring + glowing animated core in the center
 * - Used for loading states while data or content is being fetched
 */

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      {/* overlay covers the entire screen with dark semi-transparent background */}
      
      <div className="relative w-20 h-20">
        {/* outer ring with spinning animation */}
        <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin-slow" />
        
        {/* inner core: glowing pulsating circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-gray-300 rounded-full pulse-glow" />
        </div>
      </div>
    </div>
  );
}
