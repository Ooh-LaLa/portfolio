import React, { Fragment, useState } from "react";
import { Prompt } from "react-router-dom";
import classes from "./contactForm.module.css";
import Button from "../UI/Button";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";

const ContactForm = (props) => {
    const [isEntering, setIsEntering] = useState(false);

    const sendFormToServer = async (formData) => {
        // Simulate sending form data to a server
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success
                resolve();
            }, 2000); // Simulate 2 seconds delay
        });
    };

    const {
        value: enteredFirstName,
        hasError: firstNameInputHasError,
        isValid: enteredFirstNameIsValid,
        valueChangeHandler: firstNameChangedHandler,
        inputBlurHandler: firstNameBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredLastName,
        hasError: lastNameInputHasError,
        isValid: enteredLastNameIsValid,
        valueChangeHandler: lastNameChangedHandler,
        inputBlurHandler: lastNameBlurHandler,
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        isValid: enteredEmailIsValid,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(value => value.includes('@'));

    const {
        value: enteredMessage,
        hasError: messageInputHasError,
        isValid: enteredMessageIsValid,
        valueChangeHandler: messageChangedHandler,
        inputBlurHandler: messageBlurHandler,
    } = useInput(value => value.trim().length >= 10);

    const formIsValid = enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid && enteredMessageIsValid;

    const [btnText, setBtnText] = useState('Send Message');
    const [isSent, setIsSent] = useState(false);

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if (!formIsValid || isSent) {
            return;
        }
        setIsSent(true);
        setBtnText("Sending ...");
        try {
            // Replace this with your actual form submission logic
            await sendFormToServer({
                firstName: enteredFirstName,
                lastName: enteredLastName,
                email: enteredEmail,
                message: enteredMessage
            });
            setBtnText("Message Sent");
        } catch (error) {
            console.error("Error sending message:", error);
            setBtnText("Error Sending");
        }
    };

    const formFocusedHandler = () => {
        setIsEntering(true);
    };

    const nonThemeColor = useSelector(state => state.nonThemeColor);

    return (
        <Fragment>
            <Prompt
                when={isEntering}
                message="Are you sure you want to leave? All your entered data will be lost!"
            />
            <div className={classes.contactFormCard}>
                <h1 className="h1Message animate__animated animate__backInRight"  style={{ color: !nonThemeColor}}>Leave A Message</h1>
                <form
                    onFocus={formFocusedHandler}
                    onSubmit={formSubmitHandler}
                    className={classes.contactForm}
                >
                    <div className={classes.formGroup}>
                        <input
                            type="text"
                            value={enteredFirstName}
                            onBlur={firstNameBlurHandler}
                            onChange={firstNameChangedHandler}
                            className={`${classes.Input} ${firstNameInputHasError ? classes.invalidInput : ''}`}
                            placeholder="First Name"
                            disabled={isSent}
                        />
                        <input
                            type="text"
                            value={enteredLastName}
                            onBlur={lastNameBlurHandler}
                            onChange={lastNameChangedHandler}
                            className={`${classes.Input} ${lastNameInputHasError ? classes.invalidInput : ''}`}
                            placeholder="Last Name"
                            disabled={isSent}
                        />
                        <input
                            type="email"
                            value={enteredEmail}
                            onBlur={emailBlurHandler}
                            onChange={emailChangedHandler}
                            className={`${classes.Input} ${emailInputHasError ? classes.invalidInput : ''}`}
                            placeholder="Email"
                            disabled={isSent}
                        />
                    </div>
                    <textarea
                        value={enteredMessage}
                        onBlur={messageBlurHandler}
                        onChange={messageChangedHandler}
                        className={`${classes.Input} ${messageInputHasError ? classes.invalidInput : ''} ${classes.textArea}`}
                        placeholder="Message"
                        disabled={isSent}
                    ></textarea>
                    <div className={classes.sendBtn}>
                        <Button type="submit" disabled={!formIsValid || isSent}>{btnText}</Button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default ContactForm;
