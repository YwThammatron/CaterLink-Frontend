import axios from "axios";
import { useState } from "react";

function RestType({ onClick,backClick }) {

return (
    <>
     <button onClick={onClick}>Click2</button>
     <button onClick={backClick}>back</button>
    </>
  );
}

export default RestType;
