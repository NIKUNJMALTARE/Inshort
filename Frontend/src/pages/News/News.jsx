// import React, { useContext, useEffect, useState } from "react";
// import './News.scss';
// import axios from "axios";
// import NewsArticle from "../../components/NewsArticle/NewsArticle";
// import { useNavigate, useParams } from "react-router";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MyContext } from "../../CustomContext";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import Spinner from "../../components/Spinner/Spinner";

// const validQuaries = ["general", "national", "international", "business", "entertainment", "health", "science", "sports", "technology", "bookmarks"];
// let totalArticles;
// let pageNum;

// let timeOut;
// // get apikey from https://gnews.io/
// // for one apikey we can able to send 100 request per day
// let apiKey = "4726ae9cdfa04f6b8d5a5726f15541b3";

// const News = () => {
//     const [displayLoadMore, setDisplayLoadMore] = useState(true);
//     const [loader, setLoader] = useState(true);
//     const [lodingBtn, setLodingBtn] = useState(false);
//     const [networkErr, setNetworkErr] = useState(false);
//     const [bookmarkMsg, setBookmarkMsg] = useState("News Bookmarked");
//     const [displayBookmarkMsg, setDisplayBookmarkMsg] = useState(false);

//     const bookmarkMsgHandler = (message) => {
//         setBookmarkMsg(message);
//         setDisplayBookmarkMsg(true);

//         clearTimeout(timeOut);
//         timeOut = setTimeout(() => {
//             setDisplayBookmarkMsg(false);
//         }, 3000);
//     }

//     const myContext = useContext(MyContext);
//     const { language, setCurrPath, isMobileDevice, setHideHeader, articles, setArticles, windowHeight, hindiBookmarkArticles, englishBookmarkArticles } = myContext;

//     const navigate = useNavigate();
//     const params = useParams();
//     let category = params.category;

//     if (category == "national" || category == "international") {
//         category = "general";
//     }

//     const apiCall = async () => {
//         setLoader(true);
//         setNetworkErr(false);
//         let result;
//         try {
//             result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
//             // as I use a free api now, that's why the 'page' quary not valid here. Still I use it by thinking that I have a paid api.
//         }
//         catch (err) {
//             // when the per apikey's validity is expired then use another apikey through try-catch method
//             console.log("expired 1st apikey");
//             try {
//                 apiKey = "239eafb61b40e1419a2bcd08e20492f7";
//                 result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
//             }
//             catch (err2) {
//                 console.log("expired 2nd apikey");
//                 try {
//                     apiKey = "743d722dd292a77769e54e8d6aeb5475";
//                     result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
//                 }
//                 catch (err3) {
//                     console.log("expired 3rd apikey");
//                     try {
//                         apiKey = "606ac7501ef2bd39836d80bceb5f32ec";
//                         result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
//                     }
//                     catch (err4) {
//                         console.log("expired 4th apikey");
//                         try {
//                             apiKey = "611a1fcfe8a977c10b329207423901ff";
//                             result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${params.category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
//                         }
//                         catch (err4) {
//                             console.log("expired 5th apikey");
//                             if (err4.message === "Network Error") {
//                                 setNetworkErr(true);
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//         totalArticles = result?.data.totalArticles;
//         setArticles(result?.data.articles);
//         setLoader(false);
//         if (pageNum * 10 >= totalArticles) setDisplayLoadMore(false); // we get 10 articles in each api call
//     }

//     useEffect(() => {
//         setDisplayLoadMore(true);
        
//         if (params.category == undefined || !validQuaries.includes(params.category)) {
//             navigate(`/${language}/general`);
//         }
//         else if (params.category == 'bookmarks') {
//             const bookmarksArticle = language == 'hi' ? hindiBookmarkArticles : englishBookmarkArticles;
//             setLoader(true);
//             setNetworkErr(false);
//             setDisplayLoadMore(false);

//             setTimeout(() => {
//                 setArticles(bookmarksArticle);
//                 setLoader(false);
//             }, 500);

