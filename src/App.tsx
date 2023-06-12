import { Controller, useForm } from "react-hook-form";
import "./App.css";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, number, object, string } from "yup";

interface ITopFilm {
  label: string;
  year: number;
}

const schema = object({
  label: string().required("Require Field"),
  year: number().required(),
}).required();

type FormData = InferType<typeof schema>;

function App() {
  const top100Films: ITopFilm[] = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // Autofill Data and Validate it !
    console.warn("SUMIT");
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Movie */}
          <Controller
            name="label"
            control={control}
            render={({ field: { value, onChange, ref } }) => {
              return (
                <Autocomplete
                  id="label"
                  freeSolo
                  options={top100Films.map((option) => option.label)}
                  onChange={onChange}
                  onBlur={onChange}
                  value={value}
                  onSelect={() => {
                    console.warn("ASD");
                    setValue("year", 1111);
                  }}
                  sx={{ marginBottom: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={value}
                      label="Movie"
                      error={!!errors.label}
                      helperText={errors.label?.message}
                      inputRef={ref}
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
                  onChange={onChange}
                  onBlur={onChange}
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={value}
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
        </form>
      </Stack>
    </>
  );
}

export default App;
