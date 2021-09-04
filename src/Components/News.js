import React,{useState} from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";



const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  // document.title = `NewsMonkey| ${this.capitalise(props.category)}`;
  
 
  const capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

 useEffect( async () => {
   props.setProgress(10)
   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
  setLoading(false)
   let data = await fetch(url);
   props.setProgress(30)
   let parseddata = await data.json();
   props.setProgress(70)
   setLoading(false)
   console.log(parseddata);
   setArticles(parseddata.articles)
   settotalResults(parseddata.totalResults)
   
   props.setProgress(100)
   
   
 }, [])
 
  
  //    handlenext=async ()=>{

  //      if(this.state.page+1<=Math.ceil(this.state.totalResults/18))
  //      {
  //      let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=6a40373f6b9d4814b15560e922fb7c8c&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //      this.setState({loading:true})
  //      let data= await fetch(url)

  //      let parseddata=await data.json()
  //      console.log(parseddata);
  //      this.setState({articles:parseddata.articles})
  //     this.setState({
  //       page:this.state.page+1,
  //       loading:false
  //     })
  //   }
  //   else
  //   {
  //     console.log('false');
  //     console.log(Math.ceil(this.state.totalResults/18));
  //   }
  // }
  //   handleprev=async ()=>{

  //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=6a40373f6b9d4814b15560e922fb7c8c&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //     this.setState({loading:true})
  //      let data= await fetch(url)
  //      let parseddata=await data.json()
  //      console.log(parseddata);
  //      this.setState({articles:parseddata.articles})
  //     this.setState({
  //       page:this.state.page-1,
  //       loading:false
  //     })
  //}
 const fetchMoreData= async ()=>{
   setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    // this.setState({ loading: false });
    console.log(parseddata);
    setArticles(articles.concat(parseddata.articles))
    settotalResults (parseddata.totalResults)
    
  }
 
    return (
      <>
        <h2 style={{ margin: "35px" }} className="text-center">
          Top Headlines
        </h2>
        {/* {this.state.loading&&<Spinner></Spinner>} */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner></Spinner>}
         >
           <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4">
                  <NewsItem
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://ih1.redbubble.net/image.781541638.2874/st,small,507x507-pad,600x600,f8f8f8.jpg"
                    }
                    newsurl={element.url}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}
News. defaultProps = {
  country: "in",
  pageSize: 1,
  category: "science",
};
News . propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
