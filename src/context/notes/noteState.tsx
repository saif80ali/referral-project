import { useState, ReactNode } from 'react';
import NoteContext from './noteContext';
import { getMethod, postMethod, deleteMethod, putMethod } from '../../services/apiCallService';

const NoteState = ({ children }: { children: ReactNode }) => {
    const [note, setNote] = useState<any[]>([]);
    const [alertmsg, setAlertMsg] = useState<{ type?: string; msg?: string }>({});

    const fetchallnote = () => {
        getMethod('notes/fetchallnotes').then((response) => {
            setNote(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const addNote = (newNote: any) => {
        postMethod('notes/addnote', newNote).then((response) => {
            const appendNote = note.concat(response.data);
            setNote(appendNote);
        }).catch((error) => {
            console.error(error);
        });
    }

    const deleteNote = (id: string) => {
        deleteMethod(`notes/deletenote/${id}`).then((response) => {
            const filteredNote = note.filter((element: any) => element._id !== id);
            setNote(filteredNote);
        }).catch((error) => {
            console.error(error);
        });
    }

    const updateNote = (newNote: any) => {
        putMethod(`notes/updatenote/${newNote.id}`, newNote).then(() => {
            fetchallnote();
        }).catch((error) => {
            console.error(error);
        });
    }

    const Myalert = (type: string, msg: string) => {
        setAlertMsg({ type, msg });
        setTimeout(() => {
            setAlertMsg({});
        }, 1500);
    }

    return (
        <NoteContext.Provider value={{ note, fetchallnote, addNote, deleteNote, updateNote, alertmsg, Myalert }}>
            {children}
        </NoteContext.Provider>
    );
}

export default NoteState;
