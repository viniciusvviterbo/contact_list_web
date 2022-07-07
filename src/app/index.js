import React from "react";
import { Typography, Space, Button, Radio, Col, Row } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import GridShow from "../components/gridShow";
import PersonEdit from "../components/personEdit";
import { getPerson } from "../services/personService";
import "./index.css";

const { Title, Text } = Typography;

export default class App extends React.Component {
    state = {
        personObj: undefined,
        persons: [],
        useApiDotNet: true,
    };

    async fetchPerson() {
        const response = await getPerson(this.state.useApiDotnet);
        const persons = response.data;
        this.setState((prevState, currProps) => {
            return { ...prevState, persons };
        });
    }

    componentDidMount() {
        this.fetchPerson();
    }

    render() {
        const { persons, personObj, useApiDotNet } = this.state;

        return (
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                    marginTop: "30px",
                    marginBottom: "30px",
                }}
                align="center"
            >
                <Row style={{ width: "1000px" }} justify="end">
                    <Col>
                        <Radio.Group
                            disabled
                            defaultValue={"dotnet"}
                            onChange={({ target: { value } }) =>
                                this.setState((prevState, _) => {
                                    return {
                                        ...prevState,
                                        useApiDotNet:
                                            value === "dotnet" ? true : false,
                                    };
                                })
                            }
                            size="medium"
                        >
                            <Radio.Button value="dotnet">.NET</Radio.Button>
                            <Radio.Button value="nodejs">NodeJS</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Title
                    style={{
                        fontSize: "86px",
                        marginTop: "50px",
                    }}
                >
                    Contact List
                </Title>

                <Text
                    style={{
                        fontSize: "24px",
                        fontWeight: "normal",
                    }}
                >
                    A solution for organizing contacts from the people you know
                </Text>

                <Button
                    icon={<UserAddOutlined />}
                    size="large"
                    shape="round"
                    onClick={() =>
                        this.setState((prevState, currProps) => {
                            return { ...prevState, personObj: {} };
                        })
                    }
                >
                    Add person
                </Button>

                {personObj && (
                    <PersonEdit
                    useApiDotnet={this.props.useApiDotnet } 
                        personObj={personObj}
                        onClose={() => {
                            this.fetchPerson();
                            this.setState((prevState, currProps) => {
                                return {
                                    ...prevState,
                                    personObj: undefined,
                                };
                            });
                        }}
                    />
                )}

                {persons.length > 0 && (
                    <GridShow persons={persons} useApiDotNet={useApiDotNet} />
                )}
            </Space>
        );
    }
}
