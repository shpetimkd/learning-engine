import axios from 'axios';
import { Alert, Button, Checkbox, Col, Empty, Form, FormProps, Input, InputNumber, Row, Select } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useState } from 'react';
const { Option } = Select;

export default function BuildAlgorithm() {
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values) => {
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL as string, values);

      if (response.status === 201) {
        setAlertMessage(response.data);
        form.resetFields();

        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Col>
        {
          alertMessage && <Alert message={alertMessage} type="success" />
        }

        <Form
          form={form}
          labelCol={{ span: 12 }}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60, margin: '2rem' }}
            description={
              ''
            }
          >
          </Empty>

          <Form.Item name="defaultPath" label="Default Path" rules={[{ required: true, message: 'Please select the path!' }]}>
            <Select placeholder="Select path">
              <Option value="default-path">Default path</Option>
              <Option value="academic-importance-1">Academic Importance 1</Option>
              {/* <Option value="binary-reducer">Binary Reducer</Option> */}
            </Select>
          </Form.Item>

          <Form.Item name="remove_proficient_concepts" valuePropName="checked">
            <Checkbox>Remove Proficient Concepts</Checkbox>
          </Form.Item>

          <Form.Item name="sequence_id" label="Sequence">
            <Select placeholder="Select a sequence">
              <Option value="textToSkills">Text to Skills</Option>
              <Option value="leastProficientFirst">Ingame Least-Proficient First</Option>
            </Select>
          </Form.Item>

          <Form.Item  name="enable_gates" valuePropName="checked">
            <Checkbox>Conditional Release (gates)</Checkbox>
          </Form.Item>

          <Form.Item labelCol={{ span: 32 }} label="Enable Tutorial Material when ingame proficiency is less than" name="tutorial_less_than">
            <Input addonAfter="%" />
          </Form.Item>

          <Form.Item labelCol={{ span: 32 }} label="Enable Reinforcement Material when ingame proficiency is greater than" name="reinforcement_greater_than">
            <Input addonAfter="%" />
          </Form.Item>

          <Form.Item labelCol={{ span: 32 }} label="Minimum dataset size to be considered" name="minimum_dataset_size">
            <InputNumber />
          </Form.Item>

          <Form.Item name="name" label="Save As" rules={[{ required: true, message: 'Please choose saving path!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
