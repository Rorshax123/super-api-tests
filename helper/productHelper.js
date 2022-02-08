import { expect } from "chai";

export const checkNotNUllProductItems = (itemArray) => {
    expect(itemArray.product_id).is.not.null;
    expect(itemArray.product_name).is.not.null;
    expect(itemArray.f_sale_price).is.not.null;
    expect(itemArray.f_loan_price).is.not.null;
    expect(itemArray.image).is.not.null;
};
