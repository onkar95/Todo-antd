import { createContext, useEffect, useState } from 'react';

export const TodoContext = createContext(null);
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    let dummy = [
        {
            "key": 59,
            "createdAt": "13/02/2023",
            "title": "dummy 1",
            "description": "dummy todo",
            "dueDate": "24/02/2023",
            "tags": [
                "f1"
            ],
            "status": "open"
        },
        {
            "key": 31,
            "createdAt": "14/02/2023",
            "title": "dummy2",
            "description": "everything working fine",
            "dueDate": "24/02/2023",
            "tags": [
                "f2"
            ],
            "status": "Working"
        },
        {
            "key": 14,
            "createdAt": "13/02/2023",
            "title": "dummy3",
            "description": "dg",
            "dueDate": "23/02/2023",
            "status": "Working"
        }

    ]
    let todoObj
    const [Data, setData] = useState([todoObj]);
    if (Data.length === 0) localStorage.setItem("notes", JSON.stringify(dummy))
    const [Width, setWidth] = useState(window.innerWidth);
    const [FilterData, setFilterData] = useState(Data);
    const [edit, setedit] = useState(false);
    const [editRecord, seteditRecord] = useState(null);
    const [added, setadded] = useState(true);
    const w = window.innerWidth
    useEffect(() => {
        setWidth(window.innerWidth);
    }, [w]);

    // useEffect(() => {
    //     if (edit) setData([...Data, editRecord]);
    // }, [editRecord]);

    return (
        <DataContext.Provider value={{
            Data, setData,
            FilterData, setFilterData,
            Width, setWidth,
            edit, setedit,
            editRecord, seteditRecord,
            added, setadded
        }}>
            {children}
        </DataContext.Provider >
    )
}

export default DataContext;