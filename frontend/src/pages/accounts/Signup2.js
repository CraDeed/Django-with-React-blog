// import React, { useEffect, useState } from "react";
// import { Modal, Alert } from "antd";
// import { useHistory } from "react-router-dom";
// import Axios from "axios";
// import "./Signup.scss";

// function Signup({ Open, Close }) {
//     const history = useHistory();
//     const [inputs, setInputs] = useState({
//         username: "",
//         nickname: "",
//         password: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [formDisabled, setFormDisabled] = useState(true);
//     const [openModal, setOpenModal] = useState(true);

//     const onChange = (e) => {
//         const { name, value } = e.target;
//         setInputs((prev) => ({
//             ...prev,
//             // 배열, 리스트 문법이 아니라 평가하는 문법
//             [name]: value,
//         }));
//     };

//     const onSubmit = (e) => {
//         e.preventDefault();

//         setLoading(true);
//         setErrors({});

//         Axios.post("http://localhost:8000/accounts/signup/", inputs)
//             .then((response) => {
//                 console.log("response : ", response);
//                 setOpenModal(false);
//                 history.push("/accounts/login/");
//             })
//             .catch((error) => {
//                 console.log("error : ", error.response);
//                 if (error.response) {
//                     setErrors({
//                         username: (error.response.data.username || []).join(
//                             " "
//                         ),
//                         nickname: (error.response.data.nickname || []).join(
//                             " "
//                         ),
//                         password: (error.response.data.password || []).join(
//                             " "
//                         ),
//                     });
//                 }
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         const isEnabled = Object.values(inputs).every((s) => s.length > 0);
//         setFormDisabled(!isEnabled);
//     }, [inputs]);

//     return (
//         <>
//             {Open ? (
//                 <Modal
//                     title="회원가입"
//                     visible={Open && openModal}
//                     onOk={onSubmit}
//                     onCancel={Close}
//                     okText="회원가입"
//                     okButtonProps={{ disabled: loading || formDisabled }}
//                 >
//                     <div className="modalContents">
//                         <form>
//                             <div>
//                                 <input
//                                     className="loginId"
//                                     type="text"
//                                     name="username"
//                                     placeholder="아이디"
//                                     onChange={onChange}
//                                 />
//                                 {errors.username && (
//                                     <Alert
//                                         type="error"
//                                         message={errors.username}
//                                     />
//                                 )}
//                             </div>
//                             <div>
//                                 <input
//                                     className="loginPw"
//                                     type="text"
//                                     name="nickname"
//                                     placeholder="닉네임"
//                                     onChange={onChange}
//                                 />
//                                 {errors.nickname && (
//                                     <Alert
//                                         type="error"
//                                         message={errors.nickname}
//                                     />
//                                 )}
//                             </div>
//                             <div>
//                                 <input
//                                     className="loginNick"
//                                     type="password"
//                                     name="password"
//                                     placeholder="패스워드"
//                                     onChange={onChange}
//                                 />
//                                 {errors.password && (
//                                     <Alert
//                                         type="error"
//                                         message={errors.password}
//                                     />
//                                 )}
//                             </div>
//                         </form>
//                     </div>
//                 </Modal>
//             ) : null}
//         </>
//     );
// }

// export default Signup;
