export const ConfirmModal = ({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
}) => {
  if (!open) return null;

  const confirmStyles =
    variant == "danger"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
        <h2 className="text-lg font-semibold text-black mb-2">{title}</h2>

        {description && (
          <p className="text-sm text-black/60 mb-5">{description}</p>
        )}

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 hover:cursor-pointer transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm transition hover:cursor-pointer ${confirmStyles}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
