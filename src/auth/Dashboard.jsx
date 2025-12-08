import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal"; // make sure this is created

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (title, content) => {
    const token = localStorage.getItem("token");

    try {
      if (editingNote) {
        // Edit existing note
        await axios.patch(
          `/notes/${editingNote._id}`,
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create new note
        await axios.post(
          `/notes`,
          { title, content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setShowModal(false);
      setEditingNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6">
      {/* Create Note Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Notes</h2>
        <button
          onClick={() => {
            setEditingNote(null);
            setShowModal(true);
          }}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          + Create Note
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p>No notes exist. Please create one.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={(note) => {
                setEditingNote(note);
                setShowModal(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <NoteModal
          initialNote={editingNote}
          onClose={() => {
            setShowModal(false);
            setEditingNote(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Dashboard;
