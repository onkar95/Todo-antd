import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react'
import DataContext from '../context/Todo';

const Searchbar = () => {
    const {  Data, setFilterData } = useContext(DataContext);

    const { Search } = Input;

    const [searchvalue, setsearchvalue] = useState();
    function findInValues(arr, val) {
        const value = String(val).toLowerCase();
        return arr?.filter(o =>
            Object.entries(o).some(entry =>
                String(entry[1]).toLowerCase().includes(value)
            )
        );
    }
    const handelReset = (e) => {
        setFilterData("")
        setsearchvalue("")
    }

    return (
        <div>
           
            <Form>
                <Form.Item label="Search here" >

                    <Search
                        placeholder="search your todo here"
                        enterButton="Search"
                        size="middle"
                       
                        onChange={(e) => setsearchvalue(e.target.value)}
                        onSearch={(value) => setFilterData(findInValues(Data, searchvalue))}
                        value={searchvalue}
                        onClick={() => console.log("first")}
                    />
                    <Button onClick={() => handelReset()}> reset</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Searchbar