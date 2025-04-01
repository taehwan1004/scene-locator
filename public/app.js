document.getElementById('upload-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData();
  const imageFile = document.getElementById('image').files[0];
  
  if (!imageFile) {
    alert("이미지를 선택해주세요.");
    return;
  }
  
  formData.append('image', imageFile);

  try {
    // 절대 URL 사용: API 서버가 http://localhost:3000 에서 실행 중일 때
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('서버 오류');
    }

    const result = await response.json();

    // 결과 표시
    document.getElementById('result').style.display = 'block';
    document.getElementById('location').textContent = `촬영 장소: ${result.location}`;
    document.getElementById('confidence').textContent = `신뢰도: ${result.confidence_score}`;
  } catch (error) {
    console.error('오류 발생:', error);
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
});
