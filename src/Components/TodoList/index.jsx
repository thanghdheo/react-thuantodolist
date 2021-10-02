import React,{ useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"
import { Button, Form, FormGroup, Input, Label  } from 'reactstrap';
import './TodoInput.scss'
import './TodoList.scss'
import * as yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';


TodoList.propTypes = {
    onHandleSubmit: PropTypes.func,
    onHandleSearch : PropTypes.func,
    onHandleUpdate : PropTypes.func,
    listTodo: PropTypes.array,
    handleDelete : PropTypes.func,
   
};

TodoList.defaultProps = {
    onHandleSubmit: null,
    onHandleUpdate : null,
    onHandleSearch: null,
    listTodo: [],
    handleDelete : null
}

function TodoList(props) {
    const {listTodo,handleDelete,onHandleSubmit,onHandleUpdate} = props;

    const [show,setShow] = useState(false);
    const [id,setId] = useState(0);
    const [search,setSearch] = useState([...listTodo])

    useEffect(()=>{
        setSearch(listTodo);
    },[listTodo]);

    const validate = yup.object().shape({
        name: yup.string().required("Vui lòng nhập trường này")
    })

    const {control,handleSubmit,formState: {errors},setValue,getValues} = useForm({
        resolver: yupResolver(validate) 
    });

    const handleSubmitData = (data) => {
        if(onHandleSubmit){
            onHandleSubmit(data);
            setValue("name",'');
            setShow(false);
        }
    }


    const onHandleDelete = (e) => {
        const index = listTodo.findIndex((todo) => todo.id === e.target.name)
        handleDelete(index);
        setValue("name", '');
    }

    
    const handleSetInput = (e) => {
        const find = listTodo.find((todo) => todo.id.indexOf(e.target.name) !== -1);
        setValue("name",find.name); 
        setId(find.id)
        setShow(true);
    }

    const handleUpdate = () => {
        if(onHandleUpdate){
            const value = {
                id: id,
                name: getValues("name")
            }
            onHandleUpdate(id,value)
        }
        setValue('name','')
        setShow(false)
    }

    const onHandleSearch =(e) =>{
        const result = listTodo.filter((todo) => todo.name.trim().toLowerCase().indexOf(e.target.value.trim().toLowerCase()) !== -1);
        setSearch(result);
        

    }
    
    return (
        <div className="mf-2 todoform">
            <Form onSubmit={handleSubmit((data)=>handleSubmitData(data))} >
                
                <FormGroup >
                    <Label className="todoform__name" id="nameId">Input work name</Label>
                    <Controller 
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field})=>{
                            return <>
                                        <Input className="mt-2 todoform__input" id="nameId" placeholder="Enter your work..." {...field} onInput={(e) => onHandleSearch(e)} />
                                        <span className="todoform__error">{errors.name?.message}</span>
                                        {console.log(field)}
                                    </>
                        }
                    }
                    />
                    
                    <Button type="Submit" className="mt-2" color="success">Add</Button>
                    {show?<Button type="button" onClick={handleUpdate} className="mt-2" style={{marginLeft: '4px'}} color="primary">Update</Button>:null}
                </FormGroup>
                
            </Form>
            <div className="todolist">
                <ul  className="todolist__ul">
                    {
                        search.map((todo,index) =>{
                            return (
                                <li className="todolist__li d-flex justify-content-between" key={index}>
                                    <p>
                                        {todo.name}
                                    </p>
                                
                                    <div>
                                        <Button onClick={handleSetInput} name={todo.id} color="warning">Update</Button>
                                        <Button onClick={(e) => onHandleDelete(e)} style={{marginLeft: '4px'}} name={todo.id} color="danger">Delete</Button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            
        </div>
       
    );
       
}

export default TodoList;




