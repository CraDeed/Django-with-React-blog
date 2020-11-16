import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./Signup.scss";

function Signup({ Open, Close }) {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});
    const [openModal, setOpenModal] = useState(true);

    const onFinish = (values) => {
        async function fn() {
            const { username, nickname, password } = values;

            setFieldErrors({});

            const data = { username, nickname, password };
            try {
                await Axios.post(
                    "http://localhost:8000/accounts/signup/",
                    data
                );

                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });

                setOpenModal(false);

                history.push("/accounts/login");
            } catch (error) {
                if (error.response) {
                    notification.open({
                        message: "회원가입 실패",
                        description: "양식을 확인해주세요",
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
                    title="회원가입"
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
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Nickname"
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your nickname!",
                                },
                            ]}
                            {...fieldErrors.nickname}
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
                                회원가입
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

export default Signup;
