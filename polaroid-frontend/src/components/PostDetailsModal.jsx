import { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  Heart,
  Pin,
  SendHorizonal,
  MessageCircle,
  LoaderCircle,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToggleAction } from "../hooks/useToggleAction";
import axiosInstance from "../api/axios";

export const PostDetailsModal = ({ post, onClose, onPostUpdate }) => {
  const { toggleAction } = useToggleAction(onPostUpdate);

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const { data } = await axiosInstance.get(`/comments/?post=${post.id}`);
        setComments(data.results);
      } catch (error) {
        console.error("Error fetching comments", error);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [post.id]);

  // Comment submit handler
  const handleCommentSubmit = async () => {
    const trimmedContent = commentText.trim();

    if (!trimmedContent) return;

    try {
      const { data } = await axiosInstance.post("comments/", {
        post: post.id,
        text: trimmedContent,
      });

      setComments((prev) => [data, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };

  // Toggle comment like function
  const toggleCommentLike = async (comment) => {
    try {
      if (comment.comment_liked_id) {
        await axiosInstance.delete(
          `/comments/likes/${comment.comment_liked_id}`,
        );

        setComments((prev) =>
          prev.map((c) =>
            c.id === comment.id
              ? {
                  ...c,
                  comment_liked_id: null,
                  num_of_comment_likes: c.num_of_comment_likes - 1,
                }
              : c,
          ),
        );
      } else {
        const { data } = await axiosInstance.post("/comments/likes/", {
          comment: comment.id,
        });

        setComments((prev) =>
          prev.map((c) =>
            c.id === comment.id
              ? {
                  ...c,
                  comment_liked_id: data.id,
                  num_of_comment_likes: c.num_of_comment_likes + 1,
                }
              : c,
          ),
        );
      }
    } catch (error) {
      console.error("Error creating comment like", error)
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="flex relative w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] ring-1 ring-black/10 p-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side */}
        <div className="w-full h-full object-contain max-h-[95vh] rounded-2xl overflow-hidden flex-1 bg-black flex items-center justify-center">
          <img
            src={post.post_image}
            alt="post"
            className="min-h-150 max-h-[80vh] object-contain"
          />
        </div>

        {/* Right side */}
        <div className="w-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <Link
              to={`/profile/${post.owner}`}
              className="flex items-center gap-2"
            >
              <img
                src={post.profile_image || "/avatar-placeholder.png"}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-black/5"
              />
              <span className="text-sm font-medium text-black/70 capitalize group-hover:text-black">
                {post.owner}
              </span>
            </Link>
            <button
              onClick={onClose}
              className="size-8 rounded-full flex items-center justify-center
            text-black/50 hover:text-black hover:bg-black/5 transition hover:cursor-pointer"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <div className="border-b mx-5 border-black/10" />
          <div className="flex items-center px-4 pt-4 pb-2 gap-4">
            {/* Like button */}
            <div className="flex items-center gap-1">
              <button
                className={`${post.liked_id ? "text-red-500" : "text-gray-300"} cursor-pointer ${!post.liked_id ? "hover:text-red-500/80" : ""} transition`}
                onClick={() =>
                  toggleAction({
                    post,
                    endpoint: "likes",
                    idField: "liked_id",
                    countField: "num_of_likes",
                  })
                }
              >
                <Heart
                  className="size-6.5"
                  fill={post.liked_id ? "currentColor" : "none"}
                />
              </button>
              <span className="text-sm">{post.num_of_likes}</span>
            </div>
            {/* Pin button */}
            <div className="flex items-center gap-1 text-sm">
              <button
                className={`${post.pinned_id ? "text-blue-600" : "text-gray-300"} cursor-pointer ${!post.pinned_id ? "hover:text-blue-600/80" : ""} transition`}
                onClick={() =>
                  toggleAction({
                    post,
                    endpoint: "pins",
                    idField: "pinned_id",
                    countField: "num_of_pins",
                  })
                }
              >
                <Pin
                  className="size-6.5"
                  fill={post.pinned_id ? "currentColor" : "none"}
                />
              </button>
              <span className="text-sm">{post.num_of_pins}</span>
            </div>
          </div>

          {/* Caption/Tags */}
          <div
            className={`px-4 pt-1 pb-4 ${post.tags_display?.length > 0 ? "space-y-1.5" : ""}`}
          >
            <p className="flex gap-2 text-sm">
              <Link to={`/profile/${post.owner}`}>
                <span className="font-semibold">{post.owner}</span>
              </Link>
              <span>{post.caption}</span>
            </p>

            {post.tags_display?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags_display.map((tag) => (
                  <Link
                    key={tag}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs bg-blue-600/90 hover:bg-blue-600 text-white px-2 py-1 rounded-full cursor-pointer"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            <div>
              <p className="text-[10px] font-semibold text-black/50">
                {post.uploaded_at}
              </p>
            </div>
          </div>
          <div className="border-b mx-5 border-black/10" />

          {/* Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {loadingComments ? (
              <div className="flex items-center justify-center h-full">
                <LoaderCircle className="size-6 animate-spin text-blue-600" />
              </div>
            ) : comments.length === 0 ? (
              <div className="flex flex-col items-center text-center">
                <MessageCircle className="size-12 text-black/40 mb-3 animate-pulse" />
                <p className="text-xs text-black/70 font-medium">
                  Nothing to show...
                </p>
                <p className="text-xs text-black/40 mt-1">
                  Be the first to comment
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-2 mb-4">
                  <Link to={`/profile/${comment.owner}`}>
                    <img
                      src={comment.profile_image}
                      alt={comment.owner}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </Link>

                  <div>
                    <p className="text-sm">
                      <Link
                        to={`/profile/${comment.owner}`}
                        className="font-semibold mr-1"
                      >
                        {comment.owner}
                      </Link>

                      <span>{comment.text}</span>
                    </p>

                    <p className="text-[10px] font-semibold text-black/40 mt-0.5">
                      {comment.timestamp}
                    </p>
                  </div>

                  {/* Comment like btn */}
                  <div className="flex ml-auto items-center gap-1">
                    <button
                      onClick={() => toggleCommentLike(comment)}
                      className={`${comment.comment_liked_id ? "text-blue-600 hover:cursor-pointer" : "text-gray-300 hover:text-blue-600 hover:cursor-pointer"} transition`}
                    >
                      <ThumbsUp
                        size={14}
                        fill={
                          comment.comment_liked_id ? "currentColor" : "none"
                        }
                      />
                    </button>

                    <span className="text-xs">
                      {comment.num_of_comment_likes}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center relative mt-2 mb-3 mx-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommentSubmit();
                }
              }}
              id="comment"
              name="comment"
              placeholder="Add a comment..."
              className="w-full bg-slate-50 border border-black/25 rounded-sm h-10 pl-2 placeholder:text-black/40 focus:outline-none focus:border-black/40"
            />
            <SendHorizonal
              onClick={handleCommentSubmit}
              className="absolute right-0 mr-2 size-5 text-blue-600 hover:text-blue-700 cursor-pointer hover:translate-x-0.75 transition duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
