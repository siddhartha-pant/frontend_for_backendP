import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import NoteCard from "../components/NoteCard";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-6">
      {notes.length === 0 ? (
        <p>No notes exist. Please create one.</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))
      )}
    </div>
  );
}
export default Dashboard;
