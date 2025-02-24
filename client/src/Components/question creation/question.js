import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { Addcategory } from './add_category';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export function Corepage() {
  const [editorHtml, setEditorHtml] = useState('');
  const[displaycategory,setdisplaycategory]=useState([])
  const[displaysubcategory,setdisplaysubcategory]=useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/getcategory")
    .then(res=>res.json())
    .then(data=>setdisplaycategory(data))
   

})
function handlesubcategory(){
  var category=document.getElementById("category_select").value
  var key={
    category:category
  }
  axios.post("http://localhost:5000/getsubcategory",key)
 .then((res)=>{
    setdisplaysubcategory(res.data)
 })

}
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const HTML_ELEMENTS = [
    'div',
    'span',
    'a',
    'button',
    'input',
    'select',
    'textarea',
    'img',
    'p',
    'h1',
    'h2',
    'h3',
    'ul',
    'li',
  ];

  const HTML_ATTRIBUTES = {
    div: ['className', 'id', 'style'],
    span: ['className', 'id', 'style'],
    a: ['href', 'target', 'className', 'id', 'style'],
    button: ['type', 'onClick', 'className', 'id', 'style'],
    input: ['type', 'value', 'placeholder', 'onChange', 'className', 'id', 'style','name'],
    select: ['value', 'onChange', 'className', 'id', 'style'],
    textarea: ['value', 'onChange', 'className', 'id', 'id', 'style'],
    img: ['src', 'alt', 'className', 'id', 'style'],
    p: ['className', 'id', 'style'],
    h1: ['className', 'id', 'style'],
    h2: ['className', 'id', 'style'],
    h3: ['className', 'id', 'style'],
    ul: ['className', 'id', 'style'],
    li: ['className', 'id', 'style'],
  };

  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [attributeValues, setAttributeValues] = useState({});
  const [elementValue, setElementValue] = useState('');
  const [storedData, setStoredData] = useState('');

  const addPage = () => {
    if (!selectedPage) return;
    setPages([...pages, { name: selectedPage, elements: [] }]);
    setSelectedPage('');
  };

  const addElement = () => {
    if (!selectedElement) return;

    const updatedPages = [...pages];
    const currentPage = updatedPages.find((page) => page.name === selectedPage);

    if (!currentPage) return;

    const newAttributes = Object.keys(selectedAttributes).map((attr) => ({
      name: attr,
      value: attributeValues[attr] || '',
    }));

    const newElement = {
      tagName: selectedElement,
      value: elementValue,
      attributes: newAttributes,
    };

    currentPage.elements.push(newElement);
    setPages(updatedPages);

    setSelectedElement('');
    setSelectedAttributes({});
    setAttributeValues({});
    setElementValue('');
    setStoredData(JSON.stringify(pages, null, 2));
  };

  const handleCheckboxChange = (attribute, isChecked) => {
    setSelectedAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: isChecked,
    }));
  };

  const handleAttributeValueChange = (attribute, value) => {
    setAttributeValues((prevValues) => ({
      ...prevValues,
      [attribute]: value,
    }));
  };

  // const handleSubmit = () => {
  //   setStoredData(JSON.stringify(pages, null, 2));
  // };
  function handlesubmitquestion(event){
      event.preventDefault()
      
      var jsondata=storedData
      var question=editorHtml
      var category_id=document.getElementById("category_select").value
      var subcategory_id=document.getElementById("subcategory_select").value
      var key={
        jsondata:jsondata,
        question:question,
        category_id:category_id,
        subcategory_id:subcategory_id
      }
      if(question===''){
        alert("please give the question")
      }
      else{
        axios.post("http://localhost:5000/insertquestion",key)
        .then((res)=>{
          if(res.data.status==="inserted"){
            alert("Question is created successfully")
            window.location.reload()
          }
          else{
            alert("Question not created successfully")
          }
        })
      }
  }
  return (
    <>
    <div className='container-fluid row'>
    <div>
        
<div class="container-fluid mt-5">
  <div class="row">
    <div class="col-md-5">
      {/* <label for="itemsSelect">Select Item:</label> */}
      <select class="form-control col-lg-6 mt-3" id="category_select" onChange={handlesubcategory}>
        <option value="item1">Select the Category</option>
        {
            displaycategory.map((value,index)=>(
                <option value={value.category_id}>{value.category_name}</option>

            ))
        }
      </select>
    </div>
    <div className='col-lg-5'>
      <select class="form-control col-lg-6 mt-3" id="subcategory_select">
        <option value="">Select the Sub Category</option>
        {
            displaysubcategory.map((value,index)=>(
                <option value={value.subcategory_id}>{value.subcategory_name}</option>

            ))
        }
      </select>
    </div>
    <div class="col-md-2">
      <Addcategory />
    </div>
  </div>
</div>


    </div>
    <div className='col-lg-6 borderright'>
      <h1>Question</h1>
      <ReactQuill 
        theme="snow" 
        value={editorHtml} 
        onChange={handleChange} 
      />
    </div>
    <div class="accordion col-lg-6 mt-5" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            User-Interface Testing
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div  className='col-lg-12'>

              <div >
                <label class="form-control-label">Page Name:</label>
                <input type="text"  className="form-control mt-3" value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} />
                <button onClick={addPage} className='btn btn-primary mt-2'>Add Page </button>
              </div>

              <div>
                <label class="form-control-label">Select Page:</label>
                <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} className="form-control mt-3">
                  <option value="">Select Page</option>
                  {pages.map((page) => (
                    <option key={page.name} value={page.name}>
                      {page.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label class="form-control-label">Select Element:</label>
                <select value={selectedElement} onChange={(e) => setSelectedElement(e.target.value)} className="form-control mt-3">
                  <option value="">Select Element</option>
                  {HTML_ELEMENTS.map((element) => (
                    <option key={element} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label class="form-control-label">Select Attributes:</label>
                {selectedElement &&
                  HTML_ATTRIBUTES[selectedElement].map((attribute) => (
                    <div key={attribute}>
                      <input
                        type="checkbox"
                        className=" mt-3"
                        id={attribute}
                        name={attribute}
                        checked={selectedAttributes[attribute]}
                        onChange={(e) => handleCheckboxChange(attribute, e.target.checked)}
                        />
                      <label htmlFor={attribute} class="form-control-label">{attribute}</label>
                      {selectedAttributes[attribute] && (
                        <input
                          type="text"
                          className="form-control mt-3"
                          placeholder={`Enter value for ${attribute}`}
                          value={attributeValues[attribute] || ''}
                          onChange={(e) => handleAttributeValueChange(attribute, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
              </div>

              <div>
                <label class="form-control-label">Element Value:</label>
                <input
                  type="text"
                  className="form-control mt-3"
                  value={elementValue}
                  onChange={(e) => setElementValue(e.target.value)}
                />
              </div>

              <button onClick={addElement} className='btn btn-success mt-3'>Add Element</button>

              {/* <button onClick={handleSubmit}>Final Submit</button> */}

              {/* <div>
                <h2>Stored Data:</h2>
                <pre>{storedData}</pre>
              </div> */}

              <div>
                <h2>Created testcase</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Page Name</th>
                      <th>Element</th>
                      <th>Value</th>
                      <th>Attributes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) =>
                      page.elements.map((element, index) => (
                        <tr key={`${page.name}-${index}`}>
                          <td>{page.name}</td>
                          <td>{element.tagName}</td>
                          <td>{element.value}</td>
                          <td>
                            {element.attributes.map((attr, attrIndex) => (
                              <p key={attrIndex}>
                                {attr.name}: {attr.value}
                              </p>
                            ))}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed b" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            performance Testing
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
              <div className='d-flex'>
              <p className='col-lg-6'>Page Load Time</p>
              <input type="checkbox" className=""/>  
              </div>
              <div className='d-flex mt-3'>
              <p className='col-lg-6'>Rendering Speed</p>
              <input type="checkbox"/>  
              </div>
              <div className='d-flex mt-3'>
              <p className='col-lg-6'>Responsive</p>
              <input type="checkbox" />  
              </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Backend Testing
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
          </div>
        </div>
      </div>
    </div>
   
    </div>
      <button type='submit' className='btn btn-success float-end m-5' onClick={handlesubmitquestion}>Create Question</button>
    </>
  );
}
