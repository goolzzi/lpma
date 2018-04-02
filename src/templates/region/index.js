import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import {Icon} from "react-fa";
import DocumentCard from "../../components/DocumentCard";
import "./styles.scss";

const renderDocumentsList = documents => (
  <ul>
    {documents.map(document => (
      <li key={document.id}>
        <a href={document.link}>
          <Icon name="download" /> {document.linkTitle}
        </a>
      </li>
    ))}
  </ul>
);

const renderDownloads = (downloads, regionSlug) =>
  downloads.map(
    download =>
      download.documents ? (
        <DocumentCard
          key={download.id}
          title={download.title}
          titleLink={`/foundry/documents/${regionSlug}/${download.slug}`}>
          {renderDocumentsList(download.documents)}
        </DocumentCard>
      ) : (
        <DocumentCard
          key={download.id}
          isDownloadable
          title={download.linkTitle}
          titleLink={download.link}>
          <p>{download.description}</p>
        </DocumentCard>
      ),
  );

const propTypes = {
  data: PropTypes.object.isRequired,
};

const Region = ({
  data: {contentfulDocumentsRegion: {name, slug, downloads}},
}) => (
  <section className="section level-cards">
    <div className="container">
      <div className="columns titles-wrapper">
        <div className="column">
          <h2 className="title is-4">{name}</h2>
        </div>
        <div className="column">
          <Link to="/contact" className="is-size-5">
            Feedback
          </Link>
        </div>
      </div>
      <div className="columns is-multiline">
        {renderDownloads(downloads, slug)}
      </div>
      <Link to="/foundry">
        <button className="btn default with-radius-5 larger thirdwidth shadow">
          <span>Back to&nbsp;</span>
          <span className="has-text-weight-bold">Foundry</span>
        </button>
      </Link>
    </div>
  </section>
);

Region.propTypes = propTypes;

export default Region;

export const pageQuery = graphql`
  query RegionQuery($slug: String!) {
    contentfulDocumentsRegion(slug: {eq: $slug}) {
      name
      downloads {
        ... on ContentfulDocument {
          id
          linkTitle
          link
          description
        }
        ... on ContentfulDocumentList {
          id
          title
          slug
          documents {
            id
            linkTitle
            link
          }
        }
      }
      excerpt
      slug
    }
  }
`;