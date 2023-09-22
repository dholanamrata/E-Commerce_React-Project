import React from "react";

const ModalProfile = ({ profileUrl }) => {
  console.log(profileUrl);
  return (
    <>
      <img
        src={profileUrl.length === 0?"https://e7.pngegg.com/pngimages/709/450/png-clipart-shining-stars-star-white-thumbnail.png":profileUrl}
        alt="image"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid black",
        }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label htmlFor="photo-upload" className="custom-file-upload fas">
                <div className="img-wrap img-upload">
                  <img
                    src=""
                    alt="image"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "2px solid black",
                    }}
                  />
                </div>
                <input id="photo-upload" type="file" />
              </label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Recipient:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    defaultValue={""}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalProfile;