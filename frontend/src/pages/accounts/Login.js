import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import { useAppContext } from "store";
import { setToken } from "store";

function Login({ Open, Close }) {
    const { dispatch } = useAppContext();
    const location = useLocation();
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});
    const [openModal, setOpenModal] = useState(true);

    const { from: loginRedirectUrl } = location.state || {
        from: { pathname: "/" },
    };

    const onFinish = (values) => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };

            try {
                const response = await Axios.post(
                    "http://localhost:8000/accounts/token/",
                    data
                );
                const {
                    data: { token: jwtToken },
                } = response; // const jwtToken = response.data.token

                dispatch(setToken(jwtToken));

                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });

                setOpenModal(false);

                history.push(loginRedirectUrl); // TODO: 이동주소
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "로그인 실패",
                        description: "아이디/암호를 확인해주세요",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
                    });
                    const { data: fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages => { username: "m1 m2", ...}
                    // python : mydict.items()
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                // erros : ["m1", "m2"].join(" ") => "m1 m2"
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" "),
                                };
                                return acc;
                            },
                            {}
                        )
                    );
                }
            }
        }
        fn();
    };

    return (
        <>
            {Open ? (
                <Modal
                    title="로그인"
                    visible={Open && openModal}
                    footer={null}
                    onCancel={Close}
                    // cancelButtonProps={{ style: { display: "none" } }}
                    // okButtonProps={{ style: { display: "none" } }}
                >
                    <Form
                        {...layout}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                                {
                                    min: 5,
                                    message: "5글자 이상 입력해주세요",
                                },
                            ]}
                            hasFeedback
                            {...fieldErrors.username}
                            {...fieldErrors.non_field_errors}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            {...fieldErrors.password}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                로그인
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            ) : null}
        </>
    );
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 10, span: 16 },
};

export default Login;
