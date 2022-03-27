import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    text: {
        marginTop: "100px",
    },
    button: {
        color: "white",
        backgroundColor: "blue",
        "&:hover" : {
            color: "black",
            backgroundColor: "white",
        }
    },
    divider: {
        margin: '10px 0 20px 0',
    },
}));