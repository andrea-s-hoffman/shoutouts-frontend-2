import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  getAllShoutoutsToFromMe,
  upvoteShoutout,
} from "../services/shoutOutService";
import "./MeRoute.css";
import ShoutOutListItem from "./ShoutOut";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [myShoutOuts, setMyShoutouts] = useState<ShoutOut[]>();

  useEffect(() => {
    if (user) {
      getAllShoutoutsToFromMe(user?.displayName || "Anonymous").then((res) => {
        setMyShoutouts(res);
      });
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then(() => {
      getAllShoutoutsToFromMe(user?.displayName || "Anonymous").then((res) =>
        setMyShoutouts(res)
      );
    });
  };

  return (
    <div className="MeRoute">
      <h2>My Shoutouts</h2>
      <ul>
        {myShoutOuts?.map((item) => (
          <ShoutOutListItem
            key={item._id}
            shoutOut={item}
            deleteHandler={() => {}}
            upvoteHandler={upvoteHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default MeRoute;
