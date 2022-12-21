import { create } from "ipfs-http-client";
import { Buffer } from "buffer";

const projectId = process.env.REACT_APP_IPFS_PROJECTID;
const projectSecret = process.env.REACT_APP_iPFS_API_KEY;
const auth =
  `Basic ` + Buffer.from(projectId + `:` + projectSecret).toString(`base64`);
export const client = create({
  host: `infura-ipfs.io`,
  port: 5001,
  protocol: `https`,
  headers: {
    authorization: auth,
  },
});
