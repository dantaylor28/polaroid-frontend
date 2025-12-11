import toast from "react-hot-toast";

export const ConfirmLogoutToast = (onConfirm) => {
  return toast(
    (t) => (
      <div className="p-2">
        <p className="mb-3">Are you sure you want to log out?</p>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded mr-4"
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id); // close immediately
          }}
        >
          Yes
        </button>

        <button
          className="bg-gray-300 px-3 py-1 rounded"
          onClick={() => toast.dismiss(t.id)} // close on cancel
        >
          No
        </button>
      </div>
    ),
    {
      duration: Infinity, // stays until user clicks
      position: "top-center",
    }
  );
};
