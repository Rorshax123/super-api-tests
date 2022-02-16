import request from "../config/common";
import { expect } from "chai";
import { describe } from "mocha";
import { checkNotNUllProductItems } from "../helper/productHelper";


describe('Home page get', () => {

  describe('Check status code', () =>{
    it("Main page 200", async () => {
      const res = await request.get("home/");
      expect(res.statusCode).to.be.eq(200);
    });
  })
   
  describe('Check main items for not null', () => {
    it("Special categories are not null", async () => {
      const res = await request.get("home/");
      expect(res.body.data.specialCategoryProducts).is.not.null;
      expect(res.body.data.specialCategoryProducts).to.deep.not.equal([]);
    });

    it("Slider is not null", async () => {
      const res = await request.get("home/");
      expect(res.body.data.slider).is.not.null;
      expect(res.body.data.slider).to.deep.not.equal([]);
    });

    it("Categories are not null", async () => {
      const res = await request.get("home/");
      expect(res.body.data.categories).is.not.null;
      expect(res.body.data.categories).to.deep.not.equal([]);
    });

    it("New_products are not null", async () => {
      const res = await request.get("home/");
      expect(res.body.data.new_products).is.not.null;
      expect(res.body.data.new_products).to.deep.not.equal([]);
    });

    it("HitProducts are not null", async () => {
      const res = await request.get("home/");
      expect(res.body.data.hitProducts).is.not.null;
      expect(res.body.data.hitProducts).to.deep.not.equal([]);
    });

    it("Recommended_products are not null", async () => {
      const res = await request.get("home/");
      expect(res.body.data.recommended_products).is.not.null;
      expect(res.body.data.recommended_products).to.deep.not.equal([]);
    });
  })

  describe('Check data on specialCategoryProducts title uz', () => {

    it("Smartfon", async () => {
      const res = await request.get("home/").set('Accept-Language', 'uz');
      expect(res.body.data.specialCategoryProducts[0].title).to.be.eq("Smartfon");
    });

    it("Chang yutgich", async () => {
      const res = await request.get("home/").set("Accept-Language", "uz");
      expect(res.body.data.specialCategoryProducts[1].title).to.be.eq(
        "Chang yutgich"
      );
    });

    it("Planshet", async () => {
      const res = await request.get("home/").set("Accept-Language", "uz");
      expect(res.body.data.specialCategoryProducts[2].title).to.be.eq(
        "Planshet"
      );
    });

    it("Muzlatgich", async () => {
      const res = await request.get("home/").set("Accept-Language", "uz");
      expect(res.body.data.specialCategoryProducts[3].title).to.be.eq(
        "Muzlatgich"
      );
    });

    it("Havo sovutgich", async () => {
      const res = await request.get("home/").set("Accept-Language", "uz");
      expect(res.body.data.specialCategoryProducts[4].title).to.be.eq(
        "Havo sovutgich"
      );
    });

     it("Televizor", async () => {
       const res = await request.get("home/").set("Accept-Language", "uz");
       expect(res.body.data.specialCategoryProducts[5].title).to.be.eq(
         "Televizor"
       );
     });

     it("Fen", async () => {
       const res = await request.get("home/").set("Accept-Language", "uz");
       expect(res.body.data.specialCategoryProducts[6].title).to.be.eq("Fen");
     });
     

      it("Kir yuvish mashinasi", async () => {
        const res = await request.get("home/").set("Accept-Language", "uz");
        expect(res.body.data.specialCategoryProducts[7].title).to.be.eq(
          "Kir yuvish mashinasi"
        );
      });
  })

  describe("Check data on specialCategoryProducts title ru", () => {
    it("Смартфоны", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      let itemArray = res.body.data.specialCategoryProducts[0].items;
      expect(res.body.data.specialCategoryProducts[0].title).to.be.eq(
        "Смартфоны"
      );
    });

    it("Пылесос", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[1].title).to.be.eq(
        "Пылесос"
      );
    });

    it("Планшет", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[2].title).to.be.eq(
        "Планшет"
      );
    });

    it("Холодильник", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[3].title).to.be.eq(
        "Холодильник"
      );
    });

    it("Кондиционер", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[4].title).to.be.eq(
        "Кондиционер"
      );
    });

    it("Телевизор", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[5].title).to.be.eq(
        "Телевизор"
      );
    });

    it("Фены", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[6].title).to.be.eq("Фены");
    });

    it("Стиральная машина", async () => {
      const res = await request.get("home/").set("Accept-Language", "ru");
      expect(res.body.data.specialCategoryProducts[7].title).to.be.eq(
        "Стиральная машина"
      );
    });
  })

  describe("Check data on specialCategoryProducts items is not null", async() => {
    
    it("not null", async () => {
      const res = await request.get("home/");
      let categoryArray = res.body.data.specialCategoryProducts;
      for (let i = 0; i < categoryArray.length; i++) {
        let itemArray = categoryArray[i].items;
        for (let j = 0; j < itemArray.length; j++) {
          checkNotNUllProductItems(itemArray[j]);          
        }
      }
    });
  })
})

