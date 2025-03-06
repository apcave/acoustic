import { motion } from 'framer-motion';

export function Page({ name, text, numPages, pageNum, onPageSelect, children, ...props }) {

    let navElements = [];

    if (numPages > 1) {
        for (let i = 0; i < numPages; i++) {
            console.log('test:',i);
            navElements.push(<button key={i}
                            className={`text-sm ${pageNum === (i + 1) && ' underline'} hover:text-sky-400`}
                            onClick={() => onPageSelect(i+1)}>
                            Page {i+1}
                            </button>    
                        );
        }
    }


    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}

        className="fixed overflow-hidden w-[170mm] h-[257mm] bg-white text-black shadow-md font-serif mx-auto p-8 rounded m-[5mm]"
        style={{ left: '100px' }}>
           <h1 className="text-4xl text-center">{name}</h1>
           <p className="text-sm text-center mt-2 mb-2">{text}</p>
        {children}
        <div className="flex justify-center mt-4 space-x-4 absolute bottom-4 w-full">
            {navElements}
        </div>
        </motion.div>
    );
}

export function Paragraph({ children, ...props }) {
    return (
        <p className="text-xs" {...props}>
        {children}
        </p>
    );
}

export function Heading({ text, children, ...props }) {
    return (
        <>
        <h2 className="text-sm mt-1 font-bold" {...props}>
        {text}
        </h2>
        <hr className="border-t border-black mb-2" />
        {children}
        </>
    );
}

export function NamedList({ name, children, ...props }) {
    return (
        <>
        <h3 className="text-xs mt-2 font-bold">{name}</h3>
        <List {...props}>{children}</List>
        </>
    );
}

export function List({ children, ...props }) {
    return (
        <ul className="list-disc ml-6 text-xs" {...props}>
        {children}
        </ul>
    );
}

export function Entry({ title, leftText, rightText, children, ...props }) {
    return (
        <>
        <div className="flex justify-between items-center text-xs mt-1 mb-1">
            <h3>
                <strong>{title}</strong>, {leftText}
            </h3>
            <span>{rightText}</span>
        </div>
        {children}
        </>
    );
}