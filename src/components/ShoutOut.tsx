import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOutModel, { User } from "../models/ShoutOut";
import { upvoteShoutout } from "../services/shoutOutService";
import "./ShoutOut.css";

interface Props {
  shoutOut: ShoutOutModel;
  deleteHandler: (id: string) => void;
  upvoteHandler: (user: User, id: string) => void;
}

const ShoutOut = ({ shoutOut, deleteHandler, upvoteHandler }: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <li className="ShoutOut">
      <div className="shoutout-info">
        <button onClick={() => deleteHandler(shoutOut?._id!)}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <p>
          <span className="to-from">To:</span>
          <Link to={`/user/${shoutOut.to}`}>{shoutOut.to}</Link>
        </p>
        <div className="from-container">
          <p className="to-from">From: </p>
          {shoutOut.photoUrl && (
            <img
              src={shoutOut.photoUrl}
              alt={shoutOut.from}
              className="from-img"
            />
          )}
          <p>
            <Link to={`/user/${shoutOut.from}`}>{` ${shoutOut.from}`}</Link>
          </p>
        </div>
      </div>
      <p className="shoutout-text">"{shoutOut.text}"</p>
      {shoutOut.image && (
        <img
          src={shoutOut.image}
          alt={shoutOut.text}
          className="shoutout-img"
        />
      )}
      {user ? (
        <div className="votes-container">
          <button>downvote</button>
          <p>{shoutOut.likes ? shoutOut.likes.length : "0"} likes</p>
          <button
            onClick={() =>
              upvoteHandler(
                { displayName: user.displayName || "anonymous", uid: user.uid },
                shoutOut._id!
              )
            }
          >
            upvote
          </button>
        </div>
      ) : (
        <div>
          <p>{shoutOut.likes ? shoutOut.likes.length : "0"} likes</p>
          <p>Please log in to upvote / downvote</p>
        </div>
      )}
    </li>
  );
};

export default ShoutOut;
