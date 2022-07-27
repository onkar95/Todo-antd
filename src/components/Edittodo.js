import React, { useContext } from 'react'
import { Modal } from 'antd';
import 'antd/dist/antd.min.css'
import {
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.min.css'
import DataContext from '../context/Todo';

const Edittodo = () => {
    const { Data, editRecord, seteditRecord, edit, setedit, setadded, added } = useContext(DataContext);
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

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
                    seteditRecord(null)
                    setedit(false)
                }}
                onOk={async () => {
                    const Edited = await Data.map(val => {
                        if (val.key === editRecord.key) {
                            return editRecord
                        } else {
                            return val
                        }
                    })
                    localStorage.setItem("notes", JSON.stringify(Edited))
                    setedit(false)
                    setadded((pre) => added === true ? false : true)
                    seteditRecord(null)
                }}

            >
                <Form>

                    <Form.Item label="Title" >
                        <Input value={editRecord?.title} onChange={(e) => { seteditRecord(val => { return { ...val, title: e.target.value } }) }} />
                    </Form.Item>
                    <Form.Item label="description" >
                        <TextArea rows={4} value={editRecord?.description} onChange={(e) => { seteditRecord(val => { return { ...val, description: e.target.value } }) }} />
                    </Form.Item>
                    <Form.Item label="DatePicker" >
                        <RangePicker
                            value={[moment(editRecord?.createdAt, dateFormatList[0]), moment(editRecord?.dueDate, dateFormatList[0])]}
                            format={dateFormatList[0]}
                            onChange={(e) => {
                                seteditRecord(val => {
                                    const date = formatDate(e[1]?._d)
                                    return { ...val, dueDate: date }
                                })
                            }}
                            disabled={[true, false]}
                        />
                    </Form.Item>

                    <Form.Item label="tags" >
                        <Input placeholder='enter space separeted unique tags' value={editRecord?.tags} onChange={(e) => { seteditRecord(val => { return { ...val, tags: e.target.value.split(',') } }) }} />
                    </Form.Item>
                    <Form.Item label="Status" >
                        <Select placeholder='select status' value={editRecord?.status}
                            onChange={(e) => { seteditRecord(val => { return { ...val, status: e } }) }}
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