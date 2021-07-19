import React, { useState, useEffect } from "react";
import { Navbar } from "../main/Navbar";
import { Footer } from "../main/Footer";
import { useParams, useHistory } from "react-router-dom";
import checkbox from "../../assets/img/checkbox.png";
import tarjeta from "../../assets/img/tarjeta.png";
import { Relacionados } from "./Relacionados";
import compra from "../../assets/img/compra.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cart";
import Swal from "sweetalert2/src/sweetalert2.js";
import errorImg from "../../assets/img/error.png";
import { SearchBar } from "../search/SearchBar";
import { API_HOST } from "../../constants/URLS";
import { CarouselImages } from "./CarouselImages";
import validator from 'validator';

export const TemasScreen = () => {
  window.onpopstate = function name(e) {
    window.location.reload();
  };
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();
  const [banderitaCheck, setBanderitaCheck] = useState(false);

  const [painting, setPainting] = useState([]);
  const [banderaMat, setBanderaMat] = useState(false);
  const [idMaterial, setIdMaterial] = useState(1);
  const [dimensions, setDimensions] = useState([]);
  const [banderaDim, setBanderaDim] = useState(false);
  const [medidas, setMedidas] = useState("");
  const [radioChecked, setRadioChecked] = useState(true);
  const [temaId, setTemaId] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [material, setMaterial] = useState("");
  const [discount, setDiscount] = useState(0);
  const [precioReal, setPrecioReal] = useState(0);

  useEffect(() => {
    getPainting();
  }, []);

  const getPainting = async () => {
    if(!validator.isNumeric(id)){
      history.push('/main/themes');
      return;
    }
    const url = `${API_HOST}/paintings/${id}`;
    const resp = await fetch(url);

    const { painting_info } = await resp.json();
    if (painting_info.length == 0) {
      history.push('/main/themes');
    } else {
      const cuadro = painting_info.map((img) => {
        return {
          id: img.id,
          name: img.name,
          url: img.image_url,
          descripcion: img.description,
          materials: img.materials,
          measurements: img.measurements,
          theme_id: img.theme_id,
          stock: img.stock,
        };
      });
      const descuento = painting_info.map((item) => {
        return item.theme.discount;
      });
      handleDropDownChange({ target: { value: cuadro[0].materials[0].id } });
      setDiscount(descuento);
      setPainting(cuadro);
      setBanderaMat(true);
      setBanderaDim(true);
    }
  };

  const handleClick = () => {
    if (precio === 0 || material === "" || precio == 0 || precio === null) {
      Swal.fire({
        imageUrl: errorImg,
        imageWidth: 155,
        imageHeight: 250,
        html: '<p style="color:#42bda5;font-size: 35;">Debes seleccionar un material y su dimension!</p>',
        showConfirmButton: true,
      });
    } else if (JSON.stringify(authState) == "{}") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: '<p style="color:#42bda5;font-size: 35;">Inicia sesion para comprar!</p>',
        showConfirmButton: false,
        footer:
          '<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="/auth/login">Iniciar sesión</a>',
      });
    } else {
      dispatch(addToCart(id, precio, material, idMaterial, medidas));
    }
  };

  const handleAddToCart = () => {
    console.log({ precio, material });
    if (precio === 0 || material === "" || precio == 0) {
      Swal.fire({
        imageUrl: errorImg,
        imageWidth: 155,
        imageHeight: 250,
        html: '<p style="color:#42bda5;font-size: 35;">Debes seleccionar un material y su dimensión</p>',
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        position: "center",
        html: '<p style="color:#42bda5;font-size: 35;">Se agregó el cuadro al carrito</p>',
        imageUrl: compra,
        imageWidth: 200,
        imageHeight: 200,
      });
      dispatch(addToCart(id, precio, material, idMaterial, medidas));
      let path = `/main/cart`;
      history.push(path);
    }
  };

  const handleWarning = () => {
    Swal.fire({
      icon: "warning",
      title: "Atención!",
      html: '<p style="color:#42bda5;font-size: 35;">Inicia sesión para comprar</p>',
      showConfirmButton: false,
      footer:
        '<a style="background-color: #42bda5; padding: 10px; border-radius: 5px; color: #fff" href="/auth/login">Iniciar Sesion</a>',
    });
  };

  const handleDropDownChange = (e) => {
    setIdMaterial(e.target.value);
    setBanderaDim(true);
    setRadioChecked(false);
    setPrecio(0);
  };

  const handlePrice = (e) => {
    if (discount != null && discount > 0) {
      setPrecio((+(e.target.value * (1 - discount) * 100) / 100).toFixed(2));
      setPrecioReal(e.target.value);
      setRadioChecked(true);
    } else {
      setPrecio((+(e.target.value * 100) / 100).toFixed(2));
      setRadioChecked(true);
    }
  };

  const handleChecked = (name) => {
    setBanderitaCheck(true);
    setMaterial(name);
  };

  const handleCheckedDim = (altura, ancho) => {
    const medida = `${altura} X ${ancho}`;
    setMedidas(medida);
  };

  if (banderaDim && painting[0]) {
    const result = painting[0].measurements.filter(
      (dim) => dim.material_id == idMaterial
    );
    setTemaId(painting[0].theme_id);
    result.sort(function (a, b) {
      if (a.height * a.width > b.height * b.width) {
        return 1;
      }
      if (a.height * a.width < b.height * b.width) {
        return -1;
      }
      return 0;
    });
    const { width, height } = result[0];
    handlePrice({ target: { value: result[0].price } });
    handleCheckedDim(height, width);
    setDimensions(result);
    setBanderaDim(false);
    handleChecked(painting[0].materials[0].name);
  }

  return (
    <div className="home__main-container animate__animated animate__fadeInLeft">
      <Navbar />
      <SearchBar />
      <div className="temas__tema-container">
        <div className="temas__image-container">
          {painting.map((img) => {
            return <CarouselImages key={img.id} img={img.url} />;
          })}
          <div className="temas__garantia">
            <img alt="imagen" src={checkbox} />
            <p className="temas__garantia-p">
              Garantía de 30 días, lo cambiamos o regresamos tu dinero.
            </p>
          </div>
        </div>
        <div className="temas__info-container">
          {painting.map((item) => {
            return (
              <h1 key={item.id} className="temas__info-h1">
                {discount > 0 ? (
                  <>
                    {item.name}
                    <hr />
                    <span style={{ color: "red" }}>{`- ${
                      discount * 100
                    }% descuento`}</span>
                  </>
                ) : (
                  item.name
                )}
              </h1>
            );
          })}

          {precio == 0 ? (
            <p className="temas__precio-cuadro"></p>
          ) : (
            <p className="temas__precio-cuadro">
              {precioReal > 0 ? (
                <div className="temas__precio-container">
                  <p className="temas__precio-normal-tachado">{`$${precioReal}`}</p>
                  <p className="temas__precio-normal">{`Precio: $${(
                    +(precio * 100) / 100
                  ).toFixed(2)}`}</p>
                </div>
              ) : (
                <p className="temas__precio-normal">{`Precio: $${precio}`}</p>
              )}
            </p>
          )}
          <div className="temas__materiales">
            <div className="temas__width-select">
              <h4 className="temas__btn-title-mat">
                Seleccione <br />
                material
              </h4>
              <div className="btn-div-wrap">
                {banderaMat ? (
                  painting[0].materials.map((material, index) => {
                    return (
                      <div key={material.id}>
                        <input
                          onClick={handleDropDownChange}
                          className="btn-radio"
                          type="radio"
                          name="name_name"
                          id={material.name}
                          value={material.id}
                          style={{ visibility: "hidden" }}
                          defaultChecked={index == 0}
                        />
                        <label
                          onClick={() => handleChecked(material.name)}
                          className="btn-material"
                          htmlFor={material.name}
                        >
                          {material.name}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>No hay medidas disponibles</p>
                )}
              </div>
            </div>

            <div className="temas__width-select">
              <h4
                style={{ marginBottom: 0, marginRight: 15 }}
                className="temas__btn-title"
              >
                Seleccione <br />
                dimensión
              </h4>
              <div className="btn-div-wrap">
                {banderitaCheck ? (
                  dimensions.length >= 1 ? (
                    dimensions.map((dim, index) => {
                      return (
                        <div key={dim.id}>
                          <input
                            onClick={handlePrice}
                            className="btn-radio-second"
                            type="radio"
                            name="name_name2"
                            id={dim.id}
                            value={dim.price}
                            style={{ visibility: "hidden" }}
                            defaultChecked={index == 0}
                          />
                          <label
                            className="btn-material"
                            htmlFor={dim.id}
                            onClick={() =>
                              handleCheckedDim(dim.height, dim.width)
                            }
                          >
                            {`${dim.height} X ${dim.width} m`}
                          </label>
                        </div>
                      );
                    })
                  ) : (
                    <p>No hay medidas disponibles</p>
                  )
                ) : (
                  <h3 className="selled__title-related sel-mat">
                    Debes seleccionar un material
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className="temas__buy-container-right">
            <button onClick={handleAddToCart} className="temas-btn-carrito">
              <i
                style={{ paddingRight: 10 }}
                className="fas fa-shopping-cart"
              ></i>
              Agregar al carrito
            </button>
            {JSON.stringify(authState) == "{}" ? (
              <a>
                <button
                  onClick={handleWarning}
                  className="resize temas-btn-carrito"
                >
                  <i className="fas fa-arrow-up padd"></i>
                  Comprar
                </button>
              </a>
            ) : precio == 0 ? (
              <a>
                <button
                  onClick={handleClick}
                  className="temas-btn-carrito resize"
                >
                  <i className="fas fa-arrow-up padd"></i>
                  Comprar
                </button>
              </a>
            ) : (
              <a href="/main/checkout">
                <button
                  onClick={handleClick}
                  className="temas-btn-carrito resize"
                >
                  <i className="fas fa-arrow-up padd"></i>
                  Comprar
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="temas__buy-container">
        <div className="temas__empty-space">
          <img
            style={{ width: 80, marginRight: 15 }}
            alt="imagen"
            src={tarjeta}
          />
          <p className="temas__querido">
            Tomamos este espacio para acordarte que tus compras siempre estan
            aseguradas y tiene su respectiva garantía. ¡Agradecemos tu
            preferencia!
          </p>
        </div>
        <div>
          <div className="temas__garantia-movil">
            <img className="temas__check-movil" alt="imagen" src={checkbox} />
            <p className="temas__garantia-p">
              Garantía de 30 días, lo cambiamos o regresamos tu dinero.
            </p>
          </div>
        </div>
      </div>
      <h1 className="selled__title-related">Relacionados</h1>
      <Relacionados painting_id={id} theme_id={temaId} />
      <Footer />
    </div>
  );
};
