import React from "react";

const AccountPage = async({params}) => {
    const newa = await params;
    console.log(newa)
    return <div>{params.id}</div>;
};

export default AccountPage;
