import { useState } from "react";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/posts";
import PostCard from "@/components/PostCard";
import PostCardPlaceholder from "@/components/PostCardPlaceholder";

interface Post {
  _id: string;
  title: string;
  content: string;
  user: string;
  likes: number;
  imageUrl?: string;
  createdAt: string;
}

const Home = () => {
  const isLoggedIn = useIsLoggedIn();
  const [page, setPage] = useState<number>(1);
  const { data, error, isFetching } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPosts(page),
  });

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container px-4 mx-auto" onScroll={handleScroll}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {data &&
          data?.posts?.map((post: Post) => (
            <PostCard key={post._id} post={post} />
          ))}
        {isFetching &&
          Array.from({ length: 3 }, (_, index) => (
            <PostCardPlaceholder key={index} />
          ))}
        {error && <div>Error: {(error as Error).message.toString()}</div>}
      </div>
    </div>
  );
};

export default Home;
