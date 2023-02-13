import { createContext, useEffect, useState } from 'react';

export const TodoContext = createContext(null);
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    let todoObj
    const [Data, setData] = useState([todoObj]);
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