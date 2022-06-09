import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <h1>
        <Link to="/">GC Shoutouts</Link>
      </h1>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.displayName}</p>
          <img
            src={user.photoURL!}
            alt={user.displayName!}
            className="user-img"
          />
          <button onClick={signOut}>Sign Out</button>
          <p>
            <Link to="/me">See my s/o's!</Link>
          </p>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in</button>
      )}
    </header>
  );
};

export default Header;
