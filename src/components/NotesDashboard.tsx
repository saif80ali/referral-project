import NoteState from "../context/notes/noteState"
import { Addnote } from "./AddNote"
import { Notes } from "./Notes"

const NotesDashboard = () => {
    return (
        <NoteState>
            <section className="container">
                <Addnote/>
                <Notes/>
            </section>
        </NoteState>
    )
}

export default NotesDashboard;