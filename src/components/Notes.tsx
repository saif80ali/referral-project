import { useEffect, useRef, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export const Notes = () => {
  let history = useNavigate();
  const context = useContext(noteContext);
  if (!context) {
    return <div className="text-danger">Error: Something went wrong</div>;
  }
  const mynotes = context.note;
  const updateNote = context.updateNote;
  const fetchallnote = context.fetchallnote;

  const isLoggedIn = useSelector(
    (state: RootState) => state.userLogin.userLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn) {
        fetchallnote();
    } else {
      localStorage.removeItem("token");
      history("/");
    }
  }, []);

  const ref = useRef<HTMLButtonElement | null>(null);

  const editNote = (note: any) => {
    if (ref.current) {
      ref.current?.click();
      (document.getElementById("etitle") as HTMLInputElement).value =
        note.title;
      (document.getElementById("_id") as HTMLInputElement).value = note.id;
      (document.getElementById("edescription") as HTMLInputElement).value =
        note.description;
    }
  };
  const handleUpdateNote = () => {
    updateNote({
      id: (document.getElementById("_id") as HTMLInputElement).value,
      title: (document.getElementById("etitle") as HTMLInputElement).value,
      description: (document.getElementById("edescription") as HTMLInputElement)
        .value,
    });
  };

  return (
    <div className="container my-3">
      <h2>My notes</h2>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Your Notes
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-lg-12 col-sm-12 col-md-6 my-2">
                    <input
                      type="text"
                      id="etitle"
                      name="title"
                      className="form-control"
                      placeholder="Title"
                      minLength={3}
                      required
                    />
                    <input type="hidden" id="_id" />
                  </div>
                  <div className="col-lg-12 col-sm-12 col-md-6 my-2">
                    <input
                      type="text"
                      id="edescription"
                      name="description"
                      className="form-control"
                      placeholder="Description"
                      minLength={5}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateNote}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {mynotes?.length === 0 ? (
          <p>
            <strong>No notes to show</strong>
          </p>
        ) : (
          mynotes?.map((element: any) => {
            return (
              <NoteItem
                key={element._id}
                id={element._id}
                title={element.title}
                description={element.description}
                tag={element.tag}
                date={element.date}
                editNote={editNote}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
