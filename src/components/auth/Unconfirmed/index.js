import {
  Button,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useIsMounted from "hooks/useIsMounted";

const Unconfirmed = () => {
  /* REFS */
  const textArea = useRef(null);
  const isMounted = useIsMounted();

  /* FORM STATE */
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  /* FORM HANDLING */
  useEffect(() => {
    generateToken();
  }, []);

  const generateToken = async () => {
    setLoading(true);
    const response = await axios.get("/api/users/discord-token");
    if (isMounted) {
      setToken(response.data.token);
      setLoading(false);
    }
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
      <Button onClick={generateToken} variant="contained" disabled={loading}>
        Regenerate Token
        {loading && <CircularProgress size={25} />}
      </Button>
    </>
  );
};

export default Unconfirmed;
