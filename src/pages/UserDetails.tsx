import { List, Tag, Typography, Row, Col, Space, Flex } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;
const { Text } = Typography;

interface AlgorithmsResponse { name: string; id: string }
interface LearnersCollection { name: string; days: number; path: any[]; results: any, algorithm: {
  defaultPath: string;
  sequence_id: string;
  tutorial_less_than: number,
  reinforcement_greater_than: number,
  name: string;
  id: string;
  minimum_dataset_size: number,
  enable_gates: boolean
} }

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
        style={{ width: '100%' }}
      />

      <Row>
        <Col span={7}>
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

        </Col>
        <Col span={12} style={{ margin: 12 }}>
          <Text>
            This configuration details the setup for <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.name}</Text>, a machine learning algorithm. It initializes using a specified <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.defaultPath}</Text>, ensuring consistency in data handling and processing workflows.
            The algorithm is structured to process data sequences based on the <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.sequence_id}</Text> method, strategically prioritizing the least proficient data points to optimize learning and adaptation processes early in the training phase.
            Key performance thresholds are set to dynamically adjust the learning interventions: a tutorial mode is triggered for predictions below a <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.tutorial_less_than}</Text>% accuracy threshold, while a reinforcement strategy is applied when prediction accuracy exceeds <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.reinforcement_greater_than}</Text>%. This approach allows for targeted learning enhancements based on model performance metrics.
            A minimum dataset size of <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.minimum_dataset_size}</Text> is required, ensuring the algorithm has sufficient data to generate reliable predictions and avoid overfitting on sparse data.
            Additionally, the <Text style={{ fontWeight: 600 }}>{userData?.[0]?.algorithm.enable_gates}</Text> flag is used to activate or deactivate conditional processing gates, providing flexibility in managing complex learning pathways or experimental features.
          </Text>
        </Col>
      </Row>
    </div>
  );
}
