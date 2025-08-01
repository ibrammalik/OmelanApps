import { Bell } from 'lucide-react';

export default function NotificationButton({ unreadCount, onClick }) {
  return (
    <button className="relative p-2" onClick={onClick}>
      <Bell className="w-6 h-6 text-gray-700" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
}
