import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  deleteShoutout,
  getAllShoutOuts,
  postNewShoutOut,
  upvoteShoutout,
} from "../services/shoutOutService";
import "./Main.css";
import ShoutOutComponent from "./ShoutOut";
import ShoutOutForm from "./ShoutOutForm";

const Main = () => {
  const { user } = useContext(AuthContext);

  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>();
  useEffect(() => {
    getAllShoutOuts().then((res) => {
      setShoutOuts(res);
    });
  }, []);

  const addShoutOut = (so: ShoutOut): void => {
    postNewShoutOut(so).then(() => {
      getAllShoutOuts().then((response) => setShoutOuts(response));
    });
  };

  const deleteHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAllShoutOuts().then((response) => setShoutOuts(response));
    });
  };

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then(() => {
      getAllShoutOuts().then((res) => setShoutOuts(res));
    });
  };

  return (
    <div className="Main">
      {user ? (
        <ShoutOutForm addShoutOut={addShoutOut} toUser="" />
      ) : (
        <p>Please sign in to add a shoutout</p>
      )}
      <ul>
        {shoutOuts?.map((item) => (
          <ShoutOutComponent
            key={item._id}
            shoutOut={item}
            deleteHandler={deleteHandler}
            upvoteHandler={upvoteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default Main;
