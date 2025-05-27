document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('smsForm');
  const messageBox = document.getElementById('message');

  // লোড করার সময় আগের ডাটা ফিল্ডে বসান
  document.getElementById('caseNumber').value = localStorage.getItem('caseNumber') || '';
  document.getElementById('hearingDate').value = localStorage.getItem('hearingDate') || '';
  document.getElementById('phoneNumber').value = localStorage.getItem('phoneNumber') || '01';

  form.addEventListener('submit', e => {
    e.preventDefault();

    const caseNumber = document.getElementById('caseNumber').value.trim();
    const hearingDate = document.getElementById('hearingDate').value;
    const phoneNumber = document.getElementById('phoneNumber').value.trim();

    if (!caseNumber || !hearingDate || !/^01\d{9}$/.test(phoneNumber)) {
      messageBox.style.color = 'red';
      messageBox.textContent = 'সঠিক তথ্য পূরণ করুন।';
      return;
    }

    const smsText = `আপনার নামজারি মামলা নং ${caseNumber} এর শুনানির তারিখ ${hearingDate} যথাসময়ে উপজেলা ভূমি অফিসে উপস্থিত থাকারজন্য বলা হল।`;

    // SMS পাঠানো (PWA থেকে সরাসরি পাঠানো সম্ভব না, তাই শুধু লগে দেখানো)
    alert('মেসেজ পাঠানো হবে:\n\n' + smsText);

    // ইতিহাসে সেভ করুন
    let history = JSON.parse(localStorage.getItem('messageHistory') || '[]');
    history.push({ caseNumber, hearingDate, phoneNumber, time: new Date().toLocaleString() });
    localStorage.setItem('messageHistory', JSON.stringify(history));

    // ফিল্ড খালি করুন, ফোন নম্বরে '01' রাখুন
    form.reset();
    document.getElementById('phoneNumber').value = '01';

    // লোকাল স্টোরেজে সংরক্ষণ
    localStorage.setItem('caseNumber', '');
    localStorage.setItem('hearingDate', '');
    localStorage.setItem('phoneNumber', '01');

    messageBox.style.color = 'green';
    messageBox.textContent = 'মেসেজ প্রস্তুত এবং ইতিহাসে যোগ করা হয়েছে।';
  });
});
