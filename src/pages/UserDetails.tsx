import { List, Tag, Typography, Row, Col, Space, Flex } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;
const { Text } = Typography;

interface AlgorithmsResponse { name: string; id: string }
interface LearnersCollection { name: string; days: number; path: any[]; results: any }

const defaultStyle = {
  backgroundColor: '#e5e5f7',
  opacity: 0.8,
  backgroundImage:  'repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #fff, #fff )'
};

const tagStyle = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '4rem',
  minHeight: '4rem',
  margin: '4px',
  padding: '0 8px',
  overflow: 'hidden',
  fontSize: '0.75rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  color: 'black',
};

export default function UserDetails() {
  const location = useLocation();
  const user = location.state?.user;
  const selectedAlgorithm = location.state?.selectedAlgorithm;
  console.log(selectedAlgorithm);
  const apiUrl = process.env.REACT_APP_BACKEND_URL as string;
  const [algorithms, setAlgorithms] = useState<AlgorithmsResponse[]>([]);
  const [userData, setUserData] = useState<LearnersCollection[]>([]);

  //   const listAlgorithms = async () => {
  //     try {
  //       const response = await axios.get();

  //       if (response.status === 200) {
  //         setAlgorithms(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const listData = async () => {
    try {
      const response = await axios.post(`${apiUrl}users-data?file=${selectedAlgorithm}&user=${user}`);
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = async (value: string) => {
    await listData();
  };

  const getColor = (tag: string) => {
    if (tag.includes('reinforcement')) {
      return 'blue';
    }

    if (tag.includes('tutorial')) {
      return 'red';
    }

    return '#CACACA';
  };

  const styleForDefaultPattern = (tag: string) => {
    return !tag.includes('reinforcement') && !tag.includes('tutorial') ? { ...tagStyle, ...defaultStyle } : tagStyle;
  };

  useEffect(() => {
    if (selectedAlgorithm) {
      onChange(selectedAlgorithm);
    }
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <div style={{ background: 'white', padding: 24, minHeight: '100vh', maxWidth: '100vw' }}>
      <Row style={{ marginBottom: '3rem' }}>
        <Col span={16}>
          <Title level={4}>{user}</Title>
          <Title level={4}>{selectedAlgorithm}</Title>
        </Col>
      </Row>

      <List
        dataSource={userData}
        renderItem={item => (
          <List.Item>
            <Space align="start" size="large">
              <Title level={5}>Path</Title>
              <Flex gap="middle" vertical>
                <Flex vertical={false}>
                  {item.path.map((tag: any) => {
                    return (
                      <Tag
                        color={getColor(tag)}
                        key={tag}
                        style={styleForDefaultPattern(tag)}
                      >
                        {tag}
                      </Tag>
                    );
                  })}
                </Flex>
              </Flex>
            </Space>
          </List.Item>
        )}
        style={{ width: '100vw' }}
      />

      <List
        dataSource={userData}
        renderItem={item => (
          <List.Item>
            <Space align="start" size="large">
              <Title level={5}>Results</Title>
              <Flex gap="middle">
                <Flex vertical={true}>
                  {Object.entries(item.results).map((c: any) => {
                    return (
                      <Tag
                        color={'blue'}
                        key={c[0]}
                        style={{
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden',
                          fontSize: '0.75rem',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          color: 'black',
                          margin: 4,
                        }}
                      >
                        {c?.[0]}: Correct: {c?.[1]?.correct}, Incorrect: {c?.[1]?.incorrect}
                      </Tag>
                    );
                  })}
                </Flex>
              </Flex>
            </Space>
          </List.Item>
        )}
        style={{ width: '100%' }}
      />
    </div>
  );
}
