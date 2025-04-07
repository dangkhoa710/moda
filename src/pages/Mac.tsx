import { Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getFieldFromStorage, getUserData } from '../utils/localStorage';
import { useEffect, useState } from 'react';
import { generateGemini } from '../api/geminiService';
import { geminiPromptTemplateMac } from '../templates/geminiPromptTemplateMac';

const { Title, Text } = Typography;


export default function Mac() {
  const navigate = useNavigate();
  const user = getUserData();

  const [loading, setLoading] = useState(true);
  const [outfit, setOutfit] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prompt = geminiPromptTemplateMac({
          gender: getFieldFromStorage('moda_user_info', 'gender') ?? '',
          birthdate: getFieldFromStorage('moda_user_info', 'dob') ?? '',
          mbti: getFieldFromStorage('moda_user_info', 'mbti') ?? '',
          temperature: getFieldFromStorage('moda_weather_data', 'data.main.temp') ?? '',
          weather: getFieldFromStorage('moda_weather_data', 'data.weather.0.description') ?? '',
        });

        const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
        const cacheKey = `moda_user_outfit_${today}`;
        let suggestion: any = null;
        const cached = localStorage.getItem('moda_user_outfit');

        if (cached) {
          try {
            suggestion = JSON.parse(cached);
          } catch {
            localStorage.removeItem(cacheKey);
          }
        }

        if (!suggestion) {
          const result = await generateGemini(prompt);
          if (result) {
            suggestion = result;
            localStorage.setItem(cacheKey, JSON.stringify(result));
          }
        }

        if (suggestion) {
          setOutfit(suggestion);
        } else {
          console.warn('Không có gợi ý hợp lệ.');
        }

      } catch (err) {
        console.error('❌ Lỗi gọi Gemini:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <Button onClick={() => navigate('/moda')} style={{ marginBottom: 16 }}>
        ← Quay lại
      </Button>

      <Title level={3}>Trang phục gợi ý cho {user.name} ({user.mbti})</Title>
      <Text strong>Thời tiết:</Text>{' '}
      <Text>{getFieldFromStorage('moda_weather_data', 'data.weather.0.description')}, {getFieldFromStorage('moda_weather_data', 'data.main.temp')}°C</Text>

      {loading ? (
        <p>Đang lấy gợi ý từ Gemini...</p>
      ) : outfit && (
        <Card title="Màu sắc tổng thể" style={{ maxWidth: 600, marginTop: 24, borderRadius: 8 }}>
          {Array.isArray(outfit?.colors) && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: 180,
              overflow: 'hidden',
              marginBottom: 16,
              gap: 8
            }}>
              {outfit.colors.map((color: string, idx: number) => (
                <div key={idx} style={{
                  width: '50%',
                  height: 60,
                  backgroundColor: color,
                  border: '2px solid #666',
                  borderRadius: 8
                }}/>
              ))}
            </div>
          )}
          <p><strong>Gợi ý:</strong> {outfit.outfit}</p>
          {outfit.accessories && <p><strong>Phụ kiện:</strong> {outfit.accessories}</p>}
          {outfit.note && <p><em>{outfit.note}</em></p>}
        </Card>
      )}
    </div>
  );
}
