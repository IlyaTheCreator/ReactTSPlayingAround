import React, { useState } from "react"
import { IState as IAppState } from "../App"

interface IProps {
    setPeople: React.Dispatch<React.SetStateAction<IAppState["people"]>>
}

const AddToList: React.FC<IProps> = ({ setPeople }) => {

    const [input, setInput] = useState({
        name: "",
        age: "",
        url: "",
        note: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setInput({
            ...input, 
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (): void => {
        if (
            input.name.trim() === "" ||
            input.age.trim() === "" ||
            input.url.trim() === "" 
        ) {
            return
        }

        setPeople(prev => {
            return [...prev, {
                name: input.name,
                age: parseInt(input.age),
                url: input.url,
                note: input.note
            }]
        })

        setInput({
            name: "",
            age: "",
            url: "",
            note: ""
        })
    }

    return (
        <div className="AddToList">
            <input 
                type="text"
                placeholder="Name"
                className="AddToList-input"
                value={input.name}
                onChange={handleChange}
                name="name"
            />
            <input 
                type="text"
                placeholder="Age"
                className="AddToList-input"
                value={input.age}
                onChange={handleChange}
                name="age"
            />
            <input 
                type="text"
                placeholder="Image Url"
                className="AddToList-input"
                value={input.url}
                onChange={handleChange}
                name="url"
            />
            <textarea 
                placeholder="Note"
                className="AddToList-input"
                value={input.note}
                name="note"
                onChange={handleChange}
            />
            <button
                className="AddToList-btn"
                onClick={handleClick}
            >
                Add to List
            </button>
        </div>
    )
}

export default AddToList