import ShoutOutModel from "../models/ShoutOut";
import "./ShoutOut.css";

interface Props {
  shoutOut: ShoutOutModel;
}

const ShoutOut = ({ shoutOut }: Props) => {
  return (
    <li className="ShoutOut">
      <p>To: {shoutOut.to}</p>
      <p>From: {shoutOut.from}</p>
      <p>"{shoutOut.text}"</p>
    </li>
  );
};

export default ShoutOut;
