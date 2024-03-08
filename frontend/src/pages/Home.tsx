/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import useIsLoggedIn from "@/hooks/useIsLoggedIn";
// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "@/services/posts";
// import PostCard from "@/components/PostCard";
// import PostCardPlaceholder from "@/components/PostCardPlaceholder";

// interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   user: string;
//   likes: number;
//   imageUrl?: string;
//   createdAt: string;
// }

// const Home = () => {
//   const isLoggedIn = useIsLoggedIn();
//   const [page, setPage] = useState<number>(1);
//   const { data, error, isFetching } = useQuery({
//     queryKey: ["post"],
//     queryFn: () => getPosts(page),
//   });

//   useEffect(() => {
//     if (!isLoggedIn) {
//       window.location.href = "/login";
//     }
//   }, [isLoggedIn]);

//   const handleScroll = (event: any) => {
//     const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
//     if (scrollHeight - scrollTop === clientHeight) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div className="container px-4 mx-auto" onScroll={handleScroll}>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
//         {data &&
//           data?.posts?.map((post: Post) => (
//             <PostCard key={post._id} post={post} />
//           ))}
//         {isFetching &&
//           Array.from({ length: 3 }, (_, index) => (
//             <PostCardPlaceholder key={index} />
//           ))}
//         {error && <div>Error: {error.message.toString()}</div>}
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { getPosts } from "@/services/posts";
// import PostCard from "@/components/PostCard";
// import PostCardPlaceholder from "@/components/PostCardPlaceholder";
// import useIsLoggedIn from "@/hooks/useIsLoggedIn";

// interface Post {
//   _id: string;
//   title: string;
//   content: string;
//   user: string;
//   likes: number;
//   imageUrl?: string;
//   createdAt: string;
// }

// function Home() {
//   const isLoggedIn = useIsLoggedIn();

//   const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isPending,
//   } = useInfiniteQuery({
//     queryKey: ["posts"],
//     queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getPosts(pageParam),
//     getNextPageParam: (lastPage: { nextCursor: any }) => lastPage.nextCursor,
//     initialPageParam: 0,
//   });

//   useEffect(() => {
//     if (!isLoggedIn) {
//       window.location.href = "/login";
//     }
//   }, [isLoggedIn]);

//   const handleScroll = () => {
//     console.log("Data -> ", data);
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//         document.documentElement.offsetHeight ||
//       isFetchingNextPage
//     )
//       return;
//     fetchNextPage();
//   };

//   useEffect(() => {
//     console.log("Data -> ", data);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [isFetchingNextPage]);

//   return (
//     <div className="container px-4 mx-auto">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
//         {isPending &&
//           Array.from({ length: 3 }, (_, index) => (
//             <PostCardPlaceholder key={index} />
//           ))}
//         {data &&
//           data?.posts?.map((post: Post) => (
//             <PostCard key={post._id} post={post} />
//           ))}

//         {isFetchingNextPage &&
//           Array.from({ length: 3 }, (_, index) => (
//             <PostCardPlaceholder key={index} />
//           ))}
//         {error && <div>Error: {error.message}</div>}
//       </div>
//     </div>
//   );
// }

// export default Home;

// import { useEffect } from "react";
// import { useInfiniteQuery } from "react-query";
// import { useInView } from "react-intersection-observer";
// import Todo from "./Todo";
// import "./App.css";

// function App() {
//   const { ref, inView } = useInView();
//   const LIMIT = 10;

//   const fetchTodos = async (page) => {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${LIMIT}`
//     );
//     return response.json();
//   };

//   const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
//     useInfiniteQuery("todos", ({ pageParam = 1 }) => fetchTodos(pageParam), {
//       getNextPageParam: (lastPage, allPages) => {
//         const nextPage =
//           lastPage.length === LIMIT ? allPages.length + 1 : undefined;
//         return nextPage;
//       },
//     });

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, fetchNextPage, hasNextPage]);

//   const content =
//     isSuccess &&
//     data.pages.map((page) =>
//       page.map((todo, i) => {
//         if (page.length === i + 1) {
//           return <Todo ref={ref} key={todo.id} todo={todo} />;
//         }
//         return <Todo key={todo.id} todo={todo} />;
//       })
//     );

//   return (
//     <div className="app">
//       {content}
//       {isFetchingNextPage && <h3>Loading...</h3>}
//     </div>
//   );
// }

// export default App;
