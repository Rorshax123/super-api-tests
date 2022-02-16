import request from "../config/common";

async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

export const registerUser = async (phone, firstName, lastName, code, waitingTime) => {
  const userData = {
    phone: phone,
    first_name: firstName,
    last_name: lastName,
  };

  const smsData = {
    phone: phone,
    code: code,
  };

  //отправляем смс на регистрацию
  await request.post("user/register").send(userData);

  //ждем определеную секунду если надо
  await sleep(waitingTime);
//подтверждаем смс код
  const res = await request.post("user/verify-code").send(smsData);
  return res;
};


export const deleteUser = async () => {
   await request.get("user/delete-user");
}

