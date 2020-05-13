import React, { useState } from 'react';
import {
  Card, Badge, Button, Form, Row, Col, Alert,
} from 'react-bootstrap';
import SkillRemoveSvg from '../../../svg/skillRemoveSvg';
import { studentProfileSubmit } from '../../../../utility';
import { graphql } from 'react-apollo';
import {updateProfileMutation} from '../../../../mutations/mutations';

function SkillSetEdit(props) {
  const [skillSet, setSkillSet] = useState((props.studentProfile.skillSet ?  props.studentProfile.skillSet.split(',') : []));
  const [errorMsg, seterrorMsg] = useState(null);

  let submitSkillSet = async (skills) => {
    const formData = {
      studentProfile: {
        skillSet: skills.join(','),
      },
    };
    const resp = await studentProfileSubmit(formData, props.studentProfile._id);
    if (resp.status === 200 && resp.data.success) {
      setSkillSet(skills);
    } else {
      seterrorMsg(<Alert variant="danger">{resp.data.error}</Alert>);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const newSkill = e.currentTarget.newSkill.value.trim();
    const present = skillSet.some((skill) => skill.toLowerCase() === newSkill.toLowerCase());
    if (present) {
      return seterrorMsg(<Alert variant="danger">Skill already added</Alert>);
    }
    e.currentTarget.reset();
    submitSkillSet(skillSet.concat(newSkill));
  };

  const handleRemoveSkill = (e) => {
    const removeSkill = e.currentTarget.id;
    submitSkillSet(skillSet.filter((skill) => skill != removeSkill));
  };

  const skill_span_tags = skillSet.map((skill) => (
    <Button id={skill} onClick={handleRemoveSkill} variant="Link" className="p-1">
      <Badge variant="secondary">
        {skill}
&nbsp;
        <SkillRemoveSvg />
      </Badge>
    </Button>
  ));
  return (
    <Card my-3>
      <Card.Body>
        <Card.Title>Skills</Card.Title>
        <Form onSubmit={handleAddSkill}>
          <Card.Text>
            {skill_span_tags}
          </Card.Text>
          <Row>
            <Col xs={8} className="pr-1">
              <Form.Control required name="newSkill" placeholder="Add new Skills" />
            </Col>
            <Col className="pl-1">
              <Button type="submit" variant="primary">Add</Button>
            </Col>
            <Col>{errorMsg}</Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default graphql(updateProfileMutation,{
  name: "updateProfileMutation"
})(SkillSetEdit);
