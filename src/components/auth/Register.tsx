import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createUser } from "../../services/UsersService";

type Props = { isOpen: boolean; toggleModal: () => void };

type FormType = {
   nickname: string;
   email: string;
   password: string;
   confirmPassword?: string;
};

type CreateResult = { succeeded: boolean; message: string[] };

const Register = ({ isOpen, toggleModal }: Props) => {
   const [result, setResult] = useState<CreateResult>({
      succeeded: false,
      message: [],
   });

   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<FormType>({
      defaultValues: {
         nickname: "PauloRocha",
         email: "paulo@test.com",
         password: "Mateus24:14",
         confirmPassword: "Mateus24:14",
      },
      mode: "onBlur",
   });

   const onRequestClose = (
      e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
   ) => {
      e.preventDefault();
      toggleModal();
   };

   const onSubmitHandle = (data: FormType) => {
      const params = {
         nickName: data.nickname,
         email: data.email,
         password: data.password,
      };
      createUser(params).then((response) => setResult(response));
   };

   return (
      <ReactModal
         isOpen={isOpen}
         shouldCloseOnOverlayClick={true}
         onRequestClose={onRequestClose}
         className="modal-menu"
         ariaHideApp={false}
      >
         <form onSubmit={handleSubmit(onSubmitHandle)}>
            {/* NICKNAME */}
            <div className="mb-3">
               <label className="form-label">NickName</label>
               <input
                  onFocus={() => setResult({ ...result, message: [] })}
                  {...register("nickname", {
                     required: {
                        value: true,
                        message: "Please fill in the 'NickName' field",
                     },
                     minLength: {
                        value: 5,
                        message:
                           "The 'NickName' must have at least 5 characters",
                     },
                  })}
                  type="text"
                  className="form-control"
               />
               {errors.nickname && (
                  <span className="text-danger">{errors.nickname.message}</span>
               )}
            </div>

            {/* EMAIL */}
            <div className="mb-3">
               <label className="form-label">Email address</label>
               <input
                  onFocus={() => setResult({ ...result, message: [] })}
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
                  onFocus={() => setResult({ ...result, message: [] })}
                  {...register("password", {
                     required: {
                        value: true,
                        message: "Please enter a password",
                     },
                     minLength: {
                        value: 8,
                        message:
                           "The password must be at least 8 characters long",
                     },
                     pattern: {
                        value: new RegExp(
                           "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[:!@#$%^&*])(?=.{8,})"
                        ),
                        message:
                           "Password must contain at least 1 special character, 1 cap letter, and 1 number",
                     },
                  })}
                  type="password"
                  className="form-control"
               />
               {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
               )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-3">
               <label className="form-label">Confirm Password</label>
               <input
                  onFocus={() => setResult({ ...result, message: [] })}
                  {...register("confirmPassword", {
                     validate: {
                        value: (x) => x === getValues("password"),
                     },
                  })}
                  type="password"
                  className="form-control"
               />
               {errors.confirmPassword && (
                  <span className="text-danger">Passwords are not equals</span>
               )}
            </div>

            <br />
            {result.succeeded
               ? result.message.map((msg: string) => (
                    <div key={msg} className="text-success h5">
                       {msg}
                    </div>
                 ))
               : result.message.map((msg: string) => (
                    <div key={msg} className="text-danger h5">
                       {msg}
                    </div>
                 ))}
            <div className="text-center my-4">
               {result?.succeeded ? (
                  <button className="btn btn-primary" onClick={toggleModal}>
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
                  onClick={toggleModal}
               >
                  Cancel
               </button>
            </div>
         </form>
      </ReactModal>
   );
};

export default Register;
