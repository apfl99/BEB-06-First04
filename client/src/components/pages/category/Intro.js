import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { categoryText } from "../../../data/textData";
import { textSkip } from "../../../libs/textSkip";

const IntroBox = styled.div`
  .intro {
    .headerText {
      font-size: 48px;
      font-weight: bold;
    }
    .descript {
      width: 620px;
      height: auto;
      margin-top: 10px;
      //background-color: gray;
      /* overflow: hidden; */
    }
    .moreToggle {
      width: 100px;
      padding-top: ${(props) => (props.more ? "20px" : "0px")};
      cursor: pointer;
      .fa {
        padding-left: 5px;
      }
      :hover {
        color: var(--footer-text);
      }
    }
  }
`;

const Intro = ({ theme }) => {
  const [more, setMore] = useState(false);
  const [descript, setDescript] = useState();

  useEffect(() => {
    textSkip(more, categoryText[theme], 219, setDescript);
  }, [more]);

  return (
    <IntroBox more={more}>
      <div className="intro">
        <div className="headerText">Explore {theme}</div>
        <div className="descript">{descript}</div>
        {categoryText[theme].length < 219 ? null : (
          <div
            className="moreToggle"
            onClick={() => {
              setMore(!more);
            }}
          >
            {more ? "See less" : "See more"}
            {more ? (
              <i className="fa fa-chevron-up" />
            ) : (
              <i className="fa fa-chevron-down" />
            )}
          </div>
        )}
      </div>
    </IntroBox>
  );
};

export default Intro;
