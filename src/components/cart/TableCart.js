import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuantity,
  changeTotal,
  removeItem,
  subtractQuantity,
} from "../../actions/cart";

export const TableCart = ({ addedItems }) => {
  const dispatch = useDispatch();

  const handleAddClick = (id) => {
    //const item = addedItems.filter(cuadro => cuadro.id == id);
    dispatch(addQuantity(id));
  };

  const handleSubClick = (id) => {
    dispatch(subtractQuantity(id));
  };

  const handleRemoveItemClick = (id) => {
    dispatch(removeItem(id));
  };
  useEffect(() => {
    if (addedItems.length == 0) {
      dispatch(changeTotal(0));
    }
  }, [addedItems]);

  return (
    <>
      {addedItems && (
        <div style={{ width: "90%" }}>
          <p
            style={{ marginLeft: "4.5rem" }}
            className="title-info product-title"
          >
            Carrito de compras
          </p>
          <div className="table-responsive">
            <table className="table table-details">
              <thead className="table-light text-center">
                <tr
                  style={{
                    borderColor: "inherit",
                    borderStyle: "solid",
                    borderWidth: 2,
                  }}
                >
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {addedItems.map((item) => (
                  <tr className="align-middle text-center">
                    <th scope="row" width="40%">
                      <div className="container-product-item principal-info">
                        <i
                          onClick={() => handleRemoveItemClick(item.id)}
                          className="fas fa-trash-alt cart__icons delete"
                        ></i>
                        <img
                          className="product-img"
                          src={item.image_url}
                          width="80px"
                        />
                        <div className="text-container-product">
                          <p className="product-name margin-0">{item.name}</p>
                          <p className="description-product-item material-name margin-0">
                            {item.material}
                          </p>
                          <p className="description-product-item dimensions margin-0">{`${item.medidas} m`}</p>
                        </div>
                      </div>
                    </th>
                    <td
                      width="20%"
                      className="row-price"
                    >{`$ ${item.price}`}</td>
                    <td width="20%">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.quantity}
                        <div className="cart__icons-container">
                          <i
                            onClick={() => handleAddClick(item.id)}
                            className="fas fa-angle-up cart__icons"
                          ></i>
                          <i
                            onClick={() => handleSubClick(item.id)}
                            className="fas fa-angle-down cart__icons"
                          ></i>
                        </div>
                      </div>
                    </td>
                    <td width="20%">{`$ ${(
                      (+(item.price * item.quantity) * 100) /
                      100
                    ).toFixed(2)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
