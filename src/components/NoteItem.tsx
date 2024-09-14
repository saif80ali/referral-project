import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';

const NoteItem = (props: any) => {
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 24-hour format
  };

  const context = useContext(noteContext);
  if (!context) {
    return <div className="text-danger">Error: Something went wrong</div>;
  }

  const deleteNote = context.deleteNote;

  let { id, title, description, tag, date, editNote } = props;
  const handleDelete = (id: string) => {
    deleteNote(id);
  };

  return (
    <div>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{title}</h5>
              <div>
                <DeleteIcon
                  className="fa-regular fa-trash-can mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(id);
                  }}
                ></DeleteIcon>
                <EditIcon
                  className="fa-regular fa-pen-to-square"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    editNote({ id, title, description, tag });
                  }}
                ></EditIcon>
              </div>
            </div>

            <p className="card-text">
              <small className="text-muted">{tag}</small>
            </p>
            <p className="card-text">{description}</p>
            <div className="text-muted fw-bold text-end">
              {new Date(date).toLocaleString("en-US", options)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
