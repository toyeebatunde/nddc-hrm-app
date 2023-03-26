import React, { useState, useMemo } from 'react';
import dynamic from "next/dynamic"
// import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from "draftjs-to-html"


const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

const EditorComponent = ({ initialContent, onContentChange }) => {
    const [content, setContent] = useState(initialContent);

    // console.log(draftToHtml(convertToRaw(content.getCurrentContent())))
    // console.log((convertToRaw(content.getCurrentContent())).blocks[0].text)

    const memoizedEditor = useMemo(() => (
        <Editor
            editorState={content}
            onEditorStateChange={(editorState) => {
                setContent(editorState);
                onContentChange(editorState);
            }}
            toolbarClassName="rounded-[10px]"
            wrapperClassName="p-[10px] min-h-[460px]"
            editorClassName='min-h-[400px]'
        />
    ), [content, onContentChange]);

    return memoizedEditor;
};

export default EditorComponent;