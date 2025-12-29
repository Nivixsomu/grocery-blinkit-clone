export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-700">Order Placed Successfully! 🎉</h1>

      <p className="mt-4 text-gray-700 text-lg">
        Your groceries will be delivered shortly.
      </p>

      <button
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        onClick={() => (window.location.href = "/customer/home")}
      >
        Back to Home
      </button>
    </div>
  );
}
