import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CreateInvoice() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate("/Invoice"); // Navigate to /invoice
  };

  return (
    <>
      <button
        onClick={handleButtonClick} // Attach the click handler
        className="bg-blue-500 py-2 px-6 rounded text-base hover:bg-transparent text-white transition-all duration-150 hover:bg-blue-600 shadow-lg hover:ring-4 hover:ring-blue-400"
      >
        Create Invoice
      </button>
    </>
  );
}