import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
const ImageUpload = ({
  avatar = false,
  addBtnColor = "primary",
  addBtnClasses = "btn-round",
  changeBtnColor = "primary",
  changeBtnClasses = "btn-round",
  removeBtnColor = "danger",
  removeBtnClasses = "btn-round",
  onFileChange, // 1. Accept onFileChange from props
}) => {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    avatar ? defaultAvatar : defaultImage
  );
  const fileInput = React.useRef(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let selectedFile = e.target.files[0];
    
    // Ensure a file was selected
    if (selectedFile) {
        reader.onloadend = () => {
            setFile(selectedFile);
            setImagePreviewUrl(reader.result);
            // 2. Call the parent's handler with the selected file
            if (onFileChange) {
                onFileChange(selectedFile);
            }
        };
        reader.readAsDataURL(selectedFile);
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
    // 3. Notify the parent that the file has been removed
    if (onFileChange) {
        onFileChange(null);
    }
  };

  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            color={addBtnColor}
            className={addBtnClasses}
            onClick={() => handleClick()}
          >
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button
              color={changeBtnColor}
              className={changeBtnClasses}
              onClick={() => handleClick()}
            >
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button
              color={removeBtnColor}
              className={removeBtnClasses}
              onClick={() => handleRemove()}
            >
              <i className="fa fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};
// ===================================================================================
// END: Modified ImageUpload Component
// ===================================================================================


ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  onFileChange: PropTypes.func, // 4. Add prop type for the new handler
  removeBtnClasses: PropTypes.string,
  removeBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
  addBtnClasses: PropTypes.string,
  addBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
  changeBtnClasses: PropTypes.string,
  changeBtnColor: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
};

export default ImageUpload;