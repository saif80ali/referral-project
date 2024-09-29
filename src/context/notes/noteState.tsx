import { useState, ReactNode } from 'react';
import NoteContext from './noteContext';
import { getMethod, postMethod, deleteMethod, putMethod } from '../../services/apiCallService';
import { setLoader } from '../../store/features/loaderState';
import { setToaster } from '../../store/features/toasterState';
import { useDispatch } from 'react-redux';

const NoteState = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const [note, setNote] = useState<any[]>([]);
    const [alertmsg, setAlertMsg] = useState<{ type?: string; msg?: string }>({});

    const fetchallnote = () => {
        dispatch(setLoader(true));
        getMethod('notes/fetchallnotes').then((response) => {
            setNote(response.data);
            dispatch(setLoader(false));
        }).catch((error) => {
            console.error(error);
            dispatch(setLoader(false));
        });
    }

    const addNote = (newNote: any) => {
        dispatch(setLoader(true));
        postMethod('notes/addnote', newNote).then((response) => {
            const appendNote = note.concat(response.data);
            setNote(appendNote);
            dispatch(setLoader(false));
            dispatch(setToaster({type: "success", message: "Note addedd succesfully"}));
        }).catch((error) => {
            console.error(error);
            dispatch(setLoader(false));
        });
    }

    const deleteNote = (id: string) => {
        dispatch(setLoader(true));
        deleteMethod(`notes/deletenote/${id}`).then((response) => {
            const filteredNote = note.filter((element: any) => element._id !== id);
            setNote(filteredNote);
            dispatch(setLoader(false));
            dispatch(setToaster({type:"error", message: "Note addedd succesfully"}));
        }).catch((error) => {
            console.error(error);
            dispatch(setLoader(false));
        });
    }

    const updateNote = (newNote: any) => {
        dispatch(setLoader(true));
        putMethod(`notes/updatenote/${newNote.id}`, newNote).then(() => {
            fetchallnote();
        }).catch((error) => {
            console.error(error);
            dispatch(setLoader(false));
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