describe('Home recently viewed post', () => {
  it('Send empty field', async() => {
    const data = [];
    const res = await request.post("home/recently").send(data);
    expect(res.statusCode).to.be.eq(200);
    expect(res.body.data).to.deep.equal([]);
  });

  it("Send two products on data", async () => {
    const data = [82860, 88827];
    const res = await request
      .post("home/recently")
      .send(data)
      .set("Accept-Language", "ru");
    expect(res.statusCode).to.be.eq(200);
    expect(res.body.data[0].id).to.be.equal(82860);
    expect(res.body.data[0].name).to.be.equal(
      "Увлажнитель воздуха Philips HU4801/01"
    );
    expect(res.body.data[0].image).to.be.equal(
      "/images/gallery/product/82860/11396/preview.jpg"
    );
    expect(res.body.data[1].id).to.be.equal(88827);
    expect(res.body.data[1].name).to.be.equal("Стайлер Polaris PHS 5095TAi");
    expect(res.body.data[1].image).to.be.equal(
      "/images/gallery/product/88827/19367/preview.jpg"
    );
  });

    it("Send 10 products", async () => {
      const data = [
        88827, 82860, 99372, 99373, 99374, 99375, 99376, 99377, 99379, 99380,
      ];
      const res = await request.post("home/recently").send(data);
        expect(res.body.data[0].id).to.be.equal(82860);
        expect(res.body.data[1].id).to.be.equal(88827);
        expect(res.body.data[2].id).to.be.equal(99372);
        expect(res.body.data[3].id).to.be.equal(99373);
        expect(res.body.data[4].id).to.be.equal(99374);
        expect(res.body.data[5].id).to.be.equal(99375);
        expect(res.body.data[6].id).to.be.equal(99376);
        expect(res.body.data[7].id).to.be.equal(99377);
        expect(res.body.data[8].id).to.be.equal(99379);
        expect(res.body.data[9].id).to.be.equal(99380);
    });

})

describe('New profucts', () => {

  it('Check status code of new products when swiping', async() => {
    const res = await request.get("home/infinity");
    expect(res.statusCode).to.be.equal(200);
    expect(res.body.success).to.be.equal(true);
  })

  it('Checking data is not null', async() => {
    const res = await request.get("home/infinity");
    expect(res.body.data).is.not.null;
  })

  it("Checking items is not null", async () => {
     const res = await request.get("home/infinity");
    expect(res.body.data.items).is.not.null;
    expect(res.body.data.items).to.deep.not.equal([]);
   });

   it("Checking item's first element data's are not null", async () => {
     const res = await request.get("home/infinity");
     expect(res.body.data.items[0].id).is.not.null;
     expect(res.body.data.items[0].unique_id).is.not.null;
     expect(res.body.data.items[0].unique_id).is.not.equal("");
     expect(res.body.data.items[0].name).is.not.null;
     expect(res.body.data.items[0].name).is.not.equal("");
     expect(res.body.data.items[0].description).is.not.null;
     expect(res.body.data.items[0].description).is.not.equal("");
     expect(res.body.data.items[0].image).is.not.null;
     expect(res.body.data.items[0].image).is.not.equal("");
     expect(res.body.data.items[0].sale_price).is.not.null;
     expect(res.body.data.items[0].loan_price).is.not.null;
     expect(res.body.data.items[0].f_sale_price).is.not.equal("");
     expect(res.body.data.items[0].f_sale_price).is.not.null;
     expect(res.body.data.items[0].f_loan_price).is.not.equal("");
     expect(res.body.data.items[0].f_loan_price).is.not.null;
   });

  it("Checking _links is not null", async () => {
    const res = await request.get("home/infinity");
    expect(res.body.data._links).is.not.null;
    expect(res.body.data._links).to.deep.not.equal({});
  });

  it("Checking _meta is not null", async () => {
       const res = await request.get("home/infinity");
       expect(res.body.data._meta).is.not.null;
       expect(res.body.data._meta).to.deep.not.equal({});
     });

  it("Checking _meta datas are not null", async () => {
       const res = await request.get("home/infinity");
       expect(res.body.data._meta.totalCount).is.not.null;
       expect(res.body.data._meta.pageCount).is.not.null;
       expect(res.body.data._meta.currentPage).is.not.null;
       expect(res.body.data._meta.perPage).is.not.null;
     });
})