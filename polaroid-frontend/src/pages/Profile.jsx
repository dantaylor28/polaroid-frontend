import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { ProfileSkeleton } from "../components/ProfileSkeleton";

export const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine whose profile is being viewed
  const profileUsername = username || currentUser?.username;
  const isSelf = profileUsername === currentUser?.username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/profiles/${profileUsername}/`
        );
        setProfile(data);
      } catch (error) {
        console.log("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileUsername) {
      fetchProfile();
    }
  }, [profileUsername]);

  if (loading) {
    return <ProfileSkeleton />
  }

  if (!profile) {
    return <p className="flex justify-center mx-auto mt-32 px-6 py-4 text-sm">Profile not found</p>;
  }
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={profile.profile_image}
          alt={profile.owner}
          className="w-24 h-24 rounded-full object-cover"
        />

        <div>
          <h1 className="text-2xl font-semibold">{profile.owner}</h1>
          <p className="text-sm text-black/60">
            {profile.location || "No location"}
          </p>

          <div className="flex gap-4 mt-2 text-sm text-black/70">
            <span>{profile.num_of_posts} posts</span>
            <span>{profile.num_of_followers} followers</span>
            <span>{profile.num_of_following} following</span>
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto">
          {isSelf ? (
            <button className="px-4 py-2 text-sm rounded-md border">
              Edit profile
            </button>
          ) : (
            <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Follow
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-lg p-4">
        <h2 className="font-medium mb-2">Bio</h2>
        <p className="text-sm text-black/70">
          {profile.bio || "This user hasn’t written a bio yet."}
        </p>
      </div>
    </div>
  );
};
