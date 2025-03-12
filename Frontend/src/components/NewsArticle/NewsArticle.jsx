// import React, { useContext, useEffect, useState } from "react";
// import './NewsArticle.scss';
// import { getDate } from "../../utilities/convertToDate";
// import { MyContext } from "../../CustomContext";
// import { BackgroundImage } from "react-image-and-background-image-fade";

// const NewsArticle = ({ article, bookmarkMsgHandler }) => {
//     const [isBookmark, setIsBookmark] = useState(false);

//     const myContext = useContext(MyContext);
//     const { language, isMobileDevice, hideHeader, setHideHeader, windowHeight, articles, hindiBookmarkArticles, setHindiBookmarkArticles, englishBookmarkArticles, setEnglishBookmarkArticles } = myContext;

//     const { hours, minutes, meridiem, day, date, month, year } = getDate(article.publishedAt);

//     const articleHandler = () => {
//         if (isMobileDevice)
//             setHideHeader(!hideHeader);
//     }

//     const bookmarksHandler = (e) => {
//         e.stopPropagation();

//         if (isBookmark) { //bookmark removed
//             setIsBookmark(false);
//             bookmarkMsgHandler("Bookmark Removed");

//             let updatedBookmarksArticles;

//             if (language == 'hi') {
//                 updatedBookmarksArticles = hindiBookmarkArticles.filter((eachArticle) => {
//                     return eachArticle.title != article.title;
//                 });

//                 setHindiBookmarkArticles(updatedBookmarksArticles);
//             }
//             else {
//                 updatedBookmarksArticles = englishBookmarkArticles.filter((eachArticle) => {
//                     return eachArticle.title != article.title;
//                 });

//                 setEnglishBookmarkArticles(updatedBookmarksArticles);
//             }
//         }
//         else { // bookmark added
//             setIsBookmark(true);
//             bookmarkMsgHandler("News Bookmarked");

//             if (language == 'hi') {
//                 setHindiBookmarkArticles([...hindiBookmarkArticles, article]);
//             }
//             else {
//                 setEnglishBookmarkArticles([...englishBookmarkArticles, article]);
//             }
//         }
//     }

//     useEffect(() => {
//         if (language == 'hi') {
//             const isArticleBookmarked = hindiBookmarkArticles.filter((eachArticle) => {
//                 return eachArticle.title == article.title;
//             }).length;

//             if (isArticleBookmarked) setIsBookmark(true);
//         }
//         else {
//             const isArticleBookmarked = englishBookmarkArticles.filter((eachArticle) => {
//                 return eachArticle.title == article.title;
//             }).length;

//             if (isArticleBookmarked) setIsBookmark(true);
//         }
//     }, [articles, language, hindiBookmarkArticles, englishBookmarkArticles])

//     return (
//         <div className={`news-article ${isMobileDevice && "mobile-news-article"}`} onClick={articleHandler} style={{ height: isMobileDevice && windowHeight }}>
//             <BackgroundImage
//                 className={"article-image"}
//                 src={article.image}
//                 lazyLoad
//             />

//             <div className="content">
//                 {
//                     isMobileDevice ?
//                         <span className={`title ${isBookmark && 'bookmark-article'}`} onClick={bookmarksHandler}>{article.title}</span>
//                         :
//                         <a className={`title`} href={article.url} target="_blank">{article.title}</a>
//                 }
//                 <span className="author-time"><b>short</b> by {article.source.name} / {`${hours}:${minutes} ${meridiem} on ${day}, ${date} ${month}, ${year}`}</span>
//                 <p className="description">{article.description}</p>
//                 <span className="source">read more at <a href={article.url} target="_blank" className="name">{article.source.name}</a></span>
//             </div>

//             {isMobileDevice && <div className="bottom-section">

//                 <section>
//                     <span>To see the full image</span><br />
//                     <a href={article.image} target="_blank" className="image-link">Tap here</a>
//                 </section>

//                 <section className={`bookmark ${isBookmark && 'bookmark-article'}`} onClick={bookmarksHandler}>
//                     {isBookmark ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
//                     <span>{language == 'hi' ? 'बुकमार्क' : 'Bookmark'}</span>
//                 </section>

//             </div>}
//         </div>
//     )
// }

// export default NewsArticle;

import React, { useContext, useEffect, useState } from "react";
import "./NewsArticle.scss";
import { getDate } from "../../utilities/convertToDate";
import { MyContext } from "../../CustomContext";

const NewsArticle = ({ article }) => {
  const [isBookmark, setIsBookmark] = useState(false);
  const myContext = useContext(MyContext);
  const { language, hindiBookmarkArticles, setHindiBookmarkArticles, englishBookmarkArticles, setEnglishBookmarkArticles } = myContext;

  const { hours, minutes, meridiem, day, date, month, year } = getDate(article.publishedAt);

  const handleBookmark = () => {
    setIsBookmark(!isBookmark);
    if (isBookmark) {
      if (language === "hi") {
        setHindiBookmarkArticles(hindiBookmarkArticles.filter((a) => a.title !== article.title));
      } else {
        setEnglishBookmarkArticles(englishBookmarkArticles.filter((a) => a.title !== article.title));
      }
    } else {
      if (language === "hi") {
        setHindiBookmarkArticles([...hindiBookmarkArticles, article]);
      } else {
        setEnglishBookmarkArticles([...englishBookmarkArticles, article]);
      }
    }
  };

  return (
    <div className="news-article">
      <div className="article-image" style={{ backgroundImage: `url(${article.urlToImage || "https://via.placeholder.com/600x400?text=No+Image"})` }}></div>
      <div className="content">
        <h2 className="title">{article.title}</h2>
        <p className="description">{article.description}</p>
        <div className="article-footer">
          <span className="source">{article.source.name}</span>
          <span className="timestamp">{`${hours}:${minutes} ${meridiem}, ${day}, ${month} ${date}`}</span>
          <button className={`bookmark-btn ${isBookmark ? "bookmarked" : ""}`} onClick={handleBookmark}>
            {isBookmark ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
