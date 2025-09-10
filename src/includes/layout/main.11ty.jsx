
import React from "react";

export default function MainLayout(data) {
    console.log(data);
    const { content, title } = data;
    return (
        <>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>
    );
}
