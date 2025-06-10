import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload";

const Section4 = forwardRef((props, ref) => {
  // --- STATE MANAGEMENT ---
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [subtextH2, setSubtextH2] = useState("");
  
  // People state is now an array of objects
  const [people, setPeople] = useState([
    { id: 1, name: "", role: "", image: null, nameState: "", roleState: "", imageState: "" }
  ]);

  // Validation States for static fields
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [subtextH2State, setSubtextH2State] = useState("");

  // --- DYNAMIC PERSONNEL HANDLERS ---
  const addPerson = () => {
    setPeople([
      ...people,
      { id: Date.now(), name: "", role: "", image: null, nameState: "", roleState: "", imageState: "" }
    ]);
  };

  const removePerson = (idToRemove) => {
    // Prevent removing the last person to maintain at least one entry
    if (people.length > 1) {
      setPeople(people.filter((person) => person.id !== idToRemove));
    }
  };

  const handlePersonChange = (id, field, value) => {
    const newPeople = people.map((person) => {
      if (person.id === id) {
        return { ...person, [field]: value, [`${field}State`]: "" }; // Clear validation on change
      }
      return person;
    });
    setPeople(newPeople);
  };


  // --- IMPERATIVE HANDLE ---
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
      titleH1,
      titleH1Smaller,
      subtextH2,
      // Return a clean array of people data
      people: people.map(({ name, role, image }) => ({ name, role, image })),
    }),
  }));

  // --- VALIDATION & CHANGE HANDLERS ---
  const verifyLength = (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null;
  };

  const validateFields = () => {
    let isAllValid = true;

    // Validate static fields
    if (!verifyLength(titleH1)) { setTitleH1State("has-danger"); isAllValid = false; } else { setTitleH1State("has-success"); }
    if (!verifyLength(titleH1Smaller)) { setTitleH1SmallerState("has-danger"); isAllValid = false; } else { setTitleH1SmallerState("has-success"); }
    if (!verifyLength(subtextH2)) { setSubtextH2State("has-danger"); isAllValid = false; } else { setSubtextH2State("has-success"); }

    // Validate dynamic personnel fields
    const validatedPeople = people.map(person => {
        let newPerson = {...person};
        if (!verifyLength(person.name)) { newPerson.nameState = "has-danger"; isAllValid = false; } else { newPerson.nameState = "has-success"; }
        if (!verifyLength(person.role)) { newPerson.roleState = "has-danger"; isAllValid = false; } else { newPerson.roleState = "has-success"; }
        if (!person.image) { newPerson.imageState = "has-danger"; isAllValid = false; } else { newPerson.imageState = "has-success"; }
        return newPerson;
    });
    setPeople(validatedPeople);
    
    return isAllValid;
  };

  const handleStaticInputChange = (setter, stateSetter, value) => {
    setter(value);
    stateSetter("");
  };

  // --- RENDER ---
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Section 4 - Personnel</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6"><FormGroup className={`has-label ${titleH1State}`}><Label>Title H1</Label><Input type="text" value={titleH1} onChange={(e) => handleStaticInputChange(setTitleH1, setTitleH1State, e.target.value)} />{titleH1State === "has-danger" && <Label className="error">This field is required.</Label>}</FormGroup></Col>
          <Col md="6"><FormGroup className={`has-label ${titleH1SmallerState}`}><Label>Title H1 - smaller</Label><Input type="text" value={titleH1Smaller} onChange={(e) => handleStaticInputChange(setTitleH1Smaller, setTitleH1SmallerState, e.target.value)} />{titleH1SmallerState === "has-danger" && <Label className="error">This field is required.</Label>}</FormGroup></Col>
        </Row>
        <FormGroup className={`has-label ${subtextH2State}`}><Label>Subtext H2</Label><Input type="text" value={subtextH2} onChange={(e) => handleStaticInputChange(setSubtextH2, setSubtextH2State, e.target.value)} />{subtextH2State === "has-danger" && <Label className="error">This field is required.</Label>}</FormGroup>
        <hr/>
        <CardTitle tag="h5">People</CardTitle>
        
        {people.map((person, index) => (
          <div key={person.id}>
            <Row className="align-items-center">
              <Col>
                <p>Person {index + 1}</p>
              </Col>
              {people.length > 1 && (
                 <Col className="text-right">
                    <Button
                        className="btn-round"
                        color="danger"
                        onClick={() => removePerson(person.id)}
                        style={{
                            background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                            border: 'none',
                        }}
                    >
                        <i className="fa fa-times" style={{ marginRight: '5px' }} />
                        Remove Person
                    </Button>
                 </Col>
              )}
            </Row>
            <Row>
              <Col md="8">
                <FormGroup className={`has-label ${person.nameState}`}><Label>Person name</Label><Input type="text" value={person.name} onChange={(e) => handlePersonChange(person.id, "name", e.target.value)} />{person.nameState === "has-danger" && <Label className="error">This field is required.</Label>}</FormGroup>
                <FormGroup className={`has-label ${person.roleState}`}><Label>Person role</Label><Input type="text" value={person.role} onChange={(e) => handlePersonChange(person.id, "role", e.target.value)} />{person.roleState === "has-danger" && <Label className="error">This field is required.</Label>}</FormGroup>
              </Col>
              <Col md="4">
                <Label>Person image</Label>
                <FormGroup className={person.imageState}><ImageUpload onFileChange={(file) => handlePersonChange(person.id, "image", file)} />{person.imageState === "has-danger" && <Label className="error d-block text-center">Image is required.</Label>}</FormGroup>
              </Col>
            </Row>
             {index < people.length - 1 && <hr />}
          </div>
        ))}
        
        <Button color="primary" outline onClick={addPerson} className="mt-3">
            <i className="tim-icons icon-simple-add" /> Add new Person
        </Button>
      </CardBody>
    </Card>
  );
});

export default Section4;
