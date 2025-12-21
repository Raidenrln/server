const EventCard = () => {
  return (
    <div className="flex w-full min-h-full items-center text-gray-900">
      <div className="w-full h-full rounded-xl border border-gray-300 p-6 shadow-md flex flex-col justify-between bg-white hover:shadow-lg transition-shadow">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Upcoming Event</h1>
          <p className="text-gray-500 text-sm">No Event</p>
        </div>

        {/* Footer / Action */}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
