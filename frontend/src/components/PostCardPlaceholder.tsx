const PostCardPlaceholder = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-lg shadow-lg">
      <div className="w-full h-56 lg:h-96 md:h-72 shimmer"></div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div>
          <div className="w-4/5 h-8 mb-2 shimmer"></div>
          <div className="w-3/5 h-6 shimmer"></div>
        </div>
        <div className="flex mt-3">
          <div className="w-2/5 h-4 shimmer"></div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-4 h-4 shimmer"></div>
            <div className="w-5 h-4 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardPlaceholder;
