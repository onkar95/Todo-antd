import React, { useState, useRef } from 'react'
import { Space, Table, Tag, Modal } from 'antd';
import 'antd/dist/antd.min.css'
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import Edittodo from './Edittodo';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Header } from 'antd/lib/layout/layout';


const Todo = ({ setData, Data }) => {
    console.log("todo", Data)
    const [edit, setedit] = useState(false);
    const [editRecord, seteditRecord] = useState(null);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    // const search=Data.search()
    const columns = [
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            ellipsis: true,
            sorter: (a, b) => a.createdAt - b.createdAt,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            sorter: (a, b) => a.title - b.title,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            sorter: (a, b) => a.description.length - b.description.length,

        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            ellipsis: true,
            sorter: (a, b) => a.dueDate - b.dueDate,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            ellipsis: true,
            filters: [
                {
                    text: 'NICE',
                    value: 'nice',
                },
                {
                    text: 'DEVELOPER',
                    value: 'developer',
                },

            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            ...getColumnSearchProps('tags', "status"),
            sorter: (a, b) => a.tags.length - b.tags.length,
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <>
                    {
                        record?.tags?.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';

                            if (tag === 'loser') {
                                color = 'volcano';
                            }

                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            filters: [
                {
                    text: 'completed',
                    value: 'completed',
                },
                {
                    text: 'Done',
                    value: 'Done',
                },
                {
                    text: 'Working',
                    value: 'Working',
                },
                {
                    text: 'Overdue',
                    value: 'Overdue',
                },

            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },

        {
            title: 'Action',
            key: 'action',
            ellipsis: true,
            render: (_, record) => (
                <>
                    <button onClick={() => handeldelete(record)}>delete</button>
                    <button onClick={() => handeledit(record)}>edit</button>
                </>
            )

        },
    ];

    const handeldelete = (record) => {
        Modal.confirm({
            title: "are you sure",
            onOk: async () => {
                const filter = await Data.filter(val => {
                    return val.key !== record.key
                })
                setData(filter)
                localStorage.setItem("notes", JSON.stringify(filter))
            }
        })

    }
    const handeledit = (record) => {

        console.log(record)
        seteditRecord({ ...record })
        if (editRecord != null) setedit(true)
        console.log(editRecord)
    }

    const { TextArea } = Input;
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    // console.log("recf", record)



    return (
        <div>
            <Header > <h1 style={{textAlign:"center"}}>Table</h1></Header>
           
            <div>
                <Table columns={columns} dataSource={Data}
                    pagination={{ defaultPageSize: 3, position: ["bottomCenter"] }} />

                <Edittodo setData={setData} Data={Data} edit={edit} setedit={setedit} editRecord={editRecord} seteditRecord={seteditRecord} />
            </div>

        </div >

    )
}



export default Todo