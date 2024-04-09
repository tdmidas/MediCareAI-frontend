import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Button, Input, message } from "antd";
import "react-markdown-editor-lite/lib/index.css";
import "./WriteBlog.css";
import MainContentLayout from "../../layout/MainContentLayout";
import CustomHeader from "../../components/Header/CustomHeader";
import { useEffect } from 'react';
import LoginRequired from "../LoginRequired/LoginRequired";
import DefaultLayout from '../../layout/DefaultLayout';

import { auth } from '../../firebaseConfig';
const mdParser = new MarkdownIt();
const { TextArea } = Input;

const WriteBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = ({ text }) => {
        setContent(text);
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            message.error("Please enter a title.");
            return;
        }
        if (!content.trim()) {
            message.error("Please enter some content.");
            return;
        }
        setTitle("");
        setContent("");
        message.success("Blog submitted successfully!");

    };

    return (
        <MainContentLayout>
            {isLoggedIn ? (
                <div style={{ backgroundColor: "white", overflowY: "scroll", overflowX: "hidden", maxHeight: "100vh" }}>
                    <div style={{ padding: 15 }}>
                        <CustomHeader submitHandler={handleSubmit} />
                    </div>
                    <Input
                        className="write-blog-input"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={handleTitleChange}
                        style={{ borderRadius: "none", height: 80 }}
                    />
                    <MdEditor
                        value={content}
                        style={{ minHeight: "100vh" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleContentChange}
                    />
                </div>
            ) : (
                <DefaultLayout>
                    <LoginRequired />
                </DefaultLayout>


            )}

        </MainContentLayout>
    );
};

export default WriteBlog;
