import { useState, ReactNode } from 'react';
import NoteContext from './noteContext';
import { getMethod, postMethod, deleteMethod, putMethod } from '../../services/apiCallService';
import { setLoader } from '../../store/features/loaderState';
import { setToaster } from '../../store/features/toasterState';
import { useDispatch } from 'react-redux';

const NoteState = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const [note, setNote] = useState<any[]>([]);

    const fetchallnote = () => {
        dispatch(setLoader(true));
        getMethod('notes/fetchallnotes').then((response) => {
            setNote(response.data);
            dispatch(setLoader(false));
        }).catch(() => {
            dispatch(setLoader(false));
            dispatch(setToaster({type: "error", message: "Something went wrong"}));
        });
    }

    const addNote = (newNote: any) => {
        dispatch(setLoader(true));
        postMethod('notes/addnote', newNote).then((response) => {
            const appendNote = note.concat(response.data.savednote);
            setNote(appendNote);
            dispatch(setLoader(false));
            dispatch(setToaster({type: "success", message: response.data.message}));
        }).catch(() => {
            dispatch(setLoader(false));
            dispatch(setToaster({type: "error", message: "Something went wrong"}));
        });
    }

    const deleteNote = (id: string) => {
        dispatch(setLoader(true));
        deleteMethod(`notes/deletenote/${id}`).then((response) => {
            const filteredNote = note.filter((element: any) => element._id !== id);
            setNote(filteredNote);
            dispatch(setLoader(false));
            dispatch(setToaster({type:"success", message: response.data.message}));
        }).catch(() => {
            dispatch(setLoader(false));
            dispatch(setToaster({type: "error", message: "Something went wrong"}));
        });
    }

    const updateNote = (newNote: any) => {
        dispatch(setLoader(true));
        putMethod(`notes/updatenote/${newNote.id}`, newNote).then((response) => {
            dispatch(setToaster({type: "success", message: response.data.message}));
            fetchallnote();
        }).catch(() => {
            dispatch(setLoader(false));
            dispatch(setToaster({type: "error", message: "Something went wrong"}));
        });
    }

    return (
        <NoteContext.Provider value={{ note, fetchallnote, addNote, deleteNote, updateNote }}>
            {children}
        </NoteContext.Provider>
    );
}

export default NoteState;
