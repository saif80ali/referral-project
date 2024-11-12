import React from "react";
interface NoteContextType {
    note: any[];
    fetchallnote: () => void;
    addNote: (newNote: any) => void;
    deleteNote: (id: string) => void;
    updateNote: (newNote: any) => void;
}
const noteContext =  React.createContext<NoteContextType | undefined>(undefined);;
export default noteContext;