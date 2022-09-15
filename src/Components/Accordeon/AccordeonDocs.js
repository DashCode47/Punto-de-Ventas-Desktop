import Collapse, { Panel } from "rc-collapse";
import React, { useState, Fragment } from "react";
import "../../App.css";

const AccordeonDocs = () => {
  const [onChanged, setonChanged] = useState();
  const [accordion, setaccordion] = useState(true);
  const [activeKey, setactiveKey] = useState();
  const onChange = (activeKey) => {
    setactiveKey(activeKey);
  };

  return (
    <Collapse>
      <Panel header="title">content</Panel>
      <Panel header="title">content</Panel>
      <Fragment>
        <Panel header="title">content</Panel>
        <Panel header="title">content</Panel>
      </Fragment>
      <Fragment>
        <Fragment>
          <Panel header="title">content</Panel>
          <Panel header="title">content</Panel>
        </Fragment>
      </Fragment>
    </Collapse>
  );
};

export default AccordeonDocs;
