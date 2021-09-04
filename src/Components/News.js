import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  
  articles = [];
  capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey| ${this.capitalise(this.props.category)}`;
  }
  static defaultProps = {
    country: "in",
    pageSize: 1,
    category: "science",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  async componentDidMount() {
    
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseddata = await data.json();
    this.props.setProgress(70)
    this.setState({ loading: false });
    console.log(parseddata);
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
    });
    this.props.setProgress(100)
  }
  //    handlenext=async ()=>{

  //      if(this.state.page+1<=Math.ceil(this.state.totalResults/18))
  //      {
  //      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6a40373f6b9d4814b15560e922fb7c8c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
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

  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6a40373f6b9d4814b15560e922fb7c8c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
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
  fetchMoreData=async ()=>{
    this.setState({page:this.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    // this.setState({ loading: false });
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
    });
  }
  render() {
    return (
      <>
        <h2 style={{ margin: "35px" }} className="text-center">
          Top Headlines
        </h2>
        {/* {this.state.loading&&<Spinner></Spinner>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner></Spinner>}
         >
           <div className="container my-3">
          <div className="row">
            {this.state.articles.map((element) => {
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
}

export default News;
