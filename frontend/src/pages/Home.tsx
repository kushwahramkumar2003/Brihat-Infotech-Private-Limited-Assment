import PostCard from "@/components/PostCard";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { useEffect } from "react";
import samplePostImg from "../assets/sample post.jpg";

const postData = {
  title: "My first post",
  content: "This is the content of my first post.",
  user: "Ramkumar",
  likes: 5,
  imageUrl: samplePostImg,
  createdAt: new Date(),
};

const Home = () => {
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  return (
    <div className="container px-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {Array.from({ length: 12 }, (_, index) => (
          <PostCard key={index} post={postData} />
          // <PostCardPlaceholder key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
