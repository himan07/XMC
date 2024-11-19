import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import InputField from "../../../components/InputField/InputField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import professions from "../../../dev-data/Profession.json";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../../../utils/emailValidation";
import { passwordValidation } from "../../../utils/passwordValidation";
import { mobileValidation } from "../../../utils/mobileValidation";
import SelectComponent from "../../../components/Select/Select";
import { dobValidation } from "../../../utils/dateOfBirthValidation";
import CheckboxComponent from "../../../components/Checkbox/CheckboxComp";

const StyledPopper = styled(Popper)({
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  marginTop: "8px",
  zIndex: 1000,
  fontSize: "16px",
});

const StyledPaper = styled(Paper)({
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  fontSize: "16px",
});

const PersonalDetails = ({ activeStep, setActiveStep }) => {
  const [phonenumber, setPhonenumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const countries = [
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+1", label: "🇺🇸 +1" },
  ];
  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleClickVisibility = () => {
    setVisibility(!visibility);
  };

  const onSubmit = async (data) => {
    console.log("PersonalDetails", data);
    setActiveStep((prevStep) => prevStep + 1);
    navigate("/register/verification");
  };

  return (
    <Grid container justifyContent="flex-end" mt={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ maxWidth: "100%", width: "100%" }}>
          <InputField
            placeholder="Email"
            register={{
              ...register("email", emailValidation(watch)),
            }}
            errors={errors.email}
          />
          <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
            <SelectComponent
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              options={countries}
              placeholder="Select"
              sx={{ width: "80px" }}
              errors={errors.mobile}
              errorWidth="300px"
            />
            <InputField
              placeholder="Enter your mobile number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              register={{ ...register("mobile", mobileValidation(watch)) }}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputField
              placeholder="Password"
              type={visibility ? "text" : "password"}
              register={{ ...register("password", passwordValidation(watch)) }}
              errors={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickVisibility}
                    sx={{ cursor: "pointer" }}
                  >
                    {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
            }}
          >
            <InputField
              placeholder="First Name"
              register={{
                ...register("firstName", {
                  required: "First Name is required",
                }),
              }}
              errors={errors.firstName}
            />
            <InputField
              placeholder="Last Name"
              register={{
                ...register("lastName", {
                  required: "Last Name is required",
                }),
              }}
              errors={errors.lastName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
            }}
          >
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{
                required: "Please select a gender",
              }}
              render={({ field }) => (
                <SelectComponent
                  value={field.value}
                  onChange={field.onChange}
                  options={genders}
                  placeholder="Select Gender"
                  errors={errors.gender}
                />
              )}
            />
            <InputField
              placeholder="Zipcode"
              register={{
                ...register("zipcode", {
                  required: "Zipcode is required",
                }),
              }}
              errors={errors.zipcode}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth (DD/MM/YYYY)"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                renderInput={(params) => (
                  <InputField
                    size="small"
                    {...params}
                    placeholder="DD/MM/YYYY"
                    fullWidth
                    register={{
                      ...register("dateOfBirth", dobValidation(watch)),
                    }}
                    errors={errors.dateOfBirth}
                  />
                )}
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <Autocomplete
              fullWidth
              size="small"
              disablePortal={true}
              options={professions}
              getOptionLabel={(option) => option.profession}
              onChange={(event, value) => {
                if (value) {
                  localStorage.setItem("profession", value.profession);
                }
              }}
              PopperComponent={(props) => (
                <StyledPopper {...props} key="popper" />
              )}
              PaperComponent={(props) => <StyledPaper {...props} key="paper" />}
              renderOption={(props, option) => (
                <li {...props} key={option.profession}>
                  {option.profession}
                </li>
              )}
              renderInput={(params) => (
                <InputField
                  {...params}
                  placeholder="Profession"
                  register={{
                    ...register("professions", {
                      required: "Profession is required",
                    }),
                  }}
                  errors={errors.professions}
                />
              )}
            />
          </Box>
          <CheckboxComponent
            name="termsAgreement"
            control={control}
            label={
              <>
                By checking this box, you confirm you have read and agree to our{" "}
                <a href="/terms-of-use" target="_blank" className="terms-text">
                  Terms of Use
                </a>
                ,{" "}
                <a href="/privacy" target="_blank" className="terms-text">
                  Privacy Policy
                </a>
              </>
            }
            rules={{
              validate: (value) => value || false,
            }}
            sx={{ mt: 2 }}
            checkboxSx={{ "&.Mui-checked": { color: "blue" } }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                width: "70%",
                backgroundColor: "rgba(46, 104, 174, 1)",
              }}
              type="submit"
            >
              Register
            </Button>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default PersonalDetails;
