

export interface Profile {
  id: number;
  name: string;
  location: string;
  bio: string;
  owner: string;
  is_profile_owner: boolean;
  created_at: string;
  updated_at: string;
  profile_image: string;
  following_id: number | null;
  num_of_posts: number;
  num_of_pinned_posts: number;
  num_of_liked_posts: number;
  num_of_followers: number;
  num_of_following: number;
}