import React from 'react'
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import withStyles from "@material-ui/core/styles/withStyles";
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography"
const styles = {
    box: {
        background: "#041E42"
    },

  };
function Footer(props) {
    const {classes} = props
    return (
        <Box width="100" className={`py-3 ${classes.box}`}>
            <Container maxWidth="lg" className="px-2 py-1"> 
                <Grid container justify="space-between">
                    <Grid item xs={4} className="text-left">
                        <Typography variant="subtitle1" color="secondary">Contacts</Typography>
                        <Typography variant="body1" color="secondary">
                            Brocken Secrets Org <br />
                            Brookling 9-9 <br />
                            USA
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className="text-right">
                        <Typography variant="subtitle1" color="secondary">All right reserved @2020</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default withStyles(styles)(Footer)
