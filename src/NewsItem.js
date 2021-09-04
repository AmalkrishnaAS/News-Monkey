import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, date, source } = this.props;
    return (
      <div className="card">
        <span
          className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
          style={{ zIndex: 1, left: "90%" }}
        >
          {this.props.source}
        </span>
        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              Last updated on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsurl} className="btn btn-dark btn-sm">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
