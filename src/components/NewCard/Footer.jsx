import actions from "../../actions";
import { getFromLocalStorage, setInLocalStorage } from "../../store";
import "./Footer.css";
export default ({ news, setCurrentSavedIndexState, setSavedNewsState }) => {
  const savedNewsItems = () => getFromLocalStorage(actions.SAVED_ITEMS, []);
  const savedItemIndex = () =>
    getFromLocalStorage(actions.SAVED_ITEM_INDEX, -1);
  const newsInSaved = () => {
    return savedNewsItems().findIndex((newsId) => news.id === newsId);
  };

  const toggleSave = () => {
    const findIdx = newsInSaved();
    if (findIdx >= 0) {
      const newSaved = savedNewsItems().filter((id) => id !== news.id);
      setInLocalStorage(actions.SAVED_ITEMS, setSavedNewsState, newSaved);
      if (newSaved.length > 0 && savedItemIndex() >= newSaved.length) {
        setInLocalStorage(
          actions.SAVED_ITEM_INDEX,
          setCurrentSavedIndexState,
          newSaved.length - 1
        );
      } else if (newSaved.length === 0) {
        setInLocalStorage(
          actions.SAVED_ITEM_INDEX,
          setCurrentSavedIndexState,
          -1
        );
      } else {
        setInLocalStorage(
          actions.SAVED_ITEM_INDEX,
          setCurrentSavedIndexState,
          (savedItemIndex() + 1) % newSaved.length
        );
      }
    } else {
      const newSaved = [...savedNewsItems(), news.id];
      setInLocalStorage(actions.SAVED_ITEMS, setSavedNewsState, newSaved);
      if (savedItemIndex() === -1) {
        setInLocalStorage(
          actions.SAVED_ITEM_INDEX,
          setCurrentSavedIndexState,
          0
        );
      }
    }
  };

  const bookmark = newsInSaved() >= 0 ? "✅" : "🔖";
  return (
    <div className="card-footer-container">
      <div className="card-footer-container-reaction">
        <span>📣 {news.reactions}</span>
      </div>
      <div className="card-footer-container-bookmar">
        <span
          style={{ fontSize: 24, cursor: "pointer" }}
          onClick={() => toggleSave()}
        >
          {bookmark}
        </span>
      </div>
    </div>
  );
};
