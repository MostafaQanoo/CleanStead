/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, useState } from 'react';
import { message, Button, Modal, Table, Image } from 'antd';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import AddService from './AddService';
import { CategoriesContext } from '../../../Contexts/CategoriesContext';
import './style.css';

function Services() {
  const [services, setServices] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCatogery] = useState('');
  const [description, setDescription] = useState('');
  const [serviceId, setServiceId] = useState();
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState('');
  const { categories } = useContext(CategoriesContext);

  const onChangeSelect = (value) => {
    categories.forEach((ele) => {
      if (ele.name === value) {
        setCatogery(ele.name);
      }
    });
  };

  const onChangeInput = ({ target: { name, value } }) => {
    switch (name) {
      case 'serviceName':
        setServiceName(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };
  const onChangeImage = async ({ target: { files } }) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'fbwelzmr');
    setLoadingImage(true);
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/cleansteadev/image/upload`,
        formData
      );
      setImage(data.secure_url);
      setLoadingImage(false);
    } catch {
      message.error('حدث خطأ ما في تحميل الصورة ');
      setLoadingImage(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(`/api/v1/services`, {
        cancelToken: cancelTokenSource.token,
      })
      .then(({ data: { data } }) => {
        setServices(data);
      })
      .catch(() => {
        message.error('حدث خطأ ما');
      })
      .finally(() => setLoading(false));

    return () => cancelTokenSource.cancel();
  }, [updated]);

  const openModal = () => {
    setIsOpen(true);
  };

  const clearState = () => {
    setServiceName('');
    setPrice('');
    setImage('');
    setDescription('');
    setCatogery('');
    setServiceId('');
  };
  const handleCancel = () => {
    clearState();
    setIsOpen(false);
    if (edited) setEdited(false);
  };

  const onEdit = (data) => {
    setServiceName(data.serviceName);
    setPrice(data.price);
    setImage(data.image.props.src);
    setDescription(data.description);
    setServiceId(data.key);
    setCatogery(data.categoryName);
    setIsOpen(true);
    setEdited(true);
  };
  const handle = async (method, url, data, message1) => {
    setLoading(true);
    setError('');
    await axios[method](url, data)
      .then(() => {
        message.success(message1);
        setUpdated(!updated);
        setLoading(false);
        clearState();
        setIsOpen(false);
        setEdited(false);
      })
      .catch((err) => {
        if (err.response.data) {
          setError('حاول مرة أخرى');
          setLoading(false);
        } else {
          message.error('حدث خطأ ما');
          setLoading(false);
        }
      });
  };

  const submitService = () => {
    if (serviceName && price && price > 0 && image && description && category) {
      setError('');
      let categoryId;
      categories.forEach((ele) => {
        if (ele.name === category) {
          categoryId = ele.id;
        }
      });
      const data = {
        name: serviceName,
        price,
        image,
        categoryId,
        description,
      };
      if (edited) {
        const id = serviceId;
        handle('put', `/api/v1/services/${id}`, data, 'تمت تعديل الخدمة بنجاح');
      } else {
        handle('post', `/api/v1/services`, data, 'تمت اضافة خدمة بنجاح');
      }
    } else {
      setError('جميع البيانات مطلوبة ووسعر الخدمة يجب أن يكون أكبر من صفر ');
    }
  };

  const onArchived = (id) => {
    axios
      .delete(`/api/v1/services/${id}`)
      .then(() => {
        message.success('تم حذف الخدمة بنجاح');
        setUpdated(!updated);
      })
      .catch(() => {
        message.error('حدث خطأ ما');
      });
  };

  const columns = [
    {
      title: 'رقم التصنيف',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'اسم التصنيف',
      key: 'categoryName',
      dataIndex: 'categoryName',
    },
    {
      title: ' اسم الخدمة',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: ' السعر $',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'صورة التصنيف',
      key: 'image',
      dataIndex: 'image',
    },
    {
      title: 'اكشن',
      key: 'option',
      className: 'action',
      valueType: 'action',
      render: (text, record) => [
        <Button
          type="text"
          onClick={() => onEdit(record)}
          icon={<EditOutlined style={{ color: '#28c76f' }} />}
        />,
        <Button
          type="text"
          onClick={() => onArchived(record.key)}
          icon={<DeleteOutlined style={{ color: '#EA5455' }} />}
        />,
      ],
    },
  ];
  const tableData = [];
  services.map((service) =>
    tableData.push({
      key: service.id,
      categoryName: service.category,
      serviceName: service.name,
      price: service.price,
      description: service.description,
      image: (
        <Image
          src={service.image}
          className="service-image"
          alt="service-image"
        />
      ),
    })
  );
  return (
    <div>
      <Button
        type="primary"
        className="add-btn"
        icon={<PlusOutlined />}
        onClick={openModal}
        shape="round"
      >
        اضافة خدمة
      </Button>
      <Modal
        title={edited ? 'تعديل الخدمة الحالية' : 'إضافة خدمة جديدة'}
        visible={isOpen}
        onCancel={handleCancel}
        width={430}
        className="add-service-modal"
      >
        <AddService
          onChangeSelect={onChangeSelect}
          onChangeInput={onChangeInput}
          serviceName={serviceName}
          price={price}
          image={image}
          category={category}
          description={description}
          edited={edited}
          submitService={submitService}
          onChangeImage={onChangeImage}
          loading={loading}
          loadingImage={loadingImage}
          error={error}
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={tableData}
        expandable={{
          expandedRowRender: (record) => (
            <p
              className="contact-desc-table"
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
}
export default Services;