//             document.title = "BOOKMARKS NEWS || INSHORTS CLONE";
//             setCurrPath(params.category);
//         }
//         else {
//             pageNum = 1;
//             apiCall();
//             document.title = (params.category == "general" ? "TOP HEADLINES" : params.category.toLocaleUpperCase()) + " NEWS || INSHORTS CLONE";
//             setCurrPath(params.category);
//         }
//         window.scrollTo(0, 0);
//         setHideHeader(false);

//     }, [params.category, language])

//     const loadMoreArticles = async () => {
//         setLodingBtn(true);
//         pageNum += 1;
//         try {
//             const result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&page=${pageNum}&lang=${language}&country=${category == "national" ? 'in' : 'any'}&max=10&apikey=${apiKey}`);
//             setArticles([...articles, ...result.data.articles]);
//         } catch (err) {
//             console.log("apikey validity expired");
//         }

//         if (pageNum * 10 >= totalArticles) setDisplayLoadMore(false); // we get 10 articles in each api call
//         setLodingBtn(false);
//     }

//     const slideScrollHandler = (oldIndex, newIndex) => {
//         if (oldIndex > newIndex) {
//             setHideHeader(false);
//         }
//         else {
//             setHideHeader(true);
//         }
//     }

//     const sliderSettings = {
//         infinite: false,
//         vertical: true,
//         verticalSwiping: true,
//         arrows: false,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         beforeChange: slideScrollHandler,
//     }

//     return (
//         <div className={`news ${isMobileDevice && "mobile-news"}`} style={{ height: isMobileDevice && windowHeight }}>
//             {isMobileDevice && <Header />}
//             {
//                 loader ? <Spinner />
//                     :
//                     networkErr ? <span className="network-err">{language == 'hi' ? 'अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।' : 'Check your internet connection and try again.'}</span>
//                         :
//                         articles.length == 0 ?
//                             <div className="bookmarks-err">
//                                 <p>{language == 'hi' ? 'कोई बुकमार्क समाचार उपलब्ध नहीं हैं' : 'No bookmark news are available'}</p>
//                                 <Link to={`${language}/general`}>Load News</Link>
//                             </div>
//                             :
//                             isMobileDevice ?
//                                 <>
//                                     <Slider {...sliderSettings} className="articles">
//                                         {
//                                             articles.map((article, index) => {
//                                                 return <NewsArticle key={index} article={article} bookmarkMsgHandler={bookmarkMsgHandler} />
//                                             })
//                                         }
//                                     </Slider>

//                                     <span className={`bookmark-message ${displayBookmarkMsg && 'd-item'}`}>{bookmarkMsg}</span>
//                                 </>
//                                 :
//                                 <>
//                                     <div className="articles">
//                                         {
//                                             articles.map((article, index) => {
//                                                 return <NewsArticle key={index} article={article} />
//                                             })
//                                         }
//                                     </div>

//                                     {
//                                         lodingBtn ? <Spinner />
//                                             :
//                                             displayLoadMore && <button className="load-more" onClick={loadMoreArticles}>Load More</button>
//                                     }
//                                 </>
//             }
//             {isMobileDevice && <Footer />}
//         </div>
//     )
// }

// export default News;

import React, { useContext, useEffect, useState } from "react";
import "./News.scss";
import axios from "axios";
import NewsArticle from "../../components/NewsArticle/NewsArticle";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyContext } from "../../CustomContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";

const validQueries = [
  "general",
  "national",
  "international",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
  "bookmarks",
];

const apiKeys = [
  "4726ae9cdfa04f6b8d5a5726f15541b3",
  "4726ae9cdfa04f6b8d5a5726f15541b3",
  "4726ae9cdfa04f6b8d5a5726f15541b3",
  "4726ae9cdfa04f6b8d5a5726f15541b3",
  "4726ae9cdfa04f6b8d5a5726f15541b3",
];

let apiKeyIndex = 0;
let totalArticles;
let pageNum = 1;

