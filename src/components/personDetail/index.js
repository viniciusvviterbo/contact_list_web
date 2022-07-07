import React from "react";
import { Modal, Button, Tooltip, Table, Row, notification } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    AppstoreAddOutlined,
} from "@ant-design/icons";
import PersonEdit from "../personEdit";
import ContactEdit from "../contactEdit";
import {
    getPersonsContact,
    deleteContact,
} from "../../services/contactService";

export default class PersonDetail extends React.Component {
    state = {
        personObj: this.props.personObj,
        contactObj: {},
        contacts: this.props.contacts?.length > 0 ? this.props.contacts : [],
        showPersonEdit: false,
        showContactEdit: false,
    };

    notify(message) {
        notification.open({
            message,
        });
    }

    async fetchContacts(personId) {
        getPersonsContact(this.props.useApiDotnet, personId).then(
            ({ data }) => {
                this.setState((prevState, _) => {
                    return {
                        ...prevState,
                        contacts: data?.length > 0 ? this.props.contacts : [],
                    };
                });
            }
        );
    }

    async deleteContact(contactId) {
        deleteContact(this.props.useApiDotnet, contactId).then(({ data }) => {
            this.setState((prevState, _) => {
                return {
                    ...prevState,
                    contacts: prevState.contacts.filter(
                        (c) => c.id !== contactId
                    ),
                };
            });
        });
    }

    componentDidMount() {
        getPersonsContact(
            this.props.useApiDotnet,
            this.state.personObj.id
        ).then(({ data }) =>
            this.setState((prevState, _) => {
                return {
                    ...prevState,
                    contacts: data,
                };
            })
        );
    }

    columns() {
        return [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
                align: "left",
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
                align: "center",
                render: (value, record) => <b>{value}</b>,
            },
            {
                title: "Contact",
                dataIndex: "value",
                key: "value",
                align: "center",
                render: (value, record) => <b>{value}</b>,
            },
            {
                // title: "Action",
                dataIndex: "action",
                key: "action",
                align: "rigth",
                render: (_, record) => {
                    return (
                        <Row justify="space-around">
                            <Tooltip title="Edit Contact">
                                <Button
                                    icon={<EditOutlined />}
                                    style={{ color: "#0000FF" }}
                                    onClick={() => {
                                        this.setState((prevState, _) => {
                                            return {
                                                ...prevState,
                                                showContactEdit: true,
                                                contactObj: record,
                                            };
                                        });
                                    }}
                                />
                            </Tooltip>
                            <Tooltip title="Delete Contact">
                                <Button
                                    icon={<DeleteOutlined />}
                                    style={{ color: "#0000FF" }}
                                    onClick={() => {
                                        this.deleteContact(record.id);
                                    }}
                                />
                            </Tooltip>
                        </Row>
                    );
                },
            },
        ];
    }

    render() {
        const {
            personObj,
            contactObj,
            contacts,
            showPersonEdit,
            showContactEdit,
        } = this.state;
        return (
            <>
                <Modal
                    title={`${personObj?.firstName} ${personObj?.lastName}`}
                    width={800}
                    visible={personObj || false}
                    extra={"asdnjk"}
                    onCancel={() => this.props.onClose()}
                    footer={[
                        <Button
                            icon={<EditOutlined />}
                            size="medium"
                            shape="round"
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    showPersonEdit: true,
                                });
                            }}
                        >
                            Edit person
                        </Button>,
                        <Button
                            icon={<AppstoreAddOutlined />}
                            size="medium"
                            shape="round"
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    showContactEdit: true,
                                });
                            }}
                        >
                            Add contact
                        </Button>,
                    ]}
                >
                    <Table
                        size="small"
                        columns={this.columns()}
                        dataSource={contacts.length ? contacts : []}
                        pagination={{ pageSize: 5 }}
                    />
                </Modal>

                {showPersonEdit && (
                    <PersonEdit
                        useApiDotnet={this.props.useApiDotnet}
                        personObj={personObj}
                        onClose={() => {
                            this.fetchContacts(personObj.id);
                            this.setState((prevState, _) => {
                                return {
                                    ...prevState,
                                    showPersonEdit: false,
                                };
                            });
                            this.props.onClose();
                        }}
                    />
                )}

                {showContactEdit && (
                    <ContactEdit
                        useApiDotnet={this.props.useApiDotnet}
                        contactObj={contactObj}
                        personId={personObj.id}
                        onClose={() => {
                            this.fetchContacts(personObj.id);
                            this.setState((prevState, _) => {
                                return {
                                    ...prevState,
                                    showContactEdit: false,
                                };
                            });
                        }}
                    />
                )}
            </>
        );
    }
}
