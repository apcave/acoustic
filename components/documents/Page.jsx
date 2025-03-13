import { motion } from "framer-motion";

import "@/components/documents/Page.css";

export function WebContent({ name, text, children, ...props }) {
  return (
    <div id="page">
      <div
        className="web"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>{name}</h1>
        <h3 className="centre-text">{text}</h3>
        {children}
      </div>
    </div>
  );
}

export function Page({
  name,
  text,
  numPages,
  pageNum,
  onPageSelect,
  children,
  ...props
}) {
  let navElements = [];

  if (numPages > 1) {
    for (let i = 0; i < numPages; i++) {
      console.log("test:", i);
      navElements.push(
        <button
          key={i}
          className={`${pageNum === i + 1 && "current"}`}
          onClick={() => onPageSelect(i + 1)}
        >
          Page {i + 1}
        </button>
      );
    }
  }

  return (
    <div id="page" className="frame">
      <motion.div
        className="web paper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>{name}</h1>
        <h3 className="centre-text">{text}</h3>
        {children}
        <div className="paper-nav">{navElements}</div>
      </motion.div>
    </div>
  );
}

export function Heading({ text, children }) {
  return (
    <>
      <h2>{text}</h2>
      <hr />
      {children}
    </>
  );
}

export function NamedList({ name, children, ...props }) {
  return (
    <>
      <h3>{name}</h3>
      <ul className="dots">{children}</ul>
    </>
  );
}

export function Entry({ title, leftText, rightText, children, ...props }) {
  return (
    <>
      <div className="entry">
        <h3>
          <strong>{title}</strong>, {leftText}
        </h3>
        <span>{rightText}</span>
      </div>
      {children}
    </>
  );
}
