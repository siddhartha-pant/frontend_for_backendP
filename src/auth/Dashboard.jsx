import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // <-- using the configured backend URL
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModal";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await api.get("/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Notes</h2>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditingNote(null);
              setShowModal(true);
            }}
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            + Create Note
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Loader / Notes List */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
          <span className="ml-3 text-yellow-500">Loading notes...</span>
        </div>
      ) : notes.length === 0 ? (
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
              onDelete={async (id) => {
                const token = localStorage.getItem("token");
                try {
                  await api
                    .delete(`/notes/${id}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then(setNotes((prev) => prev.filter((p) => p._id !== id)));
                  // fetchNotes();
                } catch (err) {
                  console.error("Delete error:", err);
                }
              }}
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
          onSave={async (title, content) => {
            const token = localStorage.getItem("token");
            try {
              if (editingNote) {
                await api
                  .patch(
                    `/notes/${editingNote._id}`,
                    { title, content },
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then((note) =>
                    setNotes((prev) =>
                      prev.map((p) => (p._id == note.data._id ? note.data : p))
                    )
                  ); //interview logic of editing
              } else {
                await api
                  .post(
                    "/notes",
                    { title, content },
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then((note) => setNotes((prev) => [...prev, note.data]));
              }

              setShowModal(false);
              setEditingNote(null);
              // fetchNotes();
            } catch (err) {
              console.error("Save error:", err);
            }
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
