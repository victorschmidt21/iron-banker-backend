const url = 'https://api.deepgram.com/v1/listen';
const options = {
  method: 'POST',
  headers: {
    Authorization: 'Token 978d84947f4abc1101a009f03e5b6b6a3862e2b5',
    'Content-Type': 'application/json',
  },
  body: '{"url":"https://mmg.whatsapp.net/v/t62.7117-24/598125831_4323782891233591_8520439601405638888_n.enc?ccb=11-4&oh=01_Q5Aa3QHPz1j23YTtAXrSQl0O2TRTwNYC1ZCjpYgTGgLt8aSFQA&oe=695ED859&_nc_sid=5e03e0&mms3=true"}',
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
