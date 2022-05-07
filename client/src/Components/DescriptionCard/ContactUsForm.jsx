import React from 'react';
import { Form, Input, Image, Col, Row, Select, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import linesLeft from '../../Assets/images/linesLeft.svg';
import './style.css';

function ContactUsForm() {
  const [form] = Form.useForm();
  const Title = Typography;

  return (
    <div>
      <div className="section">
        <div className="contact-custom-title">
          <Title className="contact-title">تواصل معنا </Title>
          <Image className="imageline" src={linesLeft} preview={false} />
        </div>
        <Form
          form={form}
          className="contact-form"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item className="zuhdi" label="الخدمة">
            <Select className="contact-input" placeholder="اسم الخدمة">
              <Select.Option value="demo">تنظيف المنازل</Select.Option>
            </Select>
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="name" className="contact-label" label="الاسم">
                <Input className="contact-input" placeholder="الاسم" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="number"
                className="contact-label"
                label="رقم الجوال"
              >
                <Input className="contact-input" placeholder="رقم الجوال" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="email" className="contact-label" label="الايميل">
            <Input className="contact-input" placeholder="الايميل" />
          </Form.Item>
          <Form.Item
            name="introduction"
            className="contact-label"
            label="الرسالة"
          >
            <Input.TextArea
              className="contact-input"
              placeholder="اكتب رسالتك هنا.."
            />
          </Form.Item>
          <Link to="/">
            <Button
              className="contact-button"
              type="primary"
              shape="round"
              size="large"
            >
              تواصل معنا
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default ContactUsForm;
