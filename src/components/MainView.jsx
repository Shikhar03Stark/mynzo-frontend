import TouchContainer from "./TouchContainer";
import Card from "./NewCard/Card";
import "./MainView.css";
import { getFromLocalStorage, setInLocalStorage } from "../store";
import action from "../actions";
import { useEffect, useState } from "react";
import getTopNews from "../api/getTopNews";
import getNewsDetail from "../api/getNewsDetail";

const highlightStyle = {
  color: "blue",
  fontWeight: "bold",
  cursor: "pointer",
};

const unHighlightedStyle = {
  color: "grey",
  cursor: "pointer",
};

export default () => {
  const currentNews = () => getFromLocalStorage(action.CURRENT_NEWS_ITEM, null);
  const [currentNewsState, setCurrentNewsState] = useState(currentNews());

  const viewSaved = () => getFromLocalStorage(action.VIEW_SAVED, false);
  const [viewSavedState, setViewSavedState] = useState(viewSaved());

  const currentExploreIndex = () =>
    getFromLocalStorage(action.EXPLOE_ITEM_INDEX, -1);
  const [currentExploreIndexState, setCurrentExploreIndexState] = useState(
    currentExploreIndex()
  );

  const currentSavedIndex = () =>
    getFromLocalStorage(action.SAVED_ITEM_INDEX, -1);
  const [currentSavedIndexState, setCurrentSavedIndexState] = useState(
    currentSavedIndex()
  );

  const exploreNews = () => getFromLocalStorage(action.EXPLORE_ITEMS, []);
  const [exploreNewsState, setExploreNewsState] = useState(exploreNews());

  const savedNews = () => getFromLocalStorage(action.SAVED_ITEMS, []);
  const [savedNewsState, setSavedNewsState] = useState(savedNews());

  const increaseIndexBy = (amt) => {
    let changed = false;
    if (viewSavedState && savedNewsState.length > 0) {
      setInLocalStorage(
        action.SAVED_ITEM_INDEX,
        setCurrentSavedIndexState,
        (savedNewsState.length + currentSavedIndexState + amt) %
          savedNewsState.length
      );
      changed = true;
    } else if (!viewSavedState && exploreNewsState.length > 0) {
      setInLocalStorage(
        action.EXPLOE_ITEM_INDEX,
        setCurrentExploreIndexState,
        (exploreNewsState.length + currentExploreIndexState + amt) %
          exploreNewsState.length
      );
      changed = true;
    }
  };

  useEffect(() => {
    getTopNews()
      .then((response) => response.data)
      .then((data) => {
        setInLocalStorage(action.EXPLORE_ITEMS, setExploreNewsState, data);
        if (data.length > 0) {
          setInLocalStorage(
            action.EXPLOE_ITEM_INDEX,
            setCurrentExploreIndexState,
            0
          );
        }
      });

    setInLocalStorage(action.SAVED_ITEMS, setSavedNewsState, savedNews());
    if (savedNewsState.length > 0) {
      setInLocalStorage(action.SAVED_ITEM_INDEX, setCurrentSavedIndexState, 0);
    }
    console.log(localStorage);
  }, []);

  useEffect(() => {
    let id = null;
    if (viewSavedState && currentSavedIndexState >= 0) {
      id = savedNewsState[currentSavedIndexState];
    } else if (!viewSavedState && currentExploreIndexState >= 0) {
      id = exploreNewsState[currentExploreIndexState];
    }

    if (id) {
      getNewsDetail(id)
        .then((response) => response.data)
        .then((data) => {
          let news = {
            id: id,
            by: data.by,
            url: data.url || "#",
            title: data.title,
            reactions: data.score,
          };

          setInLocalStorage(
            action.CURRENT_NEWS_ITEM,
            setCurrentNewsState,
            news
          );
        });
    } else {
      setInLocalStorage(action.CURRENT_NEWS_ITEM, setCurrentNewsState, null);
    }
  }, [currentExploreIndexState, currentSavedIndexState, viewSavedState]);

  return (
    <>
      <div className="main-container">
        <TouchContainer
          direction={`left`}
          onClick={() => increaseIndexBy(-1)}
        />
        <div className="view-container">
          <div
            className="view-container-header"
            style={{ color: "grey", fontSize: 24 }}
          >
            <div>
              <span
                onClick={() =>
                  setInLocalStorage(action.VIEW_SAVED, setViewSavedState, false)
                }
                style={!viewSavedState ? highlightStyle : unHighlightedStyle}
              >
                Explore
              </span>
            </div>
            <div>
              <span
                onClick={() =>
                  setInLocalStorage(action.VIEW_SAVED, setViewSavedState, true)
                }
                style={viewSavedState ? highlightStyle : unHighlightedStyle}
              >
                Saved
              </span>
            </div>
          </div>

          <div className="view-news" style={{ width: "33vw" }}>
            {currentNewsState ? (
              <Card
                news={currentNewsState}
                setSavedNewsState={setSavedNewsState}
                setCurrentSavedIndexState={setCurrentSavedIndexState}
              />
            ) : (
              <span>No news to show</span>
            )}
          </div>
        </div>
        <TouchContainer
          direction={`right`}
          onClick={() => increaseIndexBy(1)}
        />
      </div>
    </>
  );
};
