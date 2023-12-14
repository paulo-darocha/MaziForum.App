import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userLogin } from "../../services/UsersService";
import { useAppDispatch } from "../../storeRedux/ReduxStore";
import { addUser, isLogged } from "../../storeRedux/UserReducer";

type Props = { isOpen: boolean; toggleModal: () => void };

type LoginResult = { succeeded: boolean; message: string };

type Credentials = { email: string; password: string };

const Login = ({ isOpen, toggleModal }: Props) => {
   const [result, setResult] = useState<LoginResult>({
      succeeded: false,
      message: "",
   });
   const dispatch = useAppDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<Credentials>({
      defaultValues: { email: "paulo@test.com", password: "Mateus24:14" },
   });

   const onClickExit = () => {
      if (result.succeeded) dispatch(isLogged(true));
      toggleModal();
   };

   const onSubmitHandler = (data: Credentials) => {
      userLogin(data).then((res) => {
         setResult({ succeeded: res.succeeded, message: res.message });
         console.log(res);
         if (res.succeeded)
            dispatch(
               addUser({
                  id: res.id,
                  token: res.token ?? "x",
                  nickName: res.nickName,
                  email: res.email,
                  imageUrl: res.imageUrl ?? "",
                  isLogged: false,
               })
            );
      });
   };

   return (
      <ReactModal
         isOpen={isOpen}
         shouldCloseOnOverlayClick={true}
         onRequestClose={onClickExit}
         className="modal-menu"
         ariaHideApp={false}
      >
         <form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* EMAIL */}
            <div className="mb-3">
               <label className="form-label">Email address</label>
               <input
                  
                  {...register("email", {
                     required: {
                        value: true,
                        message: "Please fill in the 'Email' field",
                     },
                     pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email address",
                     },
                  })}
                  type="email"
                  className="form-control"
               />
               {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
               )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
               <label className="form-label">Password</label>
               <input
                  {...register("password", {
                     required: {
                        value: true,
                        message: "Please enter a password",
                     },
                  })}
                  type="password"
                  className="form-control"
               />
               {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
               )}
            </div>

            <br />
            <div className="text-center">
               {result.succeeded ? (
                  <span className="text-success h5">{result.message}</span>
               ) : (
                  <span className="text-danger h5">{result.message}</span>
               )}
            </div>
            <div className="text-center my-4">
               {result!.succeeded ? (
                  <button className="btn btn-primary" onClick={onClickExit}>
                     Ok
                  </button>
               ) : (
                  <button type="submit" className="btn btn-primary">
                     Submit
                  </button>
               )}
               <button
                  type="submit"
                  className="btn btn-secondary ms-4"
                  onClick={onClickExit}
               >
                  Cancel
               </button>
            </div>
         </form>
      </ReactModal>
   );
};

export default Login;
