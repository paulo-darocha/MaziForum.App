import ReactModal from "react-modal";
import { useAppDispatch } from "../../storeRedux/ReduxStore";
import { addUser } from "../../storeRedux/UserReducer";
import { userLogout } from "../../services/UsersService";

type Props = { isOpen: boolean; toggleModal: () => void };

const Logout = ({ isOpen, toggleModal }: Props) => {
   const dispatch = useAppDispatch();

   const onClickExit = () => {
      dispatch(
         addUser({
            id: "",
            token: "x",
            nickName: "(visitor)",
            email: "",
            imageUrl: "",
            isLogged: false,
         })
      );
      userLogout().then(() => toggleModal());
   };

   return (
      <ReactModal
         isOpen={isOpen}
         shouldCloseOnOverlayClick={true}
         onRequestClose={onClickExit}
         className="modal-menu"
         ariaHideApp={false}
      >
         <form>
            <div className="text-center my-4">
               <h5>Are sure do you want to logout?</h5>
               <br />
               <br />
               <button className="btn btn-primary" onClick={onClickExit}>
                  Yes
               </button>
               <button
                  type="submit"
                  className="btn btn-secondary ms-4"
                  onClick={toggleModal}
               >
                  Cancel
               </button>
            </div>
         </form>
      </ReactModal>
   );
};

export default Logout;
