import Header from "./Header";
import Footer from "./Footer";
import "./Card.css";

export default ({ news, setSavedNewsState, setCurrentSavedIndexState }) => {
  const trimmedTitle =
    news.title.length > 45 ? news.title.substr(0, 42) + "..." : news.title;

  return (
    <>
      <div>
        <Header news={news} />
        <div className="card-content-container">
          <div style={{ width: 320 }}>{trimmedTitle}</div>
        </div>
        <Footer
          news={news}
          setSavedNewsState={setSavedNewsState}
          setCurrentSavedIndexState={setCurrentSavedIndexState}
        />
      </div>
    </>
  );
};
