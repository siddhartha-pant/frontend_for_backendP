import { useState, useEffect } from "react";

function NoteModal({ onClose, onSave, initialNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
    }
  }, [initialNote]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {initialNote ? "Edit Note" : "Create Note"}
        </h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          className="border w-full p-2 mb-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content Input */}
        <textarea
          placeholder="Content"
          className="border w-full p-2 mb-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(title, content)}
            className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
