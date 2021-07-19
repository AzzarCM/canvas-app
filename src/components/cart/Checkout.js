import React, { useEffect, useState } from "react";
import { Navbar } from "../main/Navbar";
import { CartList } from "./CartList";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useFormik } from "formik";
import firebase from "firebase/app";
import { emptyCart } from "../../actions/cart";
import Swal from "sweetalert2";
import validator from "validator";
import { Footer } from "../main/Footer";
import errorImg from "../../assets/img/error.png";
import doneImg from "../../assets/img/done.png";
import wompi from "../../assets/img/wompi2.png";
import visamaster from "../../assets/img/visamaster.png";
import { API_HOST } from "../../constants/URLS";
import { TableCart } from "./TableCart";

export const Checkout = () => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "April",
    "Mayo",
    "Junio",
    "Julio",
    "Augosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Deciembre",
  ];
  const dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  //constants from firebasse
  var uid = firebase.auth().currentUser.uid;
  var name = firebase.auth().currentUser.displayName;
  var mail = firebase.auth().currentUser.email;

  //redux variables
  const dispatch = useDispatch();
  const { total, addedItems } = useSelector((state) => state.cart);

  //useStates

  var today = new Date();
  var tresDias = new Date();
  var cincoDias = new Date();

  tresDias.setDate(today.getDate() + 3);
  cincoDias.setDate(today.getDate() + 5);

  //validation with formik

  const formValues = useFormik({
    initialValues: {
      customer_name: name,
      email: mail,
      customer_phone: "",
      delivery_address: "",
      customer_uid: uid,
      instructions: "",
      suburb: "",
      department: "",
      municipality: "",
      delivery_cost: 0,
      total_amount: 0,
    },
    validate: (values) => {
      let errors = {};

      if (validator.isEmpty(values.customer_name)) {
        errors.customer_name = "Campo del nombre requerido";
      }
      if (validator.isEmpty(values.email)) {
        errors.email = "Correo electronico requerido";
      }
      if (validator.isEmpty(values.customer_phone)) {
        errors.customer_phone = "Campo del telefono requerido";
      } else if (!validator.isLength(values.customer_phone, 8, 8)) {
        errors.customer_phone = "El telefono debe ser de 8 digitos";
      }
      if (validator.equals(values.department, "")) {
        errors.department = "Selecciona un departamento";
      }
      if (validator.equals(values.municipality, "")) {
        errors.municipality = "Selecciona un municipio";
      }
      if (validator.isEmpty(values.suburb)) {
        errors.suburb = "Completa el nombre de tu colonia";
      }
      if (validator.isEmpty(values.delivery_address)) {
        errors.delivery_address =
          "Completa el campo de la direccion de tu casa";
      }
      return errors;
    },
  });
  const [visa, setVisa] = useState(false);
  const [masterCard, setMasterCard] = useState(false);
  const cardValues = useFormik({
    initialValues: {
      numeroTarjeta: "",
      mesVencimiento: "",
      anioVencimiento: "",
      cvv: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.numeroTarjeta[0] == 4) {
        setVisa(true);
      } else if (values.numeroTarjeta[0] == 5) {
        setMasterCard(true);
      } else {
        setVisa(false);
        setMasterCard(false);
      }
      if (validator.isEmpty(values.numeroTarjeta)) {
        errors.numeroTarjeta = "Completa el campo de la tarjeta";
      } else if (!validator.isNumeric(values.numeroTarjeta)) {
        errors.numeroTarjeta = "No ingresar letras";
      } else if (!validator.isCreditCard(values.numeroTarjeta)) {
        errors.numeroTarjeta = "Número de tarjeta inválido";
      }
      if (validator.isEmpty(values.mesVencimiento)) {
        errors.mesVencimiento = "El mes esta vacio";
      } else if (!validator.isLength(values.mesVencimiento, 2, 2)) {
        errors.mesVencimiento = "Requiere 2 digitos";
      } else if (!validator.isNumeric(values.mesVencimiento)) {
        errors.mesVencimiento = "No introducir letras";
      }
      if (validator.isEmpty(values.anioVencimiento)) {
        errors.anioVencimiento = "El año esta vacio";
      } else if (!validator.isLength(values.anioVencimiento, 4, 4)) {
        errors.anioVencimiento = "Requiere 4 digitos";
      } else if (!validator.isNumeric(values.anioVencimiento)) {
        errors.anioVencimiento = "No introducir letras";
      }
      if (validator.isEmpty(values.cvv)) {
        errors.cvv = "CVV vacio";
      } else if (!validator.isNumeric(values.cvv)) {
        errors.cvv = "No introducir letras";
      }

      return errors;
    },
  });

  const [totalPlusShipping, setTotalPlusShipping] = useState(0);
  const [departamentos, setDepartamentos] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState(1);
  const [municipios, setMunicipios] = useState([]);
  const [shipping, setShipping] = useState(0);
  const [municipioName, setMunicipioName] = useState("");
  const [flagMunicipio, setFlagMunicipio] = useState(false);
  const [departamentoName, setDepartamentoName] = useState("");

  useEffect(() => {
    setTotalPlusShipping((total + parseFloat(shipping)).toFixed(2));
  }, [formValues.values, cardValues.values]);

  const handleDepartamentos = (e) => {
    setIdDepartamento(e.target.value);
    setDepartamentoName(e.target.options[e.target.selectedIndex].text);
  };
  const handleMunicipios = (e) => {
    setShipping(e.target.value);
    setMunicipioName(e.target.options[e.target.selectedIndex].text);
    setFlagMunicipio(true);
  };

  const item = addedItems.map((item) => {
    return {
      paintingId: item.id,
      material_id: item.material_id,
      measurements: item.medidas,
      price: item.price,
      quantity: item.quantity,
    };
  });

  function getDepartments() {
    const url = `${API_HOST}/departments`;
    var idToken = localStorage.getItem("idToken");
    return fetch(url, {
      headers: {
        Authorization: "Bearer " + idToken,
      },
    })
      .then((res) => res.json())
      .then((result) => result);
  }

  function getMunicipios() {
    const url = `${API_HOST}/municipalities/${idDepartamento}`;
    var idToken = localStorage.getItem("idToken");
    return fetch(url, {
      headers: {
        Authorization: "Bearer " + idToken,
      },
    })
      .then((res) => res.json())
      .then((result) => result);
  }

  useEffect(() => {
    getDepartments().then(({ departments }) => {
      setDepartamentos(departments);
    });
  }, []);

  useEffect(() => {
    getMunicipios().then(({ municipalities }) => {
      setMunicipios(municipalities);
    });
  }, [idDepartamento]);

  formValues.values.department = departamentoName;
  formValues.values.municipality = municipioName;
  formValues.values.delivery_cost = shipping;
  formValues.values.total_amount = parseFloat(totalPlusShipping);

  const handleSubmitData = () => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        if (
          JSON.stringify(formValues.errors) == "{}" &&
          JSON.stringify(cardValues.errors) == "{}" &&
          flagMunicipio
        ) {
          const data = {
            ...formValues.values,
            cardData: cardValues.values,
            detail: item,
          };
          console.log(data);
          Swal.fire({
            title: "Seguro que desea proceder?",
            confirmButtonText: "Si, seguro!",
            showLoaderOnConfirm: true,
            showDenyButton: true,
            preConfirm: () => {
              const url = `${API_HOST}/orders`;
              return fetch(url, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + idToken,
                },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((resp) => {
                  console.log(resp);

                  if (!resp.error) {
                    const path = `/main/history/${uid}`;
                    Swal.fire({
                      imageUrl: doneImg,
                      title: "Gracias!",
                      html: '<p style="color:#42bda5;font-size: 35;">Excelente! Tu<br>compra ha sido<br>realizada con exito</p>',
                      showConfirmButton: true,
                      confirmButtonText: "Entendido!",
                      footer: `<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="${path}">Ver Historial</a>`,
                    });
                    dispatch(emptyCart());
                    setTotalPlusShipping(0);
                    console.log("posteado con exito");
                  } else {
                    Swal.fire({
                      imageUrl: errorImg,
                      html: '<p style="color:#42bda5;font-size: 35;">Ops! Parece <br> que tu compra <br> no ha sido procesada</p>',
                      showConfirmButton: true,
                      confirmButtonText: "Ver detalles",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          html: `<pre><code>${resp.message}</code></pre>`,
                        });
                      }
                    });
                  }
                });
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Opss...",
            text: "Lo siento hay campos vacios!",
            confirmButtonText: "OK",
          });
        }
      })
      .catch(function (error) {
        // Handle error
        console.log("hubo un error con la autorizacion bearer", error);
      });
  };

  return (
    <div className="home__main-container animate__animated animate__fadeIn">
      <Navbar />
      <form className="checkout__form">
        <h2 className="temas__title-busqueda mb-5 mt-5">
          Información del cliente
        </h2>
        <div className="checkout__input-container">
          <div className="input-container">
            <label className="label-forms">
              Nombre <span style={{ color: "red" }}>*</span>
            </label>
            <div className="input-with-icon">
              <i className="fas fa-user icon"></i>
              <input
                className="input-number-card"
                type="text"
                name="customer_name"
                placeholder="Nombre"
                value={formValues.values.customer_name}
                onChange={formValues.handleChange}
              />
            </div>
          </div>
          {formValues.errors.customer_name ? (
            <p className="foot__sticky-note label-forms">
              {formValues.errors.customer_name}
            </p>
          ) : null}
          <div className="input-container">
            <label className="label-forms">
              Correo electrónico <span style={{ color: "red" }}>*</span>
            </label>
            <div className="input-with-icon">
              <i className="fas fa-envelope icon"></i>
              <input
                className="input-number-card"
                type="email"
                name="email"
                placeholder="Correo Electronico"
                value={formValues.values.email}
                onChange={formValues.handleChange}
              />
            </div>
          </div>
          {formValues.errors.email ? (
            <p className="foot__sticky-note label-forms">
              {formValues.errors.email}
            </p>
          ) : null}
          <div>
            <div className="input-container">
              <label className="label-forms">
                Teléfono <span style={{ color: "red" }}>*</span>
              </label>
              <div className="input-with-icon">
                <i className="fas fa-phone icon"></i>
                <input
                  className="input-number-card"
                  type="text"
                  name="customer_phone"
                  maxLength="8"
                  placeholder="Numero telefonico"
                  value={formValues.values.customer_phone}
                  onChange={formValues.handleChange}
                />
              </div>
            </div>
            {formValues.errors.customer_phone ? (
              <p className="foot__sticky-note label-forms">
                {formValues.errors.customer_phone}
              </p>
            ) : null}
          </div>
        </div>
        <h2 className="temas__title-busqueda mb-5 mt-5">
          Información de la entrega
        </h2>
        <div className="checkout__input-container">
          <div>
            <label className="label-forms">
              Departamento <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="cart__select-zones"
              name="department"
              onChange={(e) => {
                handleDepartamentos(e);
                formValues.handleChange(e);
              }}
            >
              <option selected disabled hidden>
                Selecciona un departamento
              </option>
              {departamentos.map((depa) => {
                return (
                  <option key={depa.id} value={depa.id}>
                    {depa.name}
                  </option>
                );
              })}
            </select>
            {formValues.errors.department ? (
              <p className="foot__sticky-note label-forms">
                {formValues.errors.department}
              </p>
            ) : null}
            <br />
            <br />
          </div>
          <div>
            <label className="label-forms">
              Municipio <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="cart__select-zones"
              name="municipality"
              onChange={(e) => {
                handleMunicipios(e);
                formValues.handleChange(e);
              }}
            >
              <option selected disabled hidden>
                Selecciona un municipio
              </option>
              {municipios.map((muni) => {
                return (
                  <option key={muni.id} value={muni.delivery_cost}>
                    {muni.name}
                  </option>
                );
              })}
            </select>
            {formValues.errors.municipality ? (
              <p className="foot__sticky-note label-forms">
                {formValues.errors.municipality}
              </p>
            ) : null}
          </div>
          <div>
            <div className="input-with-icon">
              <i className="fas fa-map-marked-alt icon"></i>
              <input
                className="text-area-direccion"
                type="text"
                name="suburb"
                placeholder="Colonia"
                value={formValues.values.suburb}
                onChange={formValues.handleChange}
              />
            </div>
            {formValues.errors.suburb ? (
              <p className="foot__sticky-note label-forms">
                {formValues.errors.suburb}
              </p>
            ) : null}
          </div>
          <div>
            <div className="input-with-icon">
              <i className="fas fa-map-marked-alt icon"></i>
              <textarea
                className="text-area-direccion"
                type="text"
                name="delivery_address"
                placeholder="Dirección completa y específica de entrega"
                value={formValues.values.delivery_address}
                onChange={formValues.handleChange}
              />
            </div>
            {formValues.errors.delivery_address ? (
              <p className="foot__sticky-note label-forms">
                {formValues.errors.delivery_address}
              </p>
            ) : null}
          </div>
          <div className="input-with-icon">
            <i className="fas fa-asterisk icon"></i>
            <textarea
              className="text-area-direccion"
              type="text"
              name="instructions"
              placeholder="Instrucciones especiales"
              onChange={formValues.handleChange}
              value={formValues.values.instructions}
            />
          </div>
        </div>
        <h2 className="temas__title-busqueda mb-5 mt-5">Información de pago</h2>
        <div className="checkout__img-container">
          <img src={wompi} alt="wompi" style={{ width: 200 }} />
          <img
            src={visamaster}
            alt="visamaster"
            style={{ width: 120, marginLeft: "1rem" }}
          />
        </div>
        <div className="checkout__pago-container">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {cardValues.errors.numeroTarjeta ? (
              <p className="foot__sticky-note label-forms">
                {cardValues.errors.numeroTarjeta}
              </p>
            ) : null}
            <div className="input-with-icon">
              {visa ? (
                <i className="fab fa-cc-visa icon"></i>
              ) : masterCard ? (
                <i className="fab fa-cc-mastercard icon"></i>
              ) : (
                <i className="fas fa-credit-card icon"></i>
              )}
              <input
                className="input-number-card"
                type="text"
                maxLength="16"
                placeholder="Numero tarjeta sin espacios"
                name="numeroTarjeta"
                value={cardValues.values.numeroTarjeta}
                onChange={cardValues.handleChange}
              />
            </div>
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <div className="inputs-container-foot">
                <i className="fas fa-calendar-day icon"></i>
                <input
                  className="input__card-field"
                  type="text"
                  placeholder="MM"
                  maxLength="2"
                  name="mesVencimiento"
                  value={cardValues.values.mesVencimiento}
                  onChange={cardValues.handleChange}
                />
              </div>
              {cardValues.errors.mesVencimiento ? (
                <p className="foot__sticky-note label-forms">
                  {cardValues.errors.mesVencimiento}
                </p>
              ) : null}
            </div>
            <div style={{ width: "50%" }}>
              <div className="inputs-container-foot">
                <i className="far fa-calendar icon"></i>
                <input
                  className="input__card-field"
                  type="text"
                  placeholder="YYYY"
                  maxLength="4"
                  name="anioVencimiento"
                  value={cardValues.values.anioVencimiento}
                  onChange={cardValues.handleChange}
                />
              </div>
              {cardValues.errors.anioVencimiento ? (
                <p className="foot__sticky-note label-forms">
                  {cardValues.errors.anioVencimiento}
                </p>
              ) : null}
            </div>
          </div>

          <div
            style={{ width: "50%", marginTop: "1rem" }}
            className="inputs-container-foot"
          >
            <i className="fas fa-lock icon"></i>
            <input
              className="input__card-field"
              type="password"
              maxLength="3"
              placeholder="CVC"
              name="cvv"
              value={cardValues.values.cvv}
              onChange={cardValues.handleChange}
            />
          </div>
          {cardValues.errors.cvv ? (
            <p className="foot__sticky-note label-forms">
              {cardValues.errors.cvv}
            </p>
          ) : null}
        </div>
      </form>
      <h1 className="selled__title-related mb-5">Resumen de la compra</h1>
      <p className="label-forms">{`NOTA: la entrega estimada seria entre el ${
        dayNames[tresDias.getDay()]
      } ${tresDias.getDate()} de ${monthNames[tresDias.getMonth()]} al  ${
        dayNames[cincoDias.getDay()]
      } ${cincoDias.getDate()} de ${monthNames[cincoDias.getMonth()]}`}</p>
      <TableCart addedItems={addedItems} />
      <div className="cart__container-total">
        <div className="cart__container-divs-total">
          <div className="cart__horizontal-total">
            <p className="cart__p-align">Sub Total</p>
            <p>{`$${(+total).toFixed(2)}`}</p>
          </div>
          <div className="cart__horizontal-total">
            <p className="cart__p-align">Costo de envío</p>
            <p>{`$${(+shipping).toFixed(2)}`}</p>
          </div>
          <div className="cart__horizontal-total">
            <p className="cart__p-align">Total</p>
            <p className="cart__total-color">{`$${(+total + +shipping).toFixed(2)}`}</p>
          </div>
          <button
            onClick={handleSubmitData}
            className="checkout-button"
            type="submit"
          >
            Confirmar compra
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
