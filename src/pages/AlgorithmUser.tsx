import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Row } from 'antd';

const AlgorithmsUser: React.FC = () => {
  const baseUrl = String(process.env.REACT_APP_BACKEND_URL);
  const onFinish = async (user: string) => {
    try {
      const response = await axios.post(`${baseUrl}generate-data`, {
        user: user,
        games_per_concept: 5
      });

      if (response.status === 201) {

        setTimeout(() => {
          // setAlertMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ background: '', padding: 24, minHeight: '100vh' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Billy" bordered={false}>
            <Button type="primary" onClick={() => onFinish('user1')}>
              Generate user data
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Bobby" bordered={false}>
            <Button type="primary" onClick={() => onFinish('user2')}>
              Generate user data
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="B" bordered={false}>
            <Button type="primary" onClick={() => onFinish('user3')}>
              Generate user data
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AlgorithmsUser;