import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Popper,
  Select,
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
  const [countryCode, setCountryCode] = useState("+91");
  const [gender, setGender] = useState("Male");
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

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
    <Grid container justifyContent="flex-end" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ maxWidth: "100%", width: "100%" }}>
          <InputField
            placeholder="Email"
            register={{
              ...register("email", emailValidation(watch)),
            }}
            errors={errors.email}
          />
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              size="small"
              displayEmpty
              sx={{
                borderRadius: "10px",
                backgroundColor: "#e9e9e9",
                height: "40px",
                fontSize: "0.875rem",
                border: "none !important",
                padding: "0 12px",
                mt: 2,
                "&:hover": {
                  backgroundColor: "#dcdcdc",
                  border: "none",
                },
                "&.Mui-focused": {
                  backgroundColor: "#e9e9e9",
                  boxShadow: "none",
                  border: "none",
                },
                ".MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                },
              }}
            >
              <MenuItem value="+91">🇮🇳 +91</MenuItem>
              <MenuItem value="+1">🇺🇸 +1</MenuItem>
            </Select>
            <InputField
              placeholder="Enter your mobile number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <InputField
              placeholder="Password"
              type={visibility ? "text" : "password"}
              register={{...register("password", passwordValidation(watch))}}
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
            <InputField placeholder="First Name" />
            <InputField placeholder="Last Name" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              width: "100%",
            }}
          >
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              size="small"
              fullWidth
              sx={{
                borderRadius: "10px",
                backgroundColor: "#e9e9e9",
                height: "40px",
                fontSize: "0.875rem",
                border: "none !important",
                padding: "0 12px",
                mt: 2,
                "&:hover": {
                  backgroundColor: "#dcdcdc",
                  border: "none",
                },
                "&.Mui-focused": {
                  backgroundColor: "#e9e9e9",
                  boxShadow: "none",
                  border: "none",
                },
                ".MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 0",
                },
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
            <InputField placeholder="Zipcode" />
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
                  label="Profession"
                  variant="outlined"
                  className="form-input"
                />
              )}
            />
          </Box>
          <Controller
            name="termsAgreement"
            control={control}
            defaultValue={false}
            rules={{ required: "You must agree to the Terms of Use." }}
            render={({ field }) => (
              <FormControlLabel
                sx={{ ml: 1, mt: 1 }}
                control={<Checkbox {...field} checked={field.value} />}
                label={
                  <Typography variant="body1" sx={{ fontSize: "15px" }}>
                    By checking this box, you confirm you have read and agree to
                    our{" "}
                    <a
                      href="/terms-of-use"
                      target="_blank"
                      className="terms-text"
                    >
                      Terms of Use
                    </a>
                    ,{" "}
                    <a href="/privacy" target="_blank" className="terms-text">
                      Privacy Policy
                    </a>
                  </Typography>
                }
              />
            )}
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
