/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getAllNotifications, getNotificationDetail, markNotificationAsRead } from '@/utils/api';

export default function NotificationSidebar({ type = 'client', isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchNotifications = async () => {
    const data = await getAllNotifications(type);
    setNotifications(data);
  };

  useEffect(() => {
    if (isOpen) fetchNotifications();
  }, [isOpen, type]);

  const handleSelect = async (id) => {
    const detail = await getNotificationDetail(id, type);
    // await markNotificationAsRead(id, type);
    setSelected(detail);
    fetchNotifications();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">{selected ? 'Detail Notifikasi' : 'Notifikasi'}</h2>
        <button onClick={() => (selected ? setSelected(null) : onClose())}>
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {!selected ? (
        <div className="p-4 space-y-3 overflow-y-auto h-full">
          {notifications.length === 0 && <p className="text-gray-500">Tidak ada notifikasi</p>}
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded border cursor-pointer ${
                notif.status_read ? 'bg-gray-100' : 'bg-blue-50'
              }`}
              onClick={() => handleSelect(notif.id)}>
              <p className="font-semibold">{notif.subject}</p>
              <p className="text-sm text-gray-600">
                {new Date(notif.created_at).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 space-y-2 overflow-y-auto h-full">
          <h3 className="text-lg font-semibold">{selected.subject}</h3>
          <p className="text-sm text-gray-500">
            {new Date(selected.created_at).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <div className="mt-4 whitespace-pre-line">{selected.content}</div>
        </div>
      )}
    </div>
  );
}
