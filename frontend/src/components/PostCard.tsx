import React from "react";
import { FaRegHeart } from "react-icons/fa";
import samplePostImg from "../assets/sample post.jpg";

interface Post {
  _id: string;
  title: string;
  content: string;
  user: string;
  likes: number;
  imageUrl?: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl">
      {
        <img
          className="object-cover w-full h-56 lg:h-96 md:h-72"
          src={post?.imageUrl ? post.imageUrl : samplePostImg}
          alt={`Post titled: ${post.title}`}
        />
      }
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div>
          <h5 className="mb-2 text-2xl font-bold text-gray-900">
            {post.title}
          </h5>
          <p className="text-base text-gray-700">{post.content}</p>
        </div>
        <div className="flex mt-3">
          <div className="text-sm text-gray-600">
            Posted by{" "}
            {/* <span className="font-bold text-gray-900">{post.user}</span> on{" "} */}
            <span className="font-bold text-gray-900">
              {formatDate(post.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <FaRegHeart className="text-red-500" />
            <span className="font-bold text-gray-600">{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
