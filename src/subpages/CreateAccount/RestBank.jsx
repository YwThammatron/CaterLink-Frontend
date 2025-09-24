import axios from "axios";
import { useState } from "react";

function RestBank({ backClick }) {

    return (
        <>
        <button onClick={backClick}>back</button>
        </>
    );
}

export default RestBank;

