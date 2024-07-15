import React from 'react'

const ReplyReview = () => {
  return (
    <div className="write-review">
    <h4>
      Write a review for <strong>Dr. Darren Elder</strong>
    </h4>
    <form>
      <div className="mb-3">
        <label className="mb-2">Review</label>
        <div className="star-rating">
          <input
            id="star-5"
            type="radio"
            name="rating"
            defaultValue="star-5"
          />
          <label htmlFor="star-5" title="5 stars">
            <i className="active fa fa-star" />
          </label>
          <input
            id="star-4"
            type="radio"
            name="rating"
            defaultValue="star-4"
          />
          <label htmlFor="star-4" title="4 stars">
            <i className="active fa fa-star" />
          </label>
          <input
            id="star-3"
            type="radio"
            name="rating"
            defaultValue="star-3"
          />
          <label htmlFor="star-3" title="3 stars">
            <i className="active fa fa-star" />
          </label>
          <input
            id="star-2"
            type="radio"
            name="rating"
            defaultValue="star-2"
          />
          <label htmlFor="star-2" title="2 stars">
            <i className="active fa fa-star" />
          </label>
          <input
            id="star-1"
            type="radio"
            name="rating"
            defaultValue="star-1"
          />
          <label htmlFor="star-1" title="1 star">
            <i className="active fa fa-star" />
          </label>
        </div>
      </div>
      <div className="mb-3">
        <label className="mb-2">Title of your review</label>
        <input
          className="form-control"
          type="text"
          placeholder="If you could say it in one sentence, what would you say?"
        />
      </div>
      <div className="mb-3">
        <label className="mb-2">Your review</label>
        <textarea
          id="review_desc"
          maxLength={100}
          className="form-control"
          defaultValue={""}
        />
        <div className="d-flex justify-content-between mt-3">
          <small className="text-muted">
            <span id="chars">100</span> characters remaining
          </small>
        </div>
      </div>
      <hr />
      <div className="mb-3">
        <div className="terms-accept">
          <div className="custom-checkbox">
            <input type="checkbox" id="terms_accept" />
            <label htmlFor="terms_accept">
              I have read and accept{" "}
              <a href="#">Terms &amp; Conditions</a>
            </label>
          </div>
        </div>
      </div>
      <div className="submit-section">
        <button
          type="submit"
          className="btn btn-primary submit-btn"
        >
          Add Review
        </button>
      </div>
    </form>
  </div>
  )
}

export default ReplyReview