import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import login_bg from '../../assets/img/car_bg.jpg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const LoginForm = ({ onDataSubmit, loading, error }) => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('this field is required !')
            .email('Email not valid !'),
        password: Yup.string()
            .min(6, 'password not valid !')
            .required('this field is required !'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = data => {
        console.log(data)
        onDataSubmit(data);
    }

    return (
        <div className="row m-0 login-container bg-wt">

            <div className="col-md-8 h-100 ">


                <div className="col-md-8 offset-md-2  mt-5" >
                    <h1 className="color-primary ps-0 mb-5">Sign in</h1>
                    {error &&

                        <div className="alert alert-danger" role="alert">
                            <FontAwesomeIcon icon={['fas', 'exclamation-circle']} /> <span className="ps-3">{error}</span>
                        </div>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} className="ps-2">
                        <div className="form-group">
                            <label className="fnt-w5"><FontAwesomeIcon icon={['fas', 'envelope']} /> E-mail</label>
                            <input placeholder="e-mail ..."  {...register("email")} className={`form-control ${errors.email ? 'is-invalid' : 'form-control'}`} />
                            <p className="text-danger">{errors.email?.message}</p>
                        </div>

                        <div className="form-group">
                            <label className="fnt-w5"><FontAwesomeIcon icon={['fas', 'unlock-alt']} /> Password</label>
                            <input type="password" placeholder="password ..."  {...register("password")} className={`form-control ${errors.password ? 'is-invalid' : 'form-control'}`} />
                            <p className="text-danger">{errors.password?.message}</p>
                        </div>


                        <div className="col-md-12 text-center" >
                            {loading ?
                                <div className="col-md-12 p-4 text-ctr">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <button type="submit" className="btn btn-primary btn-login mt-4 w-25 float-end" >Sign-in</button>
                            }
                        </div>

                    </form>

                </div>

            </div>



            <div className="col-md-4 h-100 side-bg-container" >
                <img src={login_bg} className="side-bg" alt="" />
            </div>
        </div>
    )
};

export default LoginForm;