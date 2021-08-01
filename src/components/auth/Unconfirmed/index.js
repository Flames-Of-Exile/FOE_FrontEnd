import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Unconfirmed = () => {
  /* REFS */
  const textArea = useRef(null);

  /* FORM STATE */
  const [token, setToken] = useState("");

  /* FORM HANDLING */
  useEffect(() => {
    generateToken();
  }, []);

  const generateToken = async () => {
    const response = await axios.get("/api/users/discord-token");
    setToken(response.data.token);
  };

  const handleCopy = () => {
    textArea.current.select();
    document.execCommand("copy");
  };

  return (
    <>
      <Grid item>
        <Typography>
          Thank you for registering, please link your account to discord.
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          Copy the following token, it is good for 1 hour:
        </Typography>
        <TextField multiline disabled={true} value={token} />
        <Button onClick={handleCopy}>Copy</Button>
      </Grid>
      <Grid>
        <Typography>
          Please join our <Link href="https://discord.gg/HPDCnAn">discord</Link>
        </Typography>
      </Grid>
      <Grid>
        <Typography>Type !register</Typography>
      </Grid>
      <Grid>
        <Typography>Follow the instructions given by the bot.</Typography>
      </Grid>
      <Button onClick={generateToken} variant="contained">
        Regenerate Token
      </Button>
    </>
  );
};

export default Unconfirmed;
