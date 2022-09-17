import React, { useState } from 'react';
import TextField from '../../Components/TextField/TextField';
import BrowseImages from '../../Components/BrowseImages/BrowseImages';
import ActionButton from '../../Components/ActionButton/ActionButton';
import './UploadImageContainer.css'

function UploadImageContainer(props) {

    const [fileUrl, setFileUrl] = useState(new Array(props.imgLimit).fill(undefined));
    const [file, setFile] = useState(new Array(props.imgLimit).fill(undefined));
    const [filesValid, setFilesValid] = useState(false);
    const [customerID, setCustomerID] = useState("");
    const [errorColor, setErrorColor] = useState("red");
    const [errorText, setErrorText] = useState("");
    const postData = (event) => {
        event.preventDefault();
        if (filesValid) {
            
            setErrorText("Waiting..")
            setErrorColor("gray")
            const xhr = new XMLHttpRequest();
            let formdata = new FormData();
            formdata.append("uploadedImage1", file[0]);
            formdata.append("uploadedImage2", file[1]);
            formdata.append("uploadedImage3", file[2]);
            formdata.append("customerID", customerID);

            xhr.open("POST", '/upload', true);
            // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let res = JSON.parse(xhr.responseText);
                    if (res.error==true) {
                        setErrorText("Something went wrong with upload");
                        setErrorColor("red");
                    }
                    else {
                        setErrorText("Images uploaded successfully");
                        setErrorColor("green");
                    }

                }
            };
            xhr.send(formdata);

        }
    }

    return (
        <div className="UploadImageContainer">
            <p>{props.headingText}</p>
            <TextField hint="Customer ID" setCustomerID={setCustomerID} />
            <ActionButton text={props.submitButtonText} handleClick={postData} />
            <BrowseImages imgLimit={props.imgLimit} allowMultiple={props.allowMultiple} fileUrl={fileUrl} setFileUrl={setFileUrl} filesValid={filesValid} setFilesValid={setFilesValid} file={file} setFile={setFile} />
            <label style={{ color: errorColor }}>{errorText}</label>
        </div>
    )
}
export default UploadImageContainer;