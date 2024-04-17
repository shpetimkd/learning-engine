import { List, Tag, Typography, Select, Row, Col, Space, Flex } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Text } = Typography;

interface AlgorithmsResponse { name: string; id: string }
interface LearnersCollection { name: string; days: number; path: any[] }

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

export default function ListAlgorithms() {
  const apiUrl = process.env.REACT_APP_BACKEND_URL as string;
  const [algorithms, setAlgorithms] = useState<AlgorithmsResponse[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
  const [userData, setUserData] = useState<LearnersCollection[]>([]);
  const navigate = useNavigate();

  const listAlgorithms = async () => {
    try {
      const response = await axios.get(`${apiUrl}list-algorithms`);

      if (response.status === 200) {
        setAlgorithms(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listData = async (value: string) => {
    try {
      const response = await axios.get(`${apiUrl}defined-path?file=${value}`);

      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = async (value: string) => {
    setSelectedAlgorithm(value);
    await listData(value);
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

  const tagClick = (item: { name: string; days: number }) => {
    navigate('/users', { state: { user: item.name, selectedAlgorithm } });
  };

  useEffect(() => {
    listAlgorithms();
  }, []);

  return (
    <div style={{ background: 'white', padding: 24, minHeight: '100vh' }}>
      <Row style={{ marginBottom: '3rem' }}>
        <Col span={16}>
          <Title level={4}>Est. Class Learning Days: 15</Title>
        </Col>
        <Col style={{ marginTop: '1.5rem' }}>
          <Select style={{ width: '300px' }} placeholder="Select path" onChange={onChange}>
            {
              algorithms && algorithms?.map((algo: AlgorithmsResponse) => {
                return <Option key={algo.id} value={algo.name}>{algo?.name}</Option>;
              })
            }
          </Select>
        </Col>
      </Row>

      <List
        dataSource={userData}
        renderItem={item => (
          <List.Item>
            <Space align="start" size="large">
              <Flex gap="middle" vertical>
                <Tag
                  onClick={() => tagClick(item)}
                  key={item.name}
                  style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '4rem',
                    height: '4rem',
                    margin: '4px',
                    padding: 0,
                    overflow: 'hidden',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  <Flex style={{ backgroundColor: 'ButtonHighlight', padding: '0.5rem' }} vertical={true}>
                    <Text>{item.name}</Text>
                    <Text strong>{`${item.days} days`}</Text>
                  </Flex>
                </Tag>
              </Flex>
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
    </div>
  );
}
