import React from "react";
import { Row, Col, Card, Tooltip } from "antd";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import PersonDetail from "../personDetail";
import { deletePerson } from "../../services/personService";

export default class GridShow extends React.Component {
    state = {
        persons: this.props.persons,
        personSelected: undefined,
    };

    onShowDetails(personSelected) {
        this.setState((prevState, _) => {
            return {
                ...prevState,
                personSelected,
            };
        });
    }

    async deletePerson(personId) {
        deletePerson(this.props.useApiDotnet, personId).then(({ data }) => {
            this.setState((prevState, _) => {
                return {
                    ...prevState,
                    persons: prevState.persons.filter((p) => p.id !== personId),
                };
            });
        });
    }

    render() {
        const { persons, personSelected } = this.state;
        return (
            <>
                <Row span={24} style={{ marginTop: "100px" }}>
                    {persons.map(({ id, firstName, lastName }) => {
                        return (
                            <Col span={8} key={id}>
                                <Card
                                    style={{
                                        margin: "70px",
                                        minWidth: "200px",
                                    }}
                                    hoverable
                                    title={<h1>{firstName}</h1>}
                                >
                                    {<h2>{lastName}</h2>}
                                    <Row
                                        justify="space-between"
                                        style={{ marginTop: "30px" }}
                                    >
                                        <Tooltip title="Delete Person">
                                            <DeleteOutlined
                                                style={{ color: "#FF0000" }}
                                                onClick={() =>
                                                    this.deletePerson(id)
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip title="Info Person">
                                            <InfoCircleOutlined
                                                onClick={() =>
                                                    this.onShowDetails({
                                                        id,
                                                        firstName,
                                                        lastName,
                                                    })
                                                }
                                            />
                                        </Tooltip>
                                    </Row>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {personSelected && (
                    <PersonDetail
                        useApiDotnet={this.props.useApiDotnet}
                        personObj={personSelected}
                        persons={persons}
                        onClose={() =>
                            this.setState((prevState, _) => {
                                return {
                                    ...prevState,
                                    personSelected: undefined,
                                };
                            })
                        }
                    />
                )}
            </>
        );
    }
}
