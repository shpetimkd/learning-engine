import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Avatar, Button, Card, Col, InputNumber, Row } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { valueType } from 'antd/es/statistic/utils';
const { Meta } = Card;

const AlgorithmsUser: React.FC = () => {
  const baseUrl = String(process.env.REACT_APP_BACKEND_URL);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [gamesPerConcept, setGamesPerConcept] = useState<valueType>(10);

  const onFinish = async (user: string) => {
    try {
      const response = await axios.post(`${baseUrl}generate-data`, {
        user: user,
        games_per_concept: gamesPerConcept
      });

      if (response.status === 200) {
        setAlertMessage('Dataset generated successfully');

        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ background: '', padding: 24, minHeight: '100vh' }}>
      {
        alertMessage && <Alert message={alertMessage} type="success" style={{ marginBottom: 12 }} />
      }
      <Row gutter={16}>
        <Col span={8}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://img.freepik.com/free-vector/computer-circuit-board-hand-shape-creative-technology-poster-vector-illustration_98292-591.jpg?t=st=1713445750~exp=1713449350~hmac=04485923e89cafcc40c005bf1aa337c89dac10c2693a139741abff1074f92011&w=1380"
              />
            }
            actions={[
              <><InputNumber style={{ width: '200px' }} key="number_input" placeholder='Games for concept' onChange={(val) => setGamesPerConcept(val || 10)} />
                <SyncOutlined style={{ color: 'blue', marginTop: 20 }} key="setting" onClick={() => onFinish('user1')} /></>
            ]}
          >
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=12" />}
              title="Mila"
              description="Despite Mila's love for all things tech, she once spent an entire week convinced that cloud computing involved actual clouds — she's still waiting for sunny days to boost her Wi-Fi signal."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://img.freepik.com/free-vector/computer-circuit-board-hand-shape-creative-technology-poster-vector-illustration_98292-591.jpg?t=st=1713445750~exp=1713449350~hmac=04485923e89cafcc40c005bf1aa337c89dac10c2693a139741abff1074f92011&w=1380"
              />
            }
            actions={[
              <><InputNumber style={{ width: '200px' }} key="number_input" placeholder='Games for concept' onChange={(val) => setGamesPerConcept(val || 10)} />
                <SyncOutlined style={{ color: 'blue', marginTop: 20 }} key="setting" onClick={() => onFinish('user2')} /></>
            ]}
          >
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title="Theo"
              description="Theo has a mysterious talent for finding lost socks, leading his friends to believe he's actually a retired sock detective with a remarkable track record."
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://img.freepik.com/free-vector/computer-circuit-board-hand-shape-creative-technology-poster-vector-illustration_98292-591.jpg?t=st=1713445750~exp=1713449350~hmac=04485923e89cafcc40c005bf1aa337c89dac10c2693a139741abff1074f92011&w=1380"
              />
            }
            actions={[
              <><InputNumber style={{ width: '200px' }} key="number_input" placeholder='Games for concept' onChange={(val) => setGamesPerConcept(val || 10)} />
                <SyncOutlined style={{ color: 'blue', marginTop: 20 }} key="setting" onClick={() => onFinish('user3')} /></>
            ]}
          >
            <Meta
              avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=9" />}
              title="Ivy"
              description="Ivy claims her green thumb is so powerful, she just has to look at a plant to make it grow — she's currently accepting challenges to revive your most hopeless houseplants."
            />
          </Card>
        </Col>
      </Row>
      <Row>
      </Row>
    </div>
  );
};

export default AlgorithmsUser;