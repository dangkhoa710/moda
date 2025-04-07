export const addUserInfo = (mbti: string) => {
  const stored = localStorage.getItem('moda_user_info');
  const user = stored ? JSON.parse(stored) : {};

  const updatedUser = {
    ...user,
    mbti,
  };

  localStorage.setItem('moda_user_info', JSON.stringify(updatedUser));
};


export const getUserData = () => {
  const raw = localStorage.getItem('moda_user_info');
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);
    if (data.name && data.dob && data.gender && data.mbti) {
      return data; // Đã đầy đủ thông tin
    }
    return null; // Thiếu thông tin ⇒ xem như chưa có user
  } catch {
    return null;
  }
};

export const getFieldFromStorage = (
  storageKey: string,
  fieldPath: string
): any | null => {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    const data = JSON.parse(raw);

    // Hỗ trợ truy cập lồng bằng path dạng 'data.main.temp'
    const parts = fieldPath.split('.');
    let result = data;
    for (const part of parts) {
      if (result && part in result) {
        result = result[part];
      } else {
        return null;
      }
    }
    return result;
  } catch {
    return null;
  }
};

