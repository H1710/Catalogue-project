import React from "react";
import {
  Document,
  Page,
  View,
  Svg,
  Polygon,
  Text,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: 700,
    },
  ],
});

const MyPDF = ({ components }) => {
  return (
    <Document>
      {components &&
        components.map((page, i) => (
          <Page
            orientation="landscape"
            style={{
              backgroundColor: "black",
              position: "relative",
            }}
            size={"A5"}
            // width={(600 * 3) / 4}
            // height={(400 * 3) / 4}
          >
            {/* <Text>Page {i} - Content for the first page goes here.</Text> */}
            {page.product_page_details.map((c, i) => (
              <>
                {c.type === "rect" && (
                  <View
                    id={i}
                    style={{
                      position: "absolute",
                      backgroundColor: c.color,
                      height: c.height,
                      width: c.width,
                      left: c.left,
                      top: c.top,
                    }}
                  ></View>
                )}
                {c.type === "circle" && (
                  <View
                    id={i}
                    style={{
                      position: "absolute",
                      backgroundColor: c.color,
                      height: c.width,
                      width: c.width,
                      left: c.left,
                      top: c.top,
                      borderRadius: "100%",
                    }}
                  ></View>
                )}
                {c.type === "triangle" && (
                  <View
                    style={{
                      position: "absolute",
                      left: c.left,
                      top: c.top,
                    }}
                  >
                    <Svg height={c.width} width={c.width}>
                      <Polygon
                        points={`0,${c.width} ${c.width / 2},0 ${c.width},${
                          c.width
                        }`}
                        fill={c.color}
                      />
                    </Svg>
                  </View>
                )}
                {c.name === "text" && (
                  <Text
                    id={i}
                    style={{
                      position: "absolute",
                      height: c.height,
                      width: c.width,
                      left: c.left,
                      top: c.top,
                      color: c.color,
                      fontSize: c.fontSize,
                      fontWeight: c.fontWeight,
                      fontFamily: "Open Sans",
                    }}
                  >
                    {c.text}
                  </Text>
                )}

                {c.name === "image" && (
                  <Image
                    src={c.image}
                    style={{
                      position: "absolute",
                      height: c.height,
                      width: c.width,
                      left: c.left,
                      top: c.top,
                    }}
                  />
                )}
              </>
            ))}

            {/* <Text>123</Text> */}
            {/* <View style={styles.section}>
        {page.map((c, i) => (
          <ViewPDF key={i} info={c} />
        ))}
      </View> */}
          </Page>
        ))}
    </Document>
  );
};

export default MyPDF;
