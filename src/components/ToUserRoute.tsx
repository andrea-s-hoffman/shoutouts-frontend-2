import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  deleteShoutout,
  getAllShoutOutsToUser,
  postNewShoutOut,
  upvoteShoutout,
} from "../services/shoutOutService";
import ShoutOutListItem from "./ShoutOut";
import ShoutOutForm from "./ShoutOutForm";
import "./ToUserRoute.css";

const ToUserRoute = () => {
  const to: string = useParams().to!;
  const [usersShoutouts, setUsersShoutouts] = useState<ShoutOut[]>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getAllShoutOutsToUser(to).then((res) => {
      setUsersShoutouts(res);
    });
  }, [to]);

  const addShoutOut = (so: ShoutOut): void => {
    postNewShoutOut(so).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUsersShoutouts(res);
      });
    });
  };

  const deleteHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUsersShoutouts(res);
      });
    });
  };

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUsersShoutouts(res);
      });
    });
  };

  return (
    <div className="ToUserRoute">
      <h2>All Shoutouts to: {to}</h2>
      {user ? (
        <ShoutOutForm addShoutOut={addShoutOut} toUser={to} />
      ) : (
        <p>Please sign in to add a shoutout</p>
      )}
      <ul>
        {usersShoutouts?.map((item) => (
          <ShoutOutListItem
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

export default ToUserRoute;
