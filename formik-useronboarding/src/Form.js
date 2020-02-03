
import React, { useState, useEffect } from "react";

import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'






const UserForm = () => {

    return (
        <div className='form-div'>
            <Form>
            <label>Name
                <Field type='text'
                name='name'
                />
                </label>


            <label>
                Email
                <Field type='email'
                name='email' />
            </label>


            <label>
                Password
                <Field type='password'
                name='password' />
            </label>

            <label>
                Role
                <Field as='select' name='role'>
                    <option disabled='chooseRoll'>choose your role in the forum</option>
                    <option value='comedian'>comedian</option>
                    <option value='superiority complex'>superiority complex</option>
                    <option value='troll'>troll</option>
                </Field>
            </label>


            <label>
                Agree to Terms of Service
                <Field type='checkbox'
                name='terms' />
            </label>



            <button type='submit'>Submit</button>



            </Form>

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
    name:Yup.string().required()
})
})(UserForm)
export default FormikForm