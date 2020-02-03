
import React, { useState, useEffect } from "react";

import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'






const UserForm = ({values,errors,touched,status}) => {
 const [users, setUsers] = useState([]);
 useEffect(()=>{
     console.log('status has changed', status);
     status && setUsers(users => 
        [...users, status])
 },[status])

    return (
        <div className='form-div'>
            <Form>
            <label>Name
                <Field type='text'
                name='name'
                />
                {touched.name && errors.name && <p className='errors'>{errors.name}</p>}
                </label>


            <label>
                Email
                <Field type='email'
                name='email' />
                {touched.email && errors.email && <p className='errors'>{errors.email}</p>}
            </label>


            <label>
                Password
                <Field type='password'
                name='password' />
                {touched.password && errors.password && <p className='errors'>{errors.password}</p>}
            </label>

            <label>
                Role
                <Field as='select' name='role'>
                    <option value ='chooseRole'>choose your role</option>
                    <option value='frontEndDev'>Front End Dev</option>
                    <option value='backEndDev'>Back End Dev</option>
                    <option value='dataScience'>Data Scientist</option>
                    <option value='other'>other</option>
                </Field>
            </label>
            
            {/* if 'choose role' option in dropdown box is disabled then then the first actual option(frontEndDev) will already be filled in though if nothing else is selected it will still post an empty string to the api */}


            <label>
                Agree to Terms of Service
                <Field type='checkbox'
                name='terms' />
                {touched.terms && errors.terms && <p className='errors'>{errors.terms}</p>}
            </label>



            <button type='submit'>Submit</button>



            </Form>

            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Role: {user.role}</li>
                </ul>
            ))}

        </div>
    )

}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, role, terms}){
    return {
        name: name ||  '',
        email: email || '',
        password: password || '',
        role: role || '',
        terms: terms || false,

    };

},
validationSchema:Yup.object().shape({
    name: Yup.string().required('you must enter a name in order to sign up'),
    email: Yup.string().email().required('you must enter an email in order to sign up'),
    password: Yup.string().min(20).required('you must enter a password in order to sign up'),
    terms:  Yup.boolean().oneOf([true], 'you must accept our terms of service in order to sign up'),
    
}),

handleSubmit(values, {setStatus}) {
    console.log('submitting', values);
    axios.post('https://reqres.in/api/users_',values)
    .then(res => {
        console.log('post is working', res)
        setStatus(res.data)
    })
    .catch(err => console.log(err.res))
}

})(UserForm)
export default FormikForm