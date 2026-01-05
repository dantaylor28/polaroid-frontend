export const ProfileHoverCard = ({
  profile,
  anchorRect,
  onClose
}) => {
  return (
    <div
      className="fixed z-50"
      style={{
        top: anchorRect.top,
        left: anchorRect.right + 12,
      }}
      onMouseLeave={onClose}
    >
      <div className="w-64 rounded-lg bg-white border border-black/10 shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={profile.profile_image}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{profile.owner}</p>
              <p className="text-xs text-black/60">
                {profile.location || "No location"}
              </p>
            </div>
          </div>

          <p className="text-sm text-black/70 mb-3">
            {profile.bio || "No bio yet"}
          </p>

          {!profile.is_profile_owner && (
            <button className="w-full py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
