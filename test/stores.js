import request from "../config/common";
import { expect } from "chai";
import { describe } from "mocha";


describe('Regions', () => {
   
   it("check status code", async () => {
     const res = await request.get("store/regions");
     expect(res.statusCode).to.be.equal(200);
   });

   it("Check name uz with id", async () => {
     const res = await request.get("store/regions").set("Accept-Language", "uz");
     expect(res.body.data[0].id).to.be.equal(2);
     expect(res.body.data[0].name).to.be.equal("Toshkent");
     expect(res.body.data[1].id).to.be.equal(4);
     expect(res.body.data[1].name).to.be.equal("Toshkent viloyati");
     expect(res.body.data[2].id).to.be.equal(1);
     expect(res.body.data[2].name).to.be.equal("Andijon");
     expect(res.body.data[3].id).to.be.equal(3);
     expect(res.body.data[3].name).to.be.equal("Farg'ona");
     expect(res.body.data[4].id).to.be.equal(8);
     expect(res.body.data[4].name).to.be.equal("Buxoro");
     expect(res.body.data[5].id).to.be.equal(5);
     expect(res.body.data[5].name).to.be.equal("Farg'ona viloyati");
     expect(res.body.data[6].id).to.be.equal(6);
     expect(res.body.data[6].name).to.be.equal("Namangan");
     expect(res.body.data[7].id).to.be.equal(7);
     expect(res.body.data[7].name).to.be.equal("Samarqand");
   });

   it("Check name ru", async () => {
     const res = await request
       .get("store/regions")
       .set("Accept-Language", "ru");
     expect(res.body.data[0].name).to.be.equal("Ташкент");
     expect(res.body.data[1].name).to.be.equal("Ташкентская область");
     expect(res.body.data[2].name).to.be.equal("Андижан");
     expect(res.body.data[3].name).to.be.equal("Фергана");
     expect(res.body.data[4].name).to.be.equal("Бухара");
     expect(res.body.data[5].name).to.be.equal("Ферганская область");
     expect(res.body.data[6].name).to.be.equal("Наманган");
     expect(res.body.data[7].name).to.be.equal("Самарканд");
   });

   it('Check storages on tashkent ru', async() => {
     const res = await request
       .get("store/regions")
       .set("Accept-Language", "ru");

     //склад депо
     expect(res.body.data[0].sklads[0].id).to.be.equal(399);
     expect(res.body.data[0].sklads[0].name).to.be.equal(
       "Texnomart* ДЕПО MALL"
     );
     expect(res.body.data[0].sklads[0].address).to.be.equal(
       'г.Ташкент, Учтепинский район, улица Лутфий. ТРЦ "ДЕПО MALL" (Ориентир: трамвайное депо)'
     );
     expect(res.body.data[0].sklads[0].work_time).to.be.equal("10:00 - 22:00");

     //склад гранд холл
     expect(res.body.data[0].sklads[1].id).to.be.equal(400);
     expect(res.body.data[0].sklads[1].name).to.be.equal(
       "Texnomart* Grand Hall"
     );
     expect(res.body.data[0].sklads[1].address).to.be.equal(
       "г. Ташкент, ул. Янги Шахар, 16a (oриентир торжественный зал Grand Hall, не доезжая Mega Planet)"
     );
     expect(res.body.data[0].sklads[1].work_time).to.be.equal("09:00 - 22:00");

     //склад сампи
     expect(res.body.data[0].sklads[2].id).to.be.equal(401);
     expect(res.body.data[0].sklads[2].name).to.be.equal("Texnomart* СамПи");
     expect(res.body.data[0].sklads[2].address).to.be.equal(
       "г. Ташкент, ул. Богишамол 206А (ориентир ТРЦ SAMPI)"
     );
     expect(res.body.data[0].sklads[2].work_time).to.be.equal("10:00 - 22:00");

     //склад юнусобод
     expect(res.body.data[0].sklads[3].id).to.be.equal(402);
     expect(res.body.data[0].sklads[3].name).to.be.equal("Texnomart* Юнусобод");
     expect(res.body.data[0].sklads[3].address).to.be.equal(
       "г. Ташкент, ул. Амира Темура, 7Б (ориентир Юнусабадский рынок)"
     );
     expect(res.body.data[0].sklads[3].work_time).to.be.equal("09:00 - 20:30");

     //склад миробод
     expect(res.body.data[0].sklads[4].id).to.be.equal(403);
     expect(res.body.data[0].sklads[4].name).to.be.equal("Texnomart* Мирабад");
     expect(res.body.data[0].sklads[4].address).to.be.equal(
       "г. Ташкент, ул. Авлие Ота, 4 (ориентир Госпитальный рынок)"
     );
     expect(res.body.data[0].sklads[4].work_time).to.be.equal("09:00 - 20:30");

     //склад Кадышева
     expect(res.body.data[0].sklads[5].id).to.be.equal(406);
     expect(res.body.data[0].sklads[5].name).to.be.equal("Texnomart* Кадышева");
     expect(res.body.data[0].sklads[5].address).to.be.equal(
       "г. Ташкент, ул. Бешарик, 7 и 8 (ориентир рынок Кадышева)"
     );
     expect(res.body.data[0].sklads[5].work_time).to.be.equal("09:00 - 20:30");

     //склад Паркентский
     expect(res.body.data[0].sklads[6].id).to.be.equal(407);
     expect(res.body.data[0].sklads[6].name).to.be.equal(
       "Texnomart* Паркенский"
     );
     expect(res.body.data[0].sklads[6].address).to.be.equal(
       "г. Ташкент, ул. Паркент, 74, блок 13 (ориентир Паркентский рынок)"
     );
     expect(res.body.data[0].sklads[6].work_time).to.be.equal("09:00 - 20:30");

     //склад Фархадский
     expect(res.body.data[0].sklads[7].id).to.be.equal(408);
     expect(res.body.data[0].sklads[7].name).to.be.equal(
       "Texnomart* Фархадский"
     );
     expect(res.body.data[0].sklads[7].address).to.be.equal(
       "г. Ташкент, ул. Фархадская, блок 1,2 (ориентир Фархадский ТК)"
     );
     expect(res.body.data[0].sklads[7].work_time).to.be.equal("09:00 - 19:00");

     //склад Чиланзор
     expect(res.body.data[0].sklads[8].id).to.be.equal(409);
     expect(res.body.data[0].sklads[8].name).to.be.equal("Texnomart* Чиланзор");
     expect(res.body.data[0].sklads[8].address).to.be.equal(
       "г. Ташкент, ул. Чиланзар, 45/2 (ориентир ТЦ Чиланзар)"
     );
     expect(res.body.data[0].sklads[8].work_time).to.be.equal("09:00 - 20:30");

     //склад Малика
     expect(res.body.data[0].sklads[9].id).to.be.equal(410);
     expect(res.body.data[0].sklads[9].name).to.be.equal("Texnomart* Малика");
     expect(res.body.data[0].sklads[9].address).to.be.equal(
       'г. Ташкент, ул. Кичик Халка Йули, корпус А, 61 (ориентир ТЦ "Флешка"("Малика"))'
     );
     expect(res.body.data[0].sklads[9].work_time).to.be.equal("09:00 - 19:00");

     //склад Орзу
     expect(res.body.data[0].sklads[10].id).to.be.equal(411);
     expect(res.body.data[0].sklads[10].name).to.be.equal("Texnomart* Орзу");
     expect(res.body.data[0].sklads[10].address).to.be.equal(
       "г. Ташкент, ул. КХАЙ (Генерал Узаков), 2А (ориентир перекресток ОРЗУ)"
     );
     expect(res.body.data[0].sklads[10].work_time).to.be.equal("09:00 - 21:00");

     //склад ГУМ
     expect(res.body.data[0].sklads[11].id).to.be.equal(412);
     expect(res.body.data[0].sklads[11].name).to.be.equal("Texnomart* ГУМ");
     expect(res.body.data[0].sklads[11].address).to.be.equal(
       "г. Ташкент, площадь Чорсу, 3А (ориентир ТЦ Ташкент, бывший ГУМ)"
     );
     expect(res.body.data[0].sklads[11].work_time).to.be.equal("09:00 - 22:00");

     //склад Эски Шахар
     expect(res.body.data[0].sklads[12].id).to.be.equal(413);
     expect(res.body.data[0].sklads[12].name).to.be.equal(
       "Texnomart* Эски Шахар"
     );
     expect(res.body.data[0].sklads[12].address).to.be.equal(
       'г. Ташкент, ул. Нурафшон, 7 (ориентир ТРЦ "Eski Shahar")'
     );
     expect(res.body.data[0].sklads[12].work_time).to.be.equal("10:00 - 22:00");

     //склад Ривьера
     expect(res.body.data[0].sklads[13].id).to.be.equal(414);
     expect(res.body.data[0].sklads[13].name).to.be.equal("Texnomart* Ривьера");
     expect(res.body.data[0].sklads[13].address).to.be.equal(
       "г. Ташкент, ул. Нурафшон, 5 (ориентирТРЦ Ривьера)"
     );
     expect(res.body.data[0].sklads[13].work_time).to.be.equal("10:00 - 22:00");

     //склад Compass
     expect(res.body.data[0].sklads[14].id).to.be.equal(415);
     expect(res.body.data[0].sklads[14].name).to.be.equal("Texnomart* Compass");
     expect(res.body.data[0].sklads[14].address).to.be.equal(
       "г. Ташкент, Большая кольцевая дорога, 17 (ориентир ТРЦ Compass)"
     );
     expect(res.body.data[0].sklads[14].work_time).to.be.equal("10:00 - 22:00");

     //склад Сергили
     expect(res.body.data[0].sklads[15].id).to.be.equal(416);
     expect(res.body.data[0].sklads[15].name).to.be.equal("Texnomart* Сергили");
     expect(res.body.data[0].sklads[15].address).to.be.equal(
       "г. Ташкент, ул. Лутфкор (ориентир Сергели Корзинка)"
     );
     expect(res.body.data[0].sklads[15].work_time).to.be.equal("09:00 - 22:00");
   })

   it("Check storages on tashkent district ru", async () => {
      const res = await request
        .get("store/regions")
        .set("Accept-Language", "ru");
     //склад чирчик
     expect(res.body.data[1].sklads[0].id).to.be.equal(405);
     expect(res.body.data[1].sklads[0].name).to.be.equal("Texnomart* Чирчик");
     expect(res.body.data[1].sklads[0].address).to.be.equal(
       "Чирчикская область, г. Чирчик, улица А. Навоий"
     );
     expect(res.body.data[1].sklads[0].work_time).to.be.equal("09:00-19:00");
   });

   it("Check storages on andijon ru", async () => {
     const res = await request
       .get("store/regions")
       .set("Accept-Language", "ru");
     //склад Узбегим
     expect(res.body.data[2].sklads[0].id).to.be.equal(419);
     expect(res.body.data[2].sklads[0].name).to.be.equal("Texnomart* Узбегим");
     expect(res.body.data[2].sklads[0].address).to.be.equal(
       "г. Андижан,  ул. Чулпан Шаха, 10 (ТЦ Узбегим)"
     );
     expect(res.body.data[2].sklads[0].work_time).to.be.equal("10:00 - 22:00");

     //склад 5-микро район
     expect(res.body.data[2].sklads[1].id).to.be.equal(421);
     expect(res.body.data[2].sklads[1].name).to.be.equal(
       "Texnomart* 5-микро район"
     );
     expect(res.body.data[2].sklads[1].address).to.be.equal(
       "г. Андижан, 5-микро район, 6"
     );
     expect(res.body.data[2].sklads[1].work_time).to.be.equal("09:00 - 20:30");

     //склад Navruz Mall
     expect(res.body.data[2].sklads[2].id).to.be.equal(422);
     expect(res.body.data[2].sklads[2].name).to.be.equal(
       "Texnomart* Navruz Mall"
     );
     expect(res.body.data[2].sklads[2].address).to.be.equal(
       "г. Андижан, улица Машраба, 64 (Ориентир: ТЦ Navruz Mall)"
     );
     expect(res.body.data[2].sklads[2].work_time).to.be.equal("10:00-22:00");
   });

   it("Check storages on fergana ru", async () => {
     const res = await request
       .get("store/regions")
       .set("Accept-Language", "ru");
     //склад Фергана
     expect(res.body.data[3].sklads[0].id).to.be.equal(417);
     expect(res.body.data[3].sklads[0].name).to.be.equal("Texnomart* Фергана");
     expect(res.body.data[3].sklads[0].address).to.be.equal(
       "г. Фергана, улица Тимура С. 45 (Ориентир: кинотеатр Собик Нурхон)"
     );
     expect(res.body.data[3].sklads[0].work_time).to.be.equal("09:00-20:30");

     //склад Багдад
     expect(res.body.data[3].sklads[1].id).to.be.equal(420);
     expect(res.body.data[3].sklads[1].name).to.be.equal("Texnomart* Багдад");
     expect(res.body.data[3].sklads[1].address).to.be.equal(
       "Ферганская область, Багдадский район, ул. Мустакиллик, 7 (ориентир вокзал Фуркат)"
     );
     expect(res.body.data[3].sklads[1].work_time).to.be.equal("08:00-18:00");

     //склад Учкуприк
     expect(res.body.data[3].sklads[2].id).to.be.equal(423);
     expect(res.body.data[3].sklads[2].name).to.be.equal("Texnomart* Учкуприк");
     expect(res.body.data[3].sklads[2].address).to.be.equal(
       "Ферганская область, Учкуприкский район, улица Навруз Шаха, 28 (Ориентир: фермерский рынок)"
     );
     expect(res.body.data[3].sklads[2].work_time).to.be.equal("08:00-21:00");
   });

   it("Check storages on buhara ru", async () => {
     const res = await request
       .get("store/regions")
       .set("Accept-Language", "ru");
     //склад Бухара
     expect(res.body.data[4].sklads[0].id).to.be.equal(431);
     expect(res.body.data[4].sklads[0].name).to.be.equal("Texnomart* Бухара");
     expect(res.body.data[4].sklads[0].address).to.be.equal(
       "г. Бухара, улица Ибрагима Муминова, 2 (ориентир ТЦ Бухара)"
     );
     expect(res.body.data[4].sklads[0].work_time).to.be.equal("10:00-20:00");
   });

   it("Check storages on namangan ru", async () => {
     const res = await request
       .get("store/regions")
       .set("Accept-Language", "ru");
     //склад Наманган
     expect(res.body.data[6].sklads[0].id).to.be.equal(418);
     expect(res.body.data[6].sklads[0].name).to.be.equal("Texnomart* Наманган");
     expect(res.body.data[6].sklads[0].address).to.be.equal(
       "г. Наманган, ул. А. Навоий, 67 (Железнодорожный вокзал)"
     );
     expect(res.body.data[6].sklads[0].work_time).to.be.equal("09:00-20:30");
   });

   it("Check storages on samarkand ru", async () => {
      const res = await request
        .get("store/regions")
        .set("Accept-Language", "ru");
      //склад Самарканд
      expect(res.body.data[7].sklads[0].id).to.be.equal(448);
      expect(res.body.data[7].sklads[0].name).to.be.equal(
        "Texnomart* Самарканд"
      );
      expect(res.body.data[7].sklads[0].address).to.be.equal(
        "г. Самарканд, ул. Амира Тимура, 53 (ориентир ресторан Гранд Кумуш)"
      );
      expect(res.body.data[7].sklads[0].work_time).to.be.equal("09:00 - 21:00");
   });
})