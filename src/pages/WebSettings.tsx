const WebSettings = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-full bg-gray-100 bg-cover bg-center rounded-2xl"
      style={{
        backgroundImage: "url('https://i.imgur.com/uCNWE1h.png')",
      }}
    >
      <div className="bg-white/80 rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🚧 Under Development</h1>
        <p className="text-gray-600 mb-6">
          This section is currently being worked on. Please check back later!
        </p>
      </div>
    </div>
  );
};

export default WebSettings;
