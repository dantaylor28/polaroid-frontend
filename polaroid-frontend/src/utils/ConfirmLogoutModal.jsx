

export const ConfirmLogoutModal = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <p className="mb-4 font-medium">Are you sure you want to log out?</p>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-1 rounded bg-gray-200">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
