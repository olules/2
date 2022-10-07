import React, { useState, useEffect } from "react";
import APIService from "./APIService";
import { useCookies } from "react-cookie";

function Form(props) {
  const [title, setTitle] = useState(props.article.title);
  const [description, setDescription] = useState(props.article.description);
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    setTitle(props.article.title);
    setDescription(props.article.description);
  }, [props.article]);

  const updateArticle = () => {
    APIService.UpdateArticle(props.article.id, { title, description }, token['mytoken']).then(
      (resp) => props.updatedInformation(resp)
    );
  };
  const insertArticle = () => {
    APIService.InsertArticle({ title, description }, token["mytoken"]).then(
      (resp) => props.insertedInformation(resp)
    );
  };
  return (
    <div>
      {props.article ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <br />
          <input
            value={title}
            type="text"
            className="form-control"
            id="title"
            placeholder="Please enter Name of PAP"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="title" className="form-label">
            Description
          </label>
          <br />
          <textarea
            type="text"
            value={description}
            className="form-control mb-3"
            id="description"
            rows="5"
            placeholder="Please enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {props.article.id ? (
            <button onClick={updateArticle} className="btn btn-success">
              Update PAP
            </button>
          ) : (
            <button onClick={insertArticle} className="btn btn-success">
              Insert PAP
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Form;
