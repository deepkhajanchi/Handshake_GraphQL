import React from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';

function Paginate(props) {
  return (
    <Row>
      <Col></Col>
      <Col>
      <Pagination>
        <Pagination.Prev onClick={props.handlePrevPage} disabled={props.currentPage === 1}/>
        <Pagination.Item>
          {props.currentPage}/{props.totalPages}
        </Pagination.Item>
        <Pagination.Next onClick={props.handleNextPage} disabled={props.currentPage === props.totalPages}/>
      </Pagination>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default Paginate;