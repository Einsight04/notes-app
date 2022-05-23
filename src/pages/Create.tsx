import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormControl, FormLabel} from "@mui/material";
import {red} from '@mui/material/colors';


const Create = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const [error, setError] = useState(false);

    const useStyles = {
        title: {
            marginTop: '1rem',
        },
        field: {
            marginTop: 2,
            marginBottom: 2,
            display: 'block'
        },
        category: {
            ".css-qfz70r-MuiFormGroup-root": {
            }
        },
        radioError: {color: categoryError ? red[500] : 'inherit'}
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);
        setCategoryError(false);
        setError(false);

        if (!title) {
            setTitleError(true);
            setError(true);
        }
        if (!details) {
            setDetailsError(true);
            setError(true);
        }
        if (!category) {
            setCategoryError(true);
            setError(true);
        }

        if (title && details && category) {
            console.log(`Title: ${title} | Details ${details} | Category: ${category}`);

            await fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    details,
                    category
                })
            });
            navigate('/');
        }
    };

    return (
        <Container>
            <Typography
                sx={useStyles.title}
                variant='h6'
                component='h2'
                color='textPrimary'
                align='center'
                gutterBottom
            >
                Create New Note
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    sx={useStyles.field}
                    id="filled-basic"
                    label="Note Title"
                    variant="filled"
                    fullWidth
                    required
                    error={titleError}
                />
                <TextField
                    onChange={(e) => setDetails(e.target.value)}
                    sx={useStyles.field}
                    id="filled-basic"
                    label="Details"
                    variant="filled"
                    multiline
                    rows={8}
                    fullWidth
                    required
                    error={detailsError}
                />
                <FormControl sx={{...useStyles.field, ...useStyles.category}}>
                    <FormLabel error={categoryError} required>Category</FormLabel>
                    <RadioGroup value={category} row onChange={(e) => setCategory(e.target.value)}>
                        <FormControlLabel
                            value="money"
                            control={<Radio sx={useStyles.radioError}/>}
                            label={<Typography color={useStyles.radioError}>Money</Typography>}
                        />
                        <FormControlLabel
                            value="todos"
                            control={<Radio sx={useStyles.radioError}/>}
                            label={<Typography color={useStyles.radioError}>Todos</Typography>}
                        />
                        <FormControlLabel
                            value="reminders"
                            control={<Radio sx={useStyles.radioError}/>}
                            label={<Typography color={useStyles.radioError}>Reminders</Typography>}
                        />
                        <FormControlLabel
                            value="work"
                            control={<Radio sx={useStyles.radioError}/>}
                            label={<Typography color={useStyles.radioError}>Work</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
                <Button
                    type="submit"
                    color={error ? 'error' : 'primary'}
                    variant="contained"
                    fullWidth
                    endIcon={<KeyboardArrowRightIcon/>}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default Create;