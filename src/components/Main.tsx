import { useEffect, useState } from "react";
import ShoutOut from "../models/ShoutOut";
import { getAllShoutOuts, postNewShoutOut } from "../services/shoutOutService";
import "./Main.css";
import ShoutOutComponent from "./ShoutOut";
import ShoutOutForm from "./ShoutOutForm";

const Main = () => {
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
  return (
    <div className="Main">
      <ul>
        {shoutOuts?.map((item) => (
          <ShoutOutComponent key={item._id} shoutOut={item} />
        ))}
      </ul>
      <ShoutOutForm addShoutOut={addShoutOut} />
    </div>
  );
};

export default Main;
