import "./Header.css";
export default ({ news }) => {
  return (
    <div className="card-header-container">
      <div
        className="card-header-container-author"
        style={{ alignSelf: "flex-start" }}
      >
        <span>By: {news.by}</span>
      </div>
      <div
        className="card-header-container-url"
        style={{ alignSelf: "flex-end" }}
      >
        <a style={{ textDecoration: "none" }} href={news.url} target="_blank">
          🔗
        </a>
      </div>
    </div>
  );
};