const News = () => {
  const [displayLoadMore, setDisplayLoadMore] = useState(true);
  const [loader, setLoader] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [networkErr, setNetworkErr] = useState(false);
  const [articles, setArticles] = useState([]);

  const myContext = useContext(MyContext);
  const {
    language,
    setCurrPath,
    isMobileDevice,
    setHideHeader,
    windowHeight,
    hindiBookmarkArticles,
    englishBookmarkArticles,
  } = myContext;

  const navigate = useNavigate();
  const params = useParams();
  let category = params.category;

  if (category === "national" || category === "international") {
    category = "general";
  }

  const fetchNews = async (isLoadMore = false) => {
    setNetworkErr(false);

    let fetchedArticles = [];
    let attempts = 0;

    while (attempts < apiKeys.length) {
      try {
        const result = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&page=${pageNum}&pageSize=10&language=${language}&country=${
            params.category === "national" ? "in" : "us"
          }&apiKey=${apiKeys[apiKeyIndex]}`
        );

        fetchedArticles = result?.data.articles || [];
        totalArticles = result?.data.totalResults;

        if (isLoadMore) {
          setArticles((prevArticles) => [
            ...prevArticles,
            ...fetchedArticles.filter(
              (newArticle) =>
                !prevArticles.some(
                  (oldArticle) => oldArticle.url === newArticle.url
                )
            ),
          ]);
        } else {
          setArticles(fetchedArticles);
        }

        setDisplayLoadMore(pageNum * 10 < totalArticles);
        setLoader(false);
        return;
      } catch (err) {
        console.log(`API Key ${apiKeys[apiKeyIndex]} expired, trying next...`);
        apiKeyIndex = (apiKeyIndex + 1) % apiKeys.length;
        attempts++;
      }
    }

    setNetworkErr(true);
    setLoader(false);
  };

  useEffect(() => {
    setDisplayLoadMore(true);

    if (!params.category || !validQueries.includes(params.category)) {
      navigate(`/${language}/general`);
    } else if (params.category === "bookmarks") {
      const bookmarksArticle =
        language === "hi" ? hindiBookmarkArticles : englishBookmarkArticles;
      setLoader(true);
      setNetworkErr(false);
      setDisplayLoadMore(false);

      setTimeout(() => {
        setArticles(bookmarksArticle);
        setLoader(false);
      }, 500);

      document.title = "BOOKMARKS NEWS || INSHORTS CLONE";
      setCurrPath(params.category);
    } else {
      pageNum = 1;
      fetchNews();
      document.title =
        (params.category === "general" ? "TOP HEADLINES" : params.category.toUpperCase()) +
        " NEWS || INSHORTS CLONE";
      setCurrPath(params.category);
    }

    window.scrollTo(0, 0);
    setHideHeader(false);
  }, [params.category, language]);

  const loadMoreArticles = async () => {
    setLoadingBtn(true);
    pageNum += 1;
    await fetchNews(true);
    setLoadingBtn(false);
  };

  return (
    <div className={`news ${isMobileDevice && "mobile-news"}`} style={{ height: isMobileDevice && windowHeight }}>
      {isMobileDevice && <Header />}
      {loader ? (
        <Spinner />
      ) : networkErr ? (
        <span className="network-err">
          {language === "hi" ? "अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।" : "Check your internet connection and try again."}
        </span>
      ) : articles.length === 0 ? (
        <div className="bookmarks-err">
          <p>{language === "hi" ? "कोई बुकमार्क समाचार उपलब्ध नहीं हैं" : "No bookmark news available"}</p>
          <Link to={`${language}/general`}>Load News</Link>
        </div>
      ) : (
        <>
          <div className="articles">
            {articles.map((article, index) => (
              <NewsArticle key={index} article={article} />
            ))}
          </div>

          {loadingBtn ? <Spinner /> : displayLoadMore && <button className="load-more" onClick={loadMoreArticles}>Load More</button>}
        </>
      )}
      {isMobileDevice && <Footer />}
    </div>
  );
};

export default News;