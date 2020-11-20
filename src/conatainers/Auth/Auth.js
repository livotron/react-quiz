import { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.scss';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';
import { connect } from 'react-redux';
import { auth } from '../../store/Actions/auth';


function validateEmail(email) {
    const re = /[a-zA-z]+@[a-zA-Z]+\.[a-zA-z]/;
    return re.test(String(email).toLowerCase());
}
class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Incorrect email address',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Incorrect password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            }
        }
    }
    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls,
            isFormValid
        })
    }
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        });
    };

    loginHandler = () => {
        console.log(this.props)
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

    };

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIUgeASstpgL-GhFmgwihBXtLTCIfY2yE', authData);
        //     console.log(response)
        // } catch (e) {
        //     console.log(e);
        // }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {/* <Input
                            label="Email"
                            errorMessage="TEST"
                        />
                        <Input label="Password" /> */}
                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >LOG IN
                    </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}

                        >REGISTER </Button>
                    </form>
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => 
            dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);