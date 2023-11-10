import React, { useCallback, useEffect, useState } from "react";
import DesignNavbar from "../components/design/DesignNavbar";
import DesignTable from "../components/design/DesignTable";
import CreateComponent from "../components/design/CreateComponent";
import DesignToolBar from "../components/design/DesignToolBar";
import { getProductById } from "../utils/APIRoute";
import { useOutletContext, useParams } from "react-router-dom";
import { getAPI, postAPI } from "../utils/FetchData";
import { useQuery } from "react-query";

const DesignPage = () => {
  const [state, setState] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("");

  const { productId } = useParams();
  const [user] = useOutletContext();

  useEffect(() => {
    const intiComponents = async () => {
      const data = await getAPI(`${getProductById}/${productId}`);
      const { product_pages } = data.data.product;
      let newComponents = [];

      for (const page of product_pages) {
        let componentPage = {
          id: page.id,
          productId: page.productId,
          product_page_details: [],
        };
        for (const component of page.product_page_details) {
          componentPage.product_page_details.push({
            ...component,
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
            removeComponent,
          });
        }
        newComponents = [...newComponents, componentPage];
      }
      setComponents(newComponents);
    };
    intiComponents();
  }, []);

  const [components, setComponents] = useState([
    {
      id: 1,
      productId: 1,
      product_page_details: [
        {
          name: "main_frame",
          type: "rect",
          id: Math.floor(Math.random() * 100 + 1),
          height: 418,
          width: 600,
          z_index: 1,
          color: "#fff",
          image: "",
          setCurrentComponent: (a) => setCurrentComponent(a),
        },
      ],
    },
  ]);

  console.log(text);
  useEffect(() => {
    if (currentComponent) {
      setComponents((prev) => {
        const temp = [...prev];
        const index = temp[page].product_page_details.findIndex(
          (c) => c.id === currentComponent.id
        );
        temp[page].product_page_details[index].width =
          width || currentComponent.width;
        temp[page].product_page_details[index].height =
          height || currentComponent.height;
        if (currentComponent.name == "text") {
          console.log(temp[page].product_page_details[index]);
          console.log(text);
          temp[page].product_page_details[index].text =
            text || currentComponent.text;
        }
        if (currentComponent.name == "main_frame" && image) {
          temp[page].product_page_details[index].image =
            image || currentComponent.image;
        }
        if (currentComponent.name != "main_frame") {
          temp[page].product_page_details[index].left =
            left || currentComponent.left;
          temp[page].product_page_details[index].top =
            top || currentComponent.top;
        }
        temp[page].product_page_details[index].rotate =
          rotate || currentComponent.rotate;
        temp[page].product_page_details[index].color =
          color || currentComponent.color;

        return temp;
      });

      // const temp = component[page].filter((c) => c.id !== currentComponent.id);

      // setComponent(component);

      setWidth("");
      setHeight("");
      setText("");
      setTop("");
      setLeft("");
      setColor("");
      setRotate(0);
    }
  }, [color, image, left, top, width, height, text, rotate]);

  const createShape = useCallback(
    (name, type) => {
      setComponents((prev) => {
        const temp = [...prev];
        const style = {
          id: Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000,
          name: name,
          type,
          left: 10,
          top: 10,
          opacity: 1,
          width: 200,
          height: 150,
          rotate,
          z_index: 2,
          color: "#3c3c3d",
          productPageId: temp[page].id,
          setCurrentComponent: (a) => setCurrentComponent(a),
          // removeBackground: () => setImage(""),
          moveElement,
          resizeElement,
          rotateElement,
          removeComponent,
        };
        temp[page].product_page_details.push(style);
        return temp;
      });
    },
    [page]
  );

  // console.log(components);

  console.log(currentComponent);
  const moveElement = useCallback((id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  }, []);

  const removeComponent = useCallback((id) => {
    // component[page] = component[page].filter((c) => c.id !== id);
    setComponents((prev) => {
      const temp = [...prev];
      const index = temp[page].findIndex((c) => c.id === id);

      if (index !== -1) {
        temp[page].splice(index, 1);
      }

      return temp;
    });
    setCurrentComponent("");
  }, []);

  const resizeElement = useCallback((id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;
    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  }, []);

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent("");
    setCurrentComponent(currentInfo);

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;

      if (movementX) {
        deg = deg + movementX;
      }
      currentDiv.style.transform = `rotate(${deg}deg)`;
    };
    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(currentDiv);
      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;

      setRotate(deg);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const handleNextPage = useCallback(() => {
    setComponents((prev) => {
      if (page >= prev.length - 1) {
        const id =
          Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
        const newFrame = {
          name: "main_frame",
          type: "rect",
          id: Math.floor(Math.random() * 100 + 1),
          height: 418,
          width: 600,
          z_index: 1,
          color: "#fff",
          image: "",
          productPageId: id,
          setCurrentComponent: (a) => setCurrentComponent(a),
        };
        return [
          ...prev,
          {
            id: id,
            productId: productId,
            product_page_details: [newFrame],
          },
        ];
      } else {
        return [...prev];
      }
    });

    setPage((prev) => prev + 1);
  }, [page]);

  // console.log(components);
  const changeText = useCallback((e) => {
    console.log(e.target.value);
    setText(e.target.value);
  }, []);
  const createText = useCallback((name) => {
    setComponents((prev) => {
      const temp = [...prev];
      const id = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
      const style = {
        id: id,
        name: name,
        left: 10,
        top: 10,
        opacity: 1,
        width: 200,
        height: 50,
        text: "Add a text",
        rotate,
        z_index: 3,
        color: "#3c3c3d",
        setCurrentComponent: (a) => setCurrentComponent(a),
        moveElement,
        resizeElement,
        rotateElement,
        removeComponent,
        changeText,
      };
      temp[page].product_page_details.push(style);
      return temp;
    });
  }, []);

  const setElement = useCallback((type) => {
    setState(type);
    setShow(true);
  }, []);
  return (
    <div className="w-full shadow-lg h-full bg-red-100 flex justify-between overflow-y-hidden">
      <DesignNavbar state={state} setElement={setElement} />
      <div className="h-full w-full bg-[#f2f2f2]">
        <DesignTable
          setShow={setShow}
          state={state}
          show={show}
          createShape={createShape}
          createText={createText}
        />

        <div className="w-full h-full flex flex-col">
          <DesignToolBar
            setColor={setColor}
            currentComponent={currentComponent}
            components={components}
            user={user}
          />

          <div
            className={`flex justify-center relative items-center h-full w-full gap-4`}
          >
            <button
              onClick={() => page - 1 >= 0 && setPage(page - 1)}
              className="bg-gray-400 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <div className="m-w-[800px] m-h-[400px] flex justify-center items-center overflow-hidden">
              <div
                id="main_design"
                className="w-auto relative h-auto overflow-hidden"
              >
                {components[page].product_page_details.map((c, i) => (
                  <CreateComponent
                    key={i}
                    info={c}
                    currentComponent={currentComponent}
                    removeComponent={removeComponent}
                    setCurrentComponent={setCurrentComponent}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleNextPage}
              className="bg-gray-400 rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          <p className="text-center text-[20px]">
            {page + 1}/{components.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
