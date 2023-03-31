import React, { ChangeEvent, useState } from "react";
import axios from "axios";
type Props = {}

const FileUpload = function({}: Props) {

    const [selectedFile, setSelectedFile] = useState<File | string >(null!);

    const handleChange = function(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if(event.target.files) {
            setSelectedFile(event.target.files[0])
        }
    }

    const handleSubmit = async function() {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const metadata = JSON.stringify({
                name: "fileName",
            })

            formData.append('pinataMetadata', metadata);

            const options = JSON.stringify({
                cidVersion: 0,
            })

            formData.append('pinataOptions', options);

            try {
                const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData}`,
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzOTBlYTJkYy04ZDc5LTQzYWMtYjFkOS0zYTE5ZWRkZTkzNzYiLCJlbWFpbCI6Im5ndXllbmtoYW5oMTcxMTIwMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjNlNGQxNTMxYzU2NjcwZmE4ZWM0Iiwic2NvcGVkS2V5U2VjcmV0IjoiOTY3YjEwODMxYzJiOWExYTA2NGExODIwNDYwYjEzYjUwMDIzZmNhNGJlOTE0MGIwODJhZmMyYzlmMGM0OGM1NCIsImlhdCI6MTY4MDE0NDk2N30.KU-O6O-6Pqb4BYJIDKmAUTC_tTIKYKyeB2_qrgxVGDY`
                    }
                })

                console.log(response.data); // https://gateway.pinata.cloud/ipfs/QmW4D41MJBpRLSxrLQHWbnPFcDT3PHyVCHnyoFMQ9mjfvM
            } catch(error) {
                console.log(error);
            }
        } catch(error) {
            console.log(error);
        }
    }
    return (
        <>
            <label htmlFor="">Choose File</label>
            <input type="file" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default FileUpload;