import React, { useState, useMemo, useEffect } from 'react';
import dynamic from "next/dynamic"
// import { Editor } from 'react-draft-wysiwyg';
// import { convertToRaw } from 'draft-js';
import draftToHtml from "draftjs-to-html"
import { EditorState, convertToRaw } from 'draft-js';
// let Editor;
// if (typeof window !== 'undefined') {
//     Editor = require('react-draft-wysiwyg').Editor;
// }
let draftToMarkdown;
if (typeof window !== 'undefined') {
    draftToMarkdown = require('draftjs-to-markdown').draftToMarkdown;
}


const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

const useEditor = (initialContent) => {
    const [content, setContent] = useState();
    const [message, setMessage] = useState("")

    useEffect(()=>{
        setContent(initialContent)
    },[initialContent])

    const memoizedEditor = useMemo(() => (
        <Editor
            editorState={content}
            onEditorStateChange={(editorState) => {
                setContent(editorState);
                setMessage((convertToRaw(editorState.getCurrentContent())).blocks[0].text)
            }}
            toolbarClassName="rounded-[10px]"
            wrapperClassName="p-[10px] min-h-[460px]"
            editorClassName='min-h-[400px] borde'
        />
    ), [content]);

    return { memoizedEditor, message };
};

export { useEditor };


