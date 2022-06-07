import { FormEvent, useState } from "react";
import ShoutOut from "../models/ShoutOut";
import "./ShoutOutForm.css";

interface Props {
  addShoutOut: (so: ShoutOut) => void;
}

const ShoutOutForm = ({ addShoutOut }: Props) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addShoutOut({ to, from, text });
    setTo("");
    setFrom("");
    setText("");
  };

  return (
    <form className="ShoutOutForm" onSubmit={submitHandler}>
      <label htmlFor="to">To:</label>
      <input
        type="text"
        name="to"
        id="to"
        onChange={(e) => setTo(e.target.value)}
        value={to}
      />
      <label htmlFor="from">From:</label>
      <input
        type="text"
        name="from"
        id="from"
        onChange={(e) => setFrom(e.target.value)}
        value={from}
      />
      <label htmlFor="text">Message:</label>
      <input
        type="text"
        name="text"
        id="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button>Submit Shoutout</button>
    </form>
  );
};

export default ShoutOutForm;
