export interface Post {
  id: number;
  title: string;
  caption: string;
  owner: string;
  is_post_owner: boolean;
  uploaded_at: string;
  updated_at: string;
  post_image: string;
  profile_id: number;
  profile_image: string;
  pinned_id: number | null;
  num_of_pins: number;
  liked_id: number | null;
  num_of_likes: number;
  num_of_comments: number;
  tags_display: string[];
}
