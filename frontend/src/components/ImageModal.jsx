import { X } from "lucide-react";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative max-w-4xl max-h-[90vh] p-2">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-base-300 p-2 rounded-full hover:bg-base-100 transition-colors z-10"
        >
          <X className="size-5" />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt="Enlarged"
          className="max-h-[85vh] max-w-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;