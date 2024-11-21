const ShimmerPlaceholder = () => {
    return (
      <div className="rounded shadow-md bg-gray-800 p-4 animate-pulse">
        <div className="w-full h-48 bg-gray-700 mb-4"></div>
        <div className="h-6 bg-gray-700 mb-2 rounded"></div>
        <div className="h-4 bg-gray-700 mb-2 rounded"></div>
        <div className="h-4 bg-gray-700 rounded"></div>
      </div>
    );
  };

export default ShimmerPlaceholder;
  