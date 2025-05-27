document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('historyList');
  let history = JSON.parse(localStorage.getItem('messageHistory') || '[]');

  if (history.length === 0) {
    list.innerHTML = '<li>কোনো মেসেজ ইতিহাস নেই।</li>';
  } else {
    history.reverse().forEach(item => {
      const li = document.createElement('li');
      li.textContent = `মামলা নং: ${item.caseNumber}, শুনানির তারিখ: ${item.hearingDate}, মোবাইল: ${item.phoneNumber}, সময়: ${item.time}`;
      list.appendChild(li);
    });
  }
});
