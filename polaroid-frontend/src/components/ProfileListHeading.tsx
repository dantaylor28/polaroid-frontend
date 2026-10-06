

interface ProfileListHeadingProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const ProfileListHeading = ({
  activeTab,
  setActiveTab,
}: ProfileListHeadingProps) => {
  return (
    <div className="relative flex mb-6 mt-2 mx-4">
      <button
        onClick={() => setActiveTab("suggested")}
        className={`flex-1 py-3 text-sm hover:text-black cursor-pointer transition ${
          activeTab === "suggested" ? "text-black" : "text-black/40"
        }`}
      >
        Suggested
      </button>

      <button
        onClick={() => setActiveTab("following")}
        className={`flex-1 py-3 text-sm hover:text-black cursor-pointer transition ${
          activeTab === "following" ? "text-black" : "text-black/40"
        }`}
      >
        Following
      </button>

      <span
        className={`absolute bottom-0 h-px w-1/2 bg-black/30 transition-all duration-300 ${
          activeTab === "suggested" ? "left-0" : "left-1/2"
        }`}
      />
    </div>
  );
};
