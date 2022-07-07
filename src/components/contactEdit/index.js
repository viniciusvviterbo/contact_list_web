import React from "react";
import { Modal, Button, Form, Input, Select, notification } from "antd";
import { createContact, editContact } from "../../services/contactService";

export default class ContactEdit extends React.Component {
    state = {
        contactObj: this.props.contactObj || undefined,
        personId: this.props.personId || undefined,
    };

    notify(message) {
        notification.open({
            message,
        });
    }

    async onEditContact(formVal) {
        const { id } = this.state.contactObj;
        const response = await editContact(this.props.useApiDotnet, { ...formVal, id });
        this.notify(response.data.message);
        this.props.onClose();
    }

    async onCreateContact(formVal) {
        const response = await createContact(this.props.useApiDotnet, formVal);
        this.notify(response.data.message);
        this.props.onClose();
    }

    onConcludeContact(formVal) {
        const { personId, contactObj } = this.state;
        contactObj?.id
            ? this.onEditContact({ ...formVal, personId, id: contactObj.id })
            : this.onCreateContact({ ...formVal, personId });
    }

    render() {
        const { contactObj } = this.state;
        return (
            <>
                <Modal
                    title={`${contactObj?.id ? "Edit" : "Add"} Contact`}
                    width={800}
                    visible={!!contactObj}
                    onCancel={() => this.props.onClose()}
                    footer={[
                        <Button
                            type="primary"
                            htmlType="submit"
                            form="contactEdit"
                        >
                            Submit
                        </Button>,
                    ]}
                >
                    <Form
                        name="contactEdit"
                        initialValues={contactObj}
                        onFinish={(formVal) => this.onConcludeContact(formVal)}
                    >
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the type.",
                                },
                            ]}
                        >
                            <Select showSearch>
                                {["Phone", "Whatsapp", "Email"].map(
                                    (option) => (
                                        <Select.Option
                                            key={option}
                                            value={option}
                                            label={option}
                                        >
                                            {option}
                                        </Select.Option>
                                    )
                                )}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Contact"
                            name="value"
                            rules={[
                                {
                                    required: true,
                                    message: "Please inform the contact.",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}
