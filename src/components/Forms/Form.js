import React, { useEffect, useState, useContext } from "react";

import CampaignContext from "../../context/CampaignsContext";
import Input from "../Forms/Inputs/Input";
import InputList from "../Forms/Inputs/InputList";
import Button from "../Buttons/Button";
import axios from "axios";
import InputCheckbox from "../Forms/Inputs/InputCheckbox";
import { useNavigate } from "react-router";

import classes from "./Form.module.css";
import Popup from "../Cards/Popup";

const FormCampaign = (props) => {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [keywords, setKeywords] = useState("");
  const [fund, setFund] = useState("");
  const [bid, setBid] = useState("");
  const [town, setTown] = useState("");
  const [radius, setRadius] = useState("");
  const [status, setStatus] = useState(false);

  const [prevBalance, setPrevBalance] = useState("");

  const [formValid, setFormValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameInputIsInvalid = name.trim() === "";
  const keywordsInputIsInvalid = keywords.trim() === "";
  const bidInputIsInvalid = bid === null || bid === "";
  const townInputIsInvalid = town.trim() === "";
  const fundInputIsInvalid = fund === null || fund === "";
  const radiusInputIsInvalid = radius === null || radius === "";

  const ctx = useContext(CampaignContext);

  const formValidateHandler = () => {
    if (
      !nameInputIsInvalid &&
      !keywordsInputIsInvalid &&
      !townInputIsInvalid &&
      !bidInputIsInvalid &&
      !fundInputIsInvalid &&
      !radiusInputIsInvalid
    ) {
      setFormValid(true);
    } else if (
      nameInputIsInvalid ||
      keywordsInputIsInvalid ||
      townInputIsInvalid ||
      bidInputIsInvalid ||
      fundInputIsInvalid ||
      radiusInputIsInvalid
    ) {
      setFormValid(false);
    }
  };

  useEffect(() => {
    setName(props.data.name ? props.data.name : "");
    setId(props.data.id ? props.data.id : "");
    setKeywords(props.data.keywords ? props.data.keywords : "");
    setBid(props.data.bid ? props.data.bid : "");
    setTown(props.data.town ? props.data.town : "");
    setFund(props.data.fund ? props.data.fund : "");
    setRadius(props.data.radius ? props.data.radius : "");
    setPrevBalance(props.data.fund);

    formValidateHandler();
  }, []);
  useEffect(() => {
    formValidateHandler();
  }, [
    nameInputIsInvalid,
    keywordsInputIsInvalid,
    townInputIsInvalid,
    bidInputIsInvalid,
    fundInputIsInvalid,
    radiusInputIsInvalid,
  ]);

  const generateKeywords = () => {
    let autoKeywords = name.toLowerCase().split(" ").join("-");

    setKeywords(autoKeywords, keywords);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const currBalance = (
        await axios.get("https://6401dcb30a2a1afebef3c3de.mockapi.io/balance/1")
      ).data.balance;
      if (props.type === "Create") {
        if (currBalance < fund)
          throw new Error(
            "Not enough funds on your account. Deposit money and try again!"
          );

        const newBalance = currBalance - fund;

        axios.put("https://6401dcb30a2a1afebef3c3de.mockapi.io/balance/1", {
          balance: newBalance,
        });

        axios
          .post("https://6401dcb30a2a1afebef3c3de.mockapi.io/FuturumProject", {
            name,
            keywords,
            fund,
            bid,
            town,
            radius,
            status,
          })
          .then(() => {
            props.onCreate();
            setIsLoading(false);
            nav("/");
            // nav(0);
          });
      } else if (props.type === "Update") {
        if (currBalance < prevBalance - fund) {
          throw new Error(
            "Not enough funds on your account. Deposit money and try again!"
          );
        }

        let newUpdateBalance;

        if (fund > prevBalance)
          newUpdateBalance = currBalance - (fund - prevBalance);
        axios.put("https://6401dcb30a2a1afebef3c3de.mockapi.io/balance/1", {
          balance: newUpdateBalance,
        });

        axios
          .put(
            `https://6401dcb30a2a1afebef3c3de.mockapi.io/FuturumProject/${id}`,
            {
              name,
              keywords,
              fund,
              bid,
              town,
              radius,
              status,
            }
          )
          .then(() => {
            localStorage.clear();
            setIsLoading(false);
            ctx.balanceHandler();
            nav("/");
          });
      }
    } catch (error) {
      setErrorMessage(error.message);
      setIsError(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <>
      {isError && (
        <Popup
          message={errorMessage}
          closeError={() => setIsError(false)}
          status="error"
        />
      )}
      <div className={classes["form-container"]}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Input
            label="Campaign Name"
            type="text"
            id="campaign-name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              generateKeywords();
            }}
          />
          <Input
            label="Campaign Keywords"
            type="text"
            id="campaign-keywords"
            name="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Input
            label="Bid Amount ($)"
            type="number"
            id="campaign-bid"
            name="bid"
            value={bid}
            onChange={(e) => setBid(e.target.value)}
          />
          <InputList
            label="Town"
            list="towns"
            id="campaign-town"
            name="town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          <Input
            label="Fund ($)"
            type="number"
            id="campaign-fund"
            name="campaign-fund"
            value={fund}
            onChange={(e) => setFund(e.target.value)}
          />

          <Input
            label="Radius (in km)"
            type="number"
            id="campaign-radius"
            name="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
          <InputCheckbox
            label="Campaign status"
            id="campaign-status"
            name="status"
            status={status}
            onChange={(e) => setStatus(!status)}
          />

          <Button disabled={!formValid} onClick={submitHandler} type="button">
            {!isLoading && `${props.type} campaign`}
            {isLoading && `Loading...`}
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormCampaign;
