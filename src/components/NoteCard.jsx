function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="font-bold">{note.title}</h2>
      <p>{note.content}</p>
      <div className="flex justify-end space-x-2">
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}
export default NoteCard;
