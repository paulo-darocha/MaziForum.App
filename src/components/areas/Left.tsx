import {
   faRegistered,
   faSignInAlt,
   faSignOutAlt,
   faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "../auth/Login";
import { useState } from "react";
import Register from "../auth/Register";
import { useAppSelector } from "../../storeRedux/ReduxStore";
import Logout from "../auth/Logout";
const LeftComponent = () => {
   const [isLoginOpen, setIsLoginOpen] = useState(false);
   const [isLogoutOpen, setIsLogoutOpen] = useState(false);
   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
   const user = useAppSelector((x) => x.user);

   const toggleLoginModal = () => {
      setIsLoginOpen(!isLoginOpen);
   };

   const toggleLogoutModal = () => {
      setIsLogoutOpen(!isLogoutOpen);
   };

   const toggleRegisterModal = () => {
      setIsRegisterOpen(!isRegisterOpen);
   };

   return (
      <h4 className="border">
         <div className="d-grid gap-3 mt-4">
            {user.isLogged && (
               <>
                  <button className="btn btn-primary">
                     {user.nickName}
                     <FontAwesomeIcon
                        icon={faUser}
                        size="lg"
                        className="ms-3"
                     />
                  </button>
                  <Login isOpen={isLoginOpen} toggleModal={toggleLoginModal} />
               </>
            )}

            {!user.isLogged && (
               <>
                  <button
                     className="btn btn-primary"
                     onClick={toggleLoginModal}
                  >
                     LOGIN
                     <FontAwesomeIcon
                        icon={faSignInAlt}
                        size="xl"
                        className="ms-3"
                     />
                  </button>
                  <Login isOpen={isLoginOpen} toggleModal={toggleLoginModal} />
               </>
            )}

            {!user.isLogged && (
               <>
                  <button
                     className="btn btn-primary"
                     onClick={toggleRegisterModal}
                  >
                     REGISTER
                     <FontAwesomeIcon
                        icon={faRegistered}
                        size="xl"
                        className="ms-3"
                     />
                  </button>
                  <Register
                     isOpen={isRegisterOpen}
                     toggleModal={toggleRegisterModal}
                  />
               </>
            )}

            {user.isLogged && (
               <>
                  <button
                     className="btn btn-primary"
                     onClick={toggleLogoutModal}
                  >
                     LOGOUT
                     <FontAwesomeIcon
                        icon={faSignOutAlt}
                        size="lg"
                        className="ms-3"
                     />
                  </button>
                  <Logout
                     isOpen={isLogoutOpen}
                     toggleModal={toggleLogoutModal}
                  />
               </>
            )}
         </div>
      </h4>
   );
};

export default LeftComponent;
