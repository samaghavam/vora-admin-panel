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

const Faq = forwardRef((props, ref) => {
  // --- STATE MANAGEMENT ---
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  
  // Initialize with 4 questions to match the screenshot
  const [faqs, setFaqs] = useState([
    { id: 1, question: "", answer: "", questionState: "", answerState: "" },
    { id: 2, question: "", answer: "", questionState: "", answerState: "" },
    { id: 3, question: "", answer: "", questionState: "", answerState: "" },
    { id: 4, question: "", answer: "", questionState: "", answerState: "" },
  ]);

  // Validation States
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");

  // --- DYNAMIC FAQ HANDLERS ---
  const addNewQuestion = () => {
    setFaqs([
      ...faqs,
      { id: Date.now(), question: "", answer: "", questionState: "", answerState: "" }
    ]);
  };

  const removeQuestion = (idToRemove) => {
    // This will not remove the first question as its button is never rendered
    setFaqs(faqs.filter((faq) => faq.id !== idToRemove));
  };

  const handleFaqChange = (id, field, value) => {
    const newFaqs = faqs.map((faq) => {
      if (faq.id === id) {
        return { ...faq, [field]: value, [`${field}State`]: "" };
      }
      return faq;
    });
    setFaqs(newFaqs);
  };

  // --- IMPERATIVE HANDLE ---
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
        titleH1,
        titleH1Smaller,
        faqs: faqs.map(({ question, answer }) => ({ question, answer })),
    }),
  }));

  // --- VALIDATION & CHANGE HANDLERS ---
  const verifyLength = (value) => {
    return value && typeof value === 'string' && value.trim().length > 0;
  };

  const validateFields = () => {
    let isAllValid = true;

    if (!verifyLength(titleH1)) { setTitleH1State("has-danger"); isAllValid = false; } else { setTitleH1State("has-success"); }
    if (!verifyLength(titleH1Smaller)) { setTitleH1SmallerState("has-danger"); isAllValid = false; } else { setTitleH1SmallerState("has-success"); }

    const validatedFaqs = faqs.map(faq => {
        let questionState = "has-success";
        let answerState = "has-success";
        
        if (!verifyLength(faq.question)) { questionState = "has-danger"; isAllValid = false; }
        if (!verifyLength(faq.answer)) { answerState = "has-danger"; isAllValid = false; }

        return { ...faq, questionState, answerState };
    });
    setFaqs(validatedFaqs);
    
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
        <CardTitle tag="h4">Section 4 - FAQs</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6">
            <FormGroup className={`has-label ${titleH1State}`}>
              <Label>Title H1</Label>
              <Input type="text" value={titleH1} onChange={(e) => handleStaticInputChange(setTitleH1, setTitleH1State, e.target.value)} />
              {titleH1State === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className={`has-label ${titleH1SmallerState}`}>
              <Label>Title H1 - smaller</Label>
              <Input type="text" value={titleH1Smaller} onChange={(e) => handleStaticInputChange(setTitleH1Smaller, setTitleH1SmallerState, e.target.value)} />
              {titleH1SmallerState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
        </Row>
        <hr />

        {faqs.map((faq, index) => {
          // First question has a different layout and no remove button
          if (index === 0) {
            return (
              <Row key={faq.id} className="mb-3">
                <Col md="6">
                  <FormGroup className={`has-label ${faq.questionState} mb-0`}>
                    <Label>Question 1</Label>
                    <Input type="text" value={faq.question} onChange={(e) => handleFaqChange(faq.id, "question", e.target.value)} />
                    {faq.questionState === "has-danger" && <Label className="error">Question cannot be empty.</Label>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className={`has-label ${faq.answerState} mb-0`}>
                    <Label>Answer 1</Label>
                    <Input type="text" value={faq.answer} onChange={(e) => handleFaqChange(faq.id, "answer", e.target.value)} />
                    {faq.answerState === "has-danger" && <Label className="error">Answer cannot be empty.</Label>}
                  </FormGroup>
                </Col>
              </Row>
            );
          }
          // Subsequent questions have the remove button
          return (
            <Row key={faq.id} className="align-items-center mb-3">
              <Col md="5">
                <FormGroup className={`has-label ${faq.questionState} mb-0`}>
                  <Label>{`Question ${index + 1}`}</Label>
                  <Input type="text" value={faq.question} onChange={(e) => handleFaqChange(faq.id, "question", e.target.value)} />
                  {faq.questionState === "has-danger" && <Label className="error">Question cannot be empty.</Label>}
                </FormGroup>
              </Col>
              <Col md="5">
                <FormGroup className={`has-label ${faq.answerState} mb-0`}>
                  <Label>{`Answer ${index + 1}`}</Label>
                  <Input type="text" value={faq.answer} onChange={(e) => handleFaqChange(faq.id, "answer", e.target.value)} />
                  {faq.answerState === "has-danger" && <Label className="error">Answer cannot be empty.</Label>}
                </FormGroup>
              </Col>
              <Col md="2">
                <Button
                  block
                  className="btn-round"
                  color="danger"
                  onClick={() => removeQuestion(faq.id)}
                  style={{
                      background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                      border: 'none',
                      color: 'white',
                      marginTop: '20px'
                  }}
                >
                  <i className="fa fa-times" style={{ marginRight: '5px' }} />
                  Remove Question
                </Button>
              </Col>
            </Row>
          );
        })}

        <Button color="primary" outline onClick={addNewQuestion} className="mt-3">
          <i className="tim-icons icon-simple-add" /> Add new Question
        </Button>
      </CardBody>
    </Card>
  );
});

export default Faq;
