import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import config from '../../config';

import 'react-image-gallery/styles/scss/image-gallery.scss';
import './index.css'
  
export default class Gallery extends Component {
  componentDidMount() {
    console.log('111111111', this.props);
  }


  render() {
    const { images } = this.props;

    console.log('111111111', this.props)
    if (!images.backdrops) return <div />;

    const imagesForGallery = images.backdrops.map(img => ({
      original: config.original + img.file_path,
      thumbnail: config.small + img.file_path
    }));

    return imagesForGallery.length > 0 ? (
      <div className="movie-gallery">
        <h3 className="list-title mb-4">Gallery</h3>
        <ImageGallery  items={imagesForGallery} />
      </div>
    ) : null;
  }
}
