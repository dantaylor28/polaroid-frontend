import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const ProfileHoverCard = ({ profile, anchorRect, onClose }) => {
  return (
    <div
      className="fixed z-50"
      style={{
        top: anchorRect.top,
        left: anchorRect.right + 24,
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
            <div className="relative group ml-auto">
              <Link
                to={`/profile/${profile.owner}`}
                aria-label="View full profile"
              >
                <SquareArrowOutUpRight className="size-4 text-black/70 hover:text-black transition cursor-pointer" />
              </Link>
              {/* Tooltip */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[110%] ml-2 whitespace-nowrap rounded-md
                bg-black/70 px-2 py-1 text-xs text-white opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                pointer-events-none transition-all duration-150"
              >
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-black/70 rotate-45" />
                View full profile
              </div>
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
