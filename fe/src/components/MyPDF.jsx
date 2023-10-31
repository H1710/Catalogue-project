import React from "react";
import { Document, Page, View, Svg, Polygon } from "@react-pdf/renderer";

const MyPDF = ({ components }) => {
  console.log(components);
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
            {page.map((c, i) => (
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
