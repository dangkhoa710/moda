import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, DatePicker, Radio, message } from 'antd';
import { Dayjs } from 'dayjs'; // THÊM Dayjs vào import

const { Title } = Typography;

export default function Home() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name.trim() || !dob || !gender) {
      message.warning('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    localStorage.setItem(
      'moda_user_info',
      JSON.stringify({
        name,
        dob: dob.format('YYYY-MM-DD'),
        gender,
      })
    );

    navigate('/quiz');
  };

  return (
    <div style={{ padding: 32 }}>
      <Title level={2}>Chào bạn! Cho mình biết thông tin nhé:</Title>

      <Input
        placeholder="Nhập tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <br />

      <DatePicker
        placeholder="Chọn ngày sinh"
        value={dob}
        onChange={(date) => setDob(date)}
        style={{ width: 300, marginBottom: 16 }}
      />
      <br />

      <Radio.Group
        onChange={(e) => setGender(e.target.value)}
        value={gender}
        style={{ marginBottom: 24 }}
      >
        <Radio value="male">Nam</Radio>
        <Radio value="female">Nữ</Radio>
        <Radio value="other">Khác</Radio>
      </Radio.Group>
      <br />

      <Button type="primary" onClick={handleStart}>
        Bắt đầu trắc nghiệm MBTI
      </Button>
    </div>
  );
}
