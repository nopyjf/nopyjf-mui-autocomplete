import { Controller, useForm } from "react-hook-form";
import "./App.css";
import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object, string } from "yup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface ITopFilm {
  label: string;
  year: string;
}

const schema = object({
  label: string().required("Require Field"),
  year: string().required(),
}).required();

type FormData = InferType<typeof schema>;

function App() {
  const top100Films: ITopFilm[] = [
    { label: "The Shawshank Redemption", year: "1994" },
    { label: "The Godfather", year: "1972" },
    { label: "The Godfather: Part II", year: "1974" },
    { label: "The Dark Knight", year: "2008" },
    { label: "12 Angry Men", year: "1957" },
    { label: "Schindler's List", year: "1993" },
    { label: "Pulp Fiction", year: "1994" },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: "2003",
    },
    { label: "The Good, the Bad and the Ugly", year: "1966" },
    { label: "Fight Club", year: "1999" },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      label: "",
      year: "",
    },
  });

  const onSubmit = (data: any) => {
    // Autofill Data and Validate it !
    console.warn("SUMIT");
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <form
          onSubmit={handleSubmit(onSubmit, (error) => {
            console.log(error);
            console.log(getValues());
          })}
        >
          {/* Movie */}
          <Controller
            name="label"
            control={control}
            // onChange={([_, data]) => {
            //   return data;
            // }}
            render={({ field: { value, onChange, ref } }) => {
              console.log(value);
              return (
                <Autocomplete
                  id="label"
                  freeSolo
                  options={top100Films.map((option) => option.label)}
                  // onChange={(_, value) => {
                  //   onChange(value);
                  //   console.log(value);
                  //   setValue("year", "19989");
                  // }}
                  value={value}
                  onBlur={onChange}
                  sx={{ marginBottom: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Movie"
                      error={!!errors.label}
                      helperText={errors.label?.message}
                      inputRef={ref}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {" "}
                            <ArrowDropDownIcon />{" "}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              );
            }}
          />

          {/* Movie 2 */}
          <Controller
            name="year"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <Autocomplete
                  id="year"
                  freeSolo
                  options={top100Films.map((option) => option.year)}
                  // onChange={(_, value) => {
                  //   onChange(value);
                  //   console.log(value);
                  //   // setValue("year", "19989");
                  // }}
                  onChange={onChange}
                  onBlur={onChange}
                  value={value}
                  sx={{ marginBottom: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Year"
                      error={!!errors.year}
                      helperText={errors.year?.message}
                      inputRef={ref}
                    />
                  )}
                />
              );
            }}
          />

          <input type="submit" />
        </form>
      </Stack>
    </>
  );
}

export default App;
