interface GeminiPromptOptions {
  gender: string;
  birthdate: string;
  mbti: string;
  temperature: number;
  weather: string;
  currentTime: string;
  restaurantList: Restaurant[];
}
interface Restaurant {
  name: string;
  id: number;
}

export const geminiPromptTemplateAn = (options: {
  gender: string | null;
  birthdate: string | null;
  mbti: string | null;
  temperature: number;
  weather: string;
  currentTime: string;
  restaurantList: { name: string; id: number }[]
}): string => {
  const {
    gender,
    birthdate,
    mbti,
    temperature,
    weather,
    currentTime,
    restaurantList,
  } = options;

  const restaurantFormatted = restaurantList
    .map((r, i) => `${i + 1}. ${r.name} (ID: ${r.id})`)
    .join('\n');

  return `Dưới đây là danh sách các quán ăn:\n\n${restaurantFormatted}\n\nNgười dùng có thông tin:\n- Giới tính: ${gender}\n- Ngày sinh: ${birthdate}\n- MBTI: ${mbti}\n- Nhiệt độ hiện tại: ${temperature}°C\n- Thời tiết: ${weather}\n- Thời gian hiện tại: ${currentTime}\n\nDựa vào các thông tin của người này, hãy chọn một quán ăn phù hợp nhất trong danh sách trên. Kết quả trả về chỉ cần là ID của quán ăn đó, không cần nêu lý do`;
};