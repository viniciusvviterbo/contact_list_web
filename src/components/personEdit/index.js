import React from "react";
import { Modal, Button, Form, Input, notification } from "antd";
import { createPerson, editPerson } from "../../services/personService";

export default class PersonEdit extends React.Component {
    state = {
        personObj: this.props.personObj || undefined,
    };

    notify(message) {
        notification.open({
            message,
        });
    }

    async onEditPerson(formVal) {
        const { id } = this.state.personObj;
        const response = await editPerson(this.props.useApiDotnet, { ...formVal, id });
        this.notify(response.data.message);
        this.props.onClose();
    }

    async onCreatePerson(formVal) {
        const response = await createPerson(this.props.useApiDotnet, formVal);
        this.notify(response.data.message);
        this.props.onClose();
    }

    onConcludePerson(formVal) {
        this.state.personObj?.id
            ? this.onEditPerson(formVal)
            : this.onCreatePerson(formVal);
    }

    render() {
        const { personObj } = this.state;
        return (
            <>
                <Modal
                    title={`${personObj?.id ? "Edit" : "Add"} Person`}
                    width={800}
                    visible={personObj || false}
                    onCancel={() => this.props.onClose()}
                    footer={[
                        <Button
                            type="primary"
                            htmlType="submit"
                            form="personEdit"
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Form
                        name="personEdit"
                        initialValues={personObj}
                        onFinish={(formVal) => this.onConcludePerson(formVal)}
                    >
                        <Form.Item
                            label="First name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please inform the first name.",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Last name" name="lastName">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}