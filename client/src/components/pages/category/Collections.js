import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "./Profile";

const CollectionsBox = styled.div`
  margin-top: 50px;

  img {
    object-fit: cover;
  }
  .text {
    font-size: 24px;
    font-weight: 600;
  }
  .collections {
    display: flex;
    flex-wrap: wrap;

    margin-top: 20px;
  }
`;

const Collections = () => {
  // theme에 따라 collections img/profile 변경
  const [test, setTest] = useState(Array(10).fill("/images/main/img1.png"));
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(
        (entries) => {
          //console.log(entries);
          if (entries[0].isIntersecting) {
            setTest([...test, ...Array(3).fill("/images/main/img1.png")]);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  });
  return (
    <CollectionsBox>
      <div className="text">Trending collections</div>
      <div className="collections">
        {test.map((src, index) => (
          // nft 링크 걸기
          <Profile src={src} key={`profile-${index}`} />
        ))}
        <div ref={setTarget}></div>
      </div>
    </CollectionsBox>
  );
};

export default Collections;
