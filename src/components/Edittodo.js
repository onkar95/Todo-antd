import React, { useState } from 'react'
import { Space, Table, Tag, Modal } from 'antd';
import 'antd/dist/antd.min.css'
import Addtodo from './Addtodo';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.min.css'

const Edittodo = ({ setData, Data, edit, setedit, editRecord, seteditRecord }) => {
    console.log(editRecord)
    const handeldelete = (record) => {
        Modal.confirm({
            title: "are you sure",
            onOk: async () => {
                const filter = await Data.filter(val => {
                    return val.key !== record.key
                })
                setData(filter)
            }
        })

    }
    const handeledit = (record) => {

        console.log(record)
        seteditRecord({ ...record })
        if (editRecord != null) setedit(true)
        console.log(editRecord)
    }
    const dateFormat = 'YYYY/MM/DD';
    const { RangePicker } = DatePicker;


    const { TextArea } = Input;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    // console.log("recf", record)

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return day + '/' + month + '/' + year;
    }
    return (
        <>
            <Modal
                title="edit here"
                visible={edit}
                okText="save"
                onCancel={() => {
                    setedit(false)
                    seteditRecord(null)
                }}
                onOk={async () => {
                    const filter = await Data.map(val => {
                        if (val.key === editRecord.key) {
                            return editRecord
                        } else {
                            return val
                        }
                    })
                    console.log(filter)
                    localStorage.setItem("notes", JSON.stringify(filter))
                    setData(filter)
                    setedit(false)
                    seteditRecord(null)
                }}

            >
                {/* <Addtodo record={editRecord} seteditRecord={seteditRecord} /> */}
                <Form
                // onFinish={(values) => handelsubmit(values)}
                >

                    <Form.Item label="Title" >
                        <Input value={editRecord?.title} onChange={(e) => { seteditRecord(val => { return { ...val, title: e.target.value } }) }} />
                    </Form.Item>
                    <Form.Item label="description" >
                        <TextArea rows={4} value={editRecord?.description} onChange={(e) => { seteditRecord(val => { return { ...val, description: e.target.value } }) }} />
                    </Form.Item>
                    <Form.Item label="DatePicker" >
                        <RangePicker
                            defaultValue={[moment(editRecord?.createdAt, dateFormat), moment(editRecord?.dueDate, dateFormat)]}
                            // onChange={(e)=>{seteditRecord(val=>{return{...val,created:e.target.value}})}}
                            onChange={(e) => { console.log(e) }}
                            format={dateFormat}
                        />
                    </Form.Item>
                    {/* <Form.Item label="createdAt" name='createdAt'>

                        <DatePicker format={dateFormatList} defaultValue={moment(editRecord?.createdAt, dateFormatList[0])}
                            onChange={(e) => { seteditRecord(val => { return { ...val, createdAt: formatDate(e?._d) } }) }} />
                    </Form.Item>
                    <Form.Item label="dueDate" name='dueDate'>

                        <DatePicker format={dateFormatList} defaultValue={moment(editRecord?.dueDate, dateFormatList[0])}
                         onChange={(e) => { seteditRecord(val => { return { ...val, dueDate: formatDate(e?._d) } }) }} />
                    </Form.Item> */}
                    <Form.Item label="tags" >
                        <Input placeholder='enter space separeted unique tags' value={editRecord?.tags} onChange={(e) => { seteditRecord(val => { return { ...val, tags: e.target.value.split(',') } }) }} />
                    </Form.Item>
                    <Form.Item label="Status" >
                        <Select placeholder='select status' value={editRecord?.status}
                            onChange={(e) => { seteditRecord(val => { return { ...val, status: e } }) }}
                        //  onChange={(e) => { console.log(e)}}
                        >
                            <Select.Option value="Open">Open</Select.Option>
                            <Select.Option value="Working">Working</Select.Option>
                            <Select.Option value="Done">Done</Select.Option>
                            <Select.Option value="Overdue">Overdue</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Edittodo