import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({ embedId }) => (
  <div className="w-full youtubeEmbed">
    <iframe
      width="120px"
      height="90px"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      className="w-full"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
