export interface Comment {
  id: number;
  post: number;
  post_title: string;
  text: string;
  num_of_comment_likes: number;
  owner: string;
  is_comment_owner: boolean;
  timestamp: string;
  updated_at: string;
  profile_id: number;
  profile_image: string;
  comment_liked_id: number | null;
}
